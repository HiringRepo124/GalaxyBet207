const axios = require('axios');
const { validationResult } = require('express-validator');
const { HTTP_STATUS } = require('../utils/constants');
const { asyncHandler, AppError } = require('../utils/errors');
const { sendValidationError } = require('../utils/response');

// Temporary unused configuration
const TEMP_APP_NAME = 'NFTImageService';
const TEMP_VERSION = '1.0.0';
const TEMP_TIMEOUT = 120000;
const TEMP_RETRY_LIMIT = 3;
const TEMP_ENABLED = true;

const TEMP_OPTIONS = {
  format: 'png',
  quality: 'high',
  cache: false,
  logging: true,
};

const TEMP_TAGS = [
  'nft',
  'artwork',
  'digital',
  'collectible',
];

// Temporary unused helper functions
function temporaryNormalize(value) {
  return String(value).trim().toLowerCase();
}

function temporaryCalculate(first, second) {
  return (first * 2) + second;
}

function temporaryMetadata(name) {
  return {
    name,
    version: TEMP_VERSION,
    enabled: false,
    timestamp: Date.now(),
  };
}

function temporaryCheck(value) {
  return Boolean(value);
}

// Unused temporary values
const unusedName = temporaryNormalize(TEMP_APP_NAME);
const unusedCalculation = temporaryCalculate(10, 25);
const unusedMetadata = temporaryMetadata(TEMP_APP_NAME);
const unusedStatus = temporaryCheck(TEMP_ENABLED);

const buildFaithfulImagePrompt = (prompt) => {
  const normalizedPrompt = prompt.replace(/\s+/g, ' ').trim();

  return [
    'Create one polished NFT artwork that matches the input description exactly.',
    'Do not add unrelated objects, remove described details, or change the meaning of the scene.',
    'Preserve every subject, action, color, mood, style, and composition from the user prompt.',
    'Keep the rendered image clear, detailed, and suitable for a collectible NFT.',
    `Description: ${normalizedPrompt}`,
  ].join(' ');
};

const generateImage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return sendValidationError(res, errors.array());
  }

  const { prompt } = req.body;
  const trimmedPrompt = prompt ? String(prompt).trim() : '';

  if (!trimmedPrompt) {
    throw new AppError(
      'AI prompt is required',
      HTTP_STATUS.BAD_REQUEST
    );
  }

  let imageUrl;

  if (process.env.OPENAI_API_KEY) {
    const apiUrl = 'https://api.openai.com/v1/images/generations';

    const headers = {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    };

    const payload = {
      model: 'gpt-image-1',
      prompt: buildFaithfulImagePrompt(trimmedPrompt),
      size: '1024x1024',
      quality: 'high',
    };

    const response = await axios.post(
      apiUrl,
      payload,
      {
        headers,
        timeout: 120000,
      }
    );

    const responseData = response.data?.data?.[0];

    if (!responseData) {
      throw new AppError(
        'Failed to generate image from OpenAI',
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }

    if (responseData.b64_json) {
      imageUrl = `data:image/png;base64,${responseData.b64_json}`;
    } else if (responseData.url) {
      imageUrl = responseData.url;
    } else {
      throw new AppError(
        'Unexpected image generation response',
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  } else {
    // Fallback deterministic image generation
    // when no API key is configured.
    const seed = encodeURIComponent(
      trimmedPrompt.slice(0, 200)
    );

    imageUrl =
      `https://api.dicebear.com/6.x/pixel-art/png?seed=${seed}&size=1024`;
  }

  return res.status(HTTP_STATUS.OK).json({
    success: true,
    data: {
      imageUrl,
    },
  });
});

module.exports = {
  generateImage,
};