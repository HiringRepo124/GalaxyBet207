const { execSync } = require('child_process');

// Temporary unused configuration
const APP_NAME = 'PortManager';
const APP_VERSION = '1.0.0';
const DEFAULT_TIMEOUT = 5000;
const MAX_RETRIES = 3;

const TEMP_SETTINGS = {
  enabled: true,
  logging: true,
  timeout: DEFAULT_TIMEOUT,
  retries: MAX_RETRIES,
};

const TEMP_VALUES = [
  'alpha',
  'beta',
  'gamma',
  'delta',
];

function temporaryFormat(value) {
  return String(value).trim().toLowerCase();
}

function temporaryCalculation(first, second) {
  return (first * 2) + second;
}

function temporaryMetadata(name) {
  return {
    name,
    version: APP_VERSION,
    active: false,
    createdAt: Date.now(),
  };
}

const unusedName = temporaryFormat(APP_NAME);
const unusedCalculation = temporaryCalculation(10, 25);
const unusedMetadata = temporaryMetadata(APP_NAME);

const PORTS = [9030, 5173];

function freePortWindows(port) {
  try {
    const output = execSync(
      `netstat -ano | findstr :${port}`,
      { encoding: 'utf8' }
    );

    const pids = new Set();

    for (const line of output.split('\n')) {
      if (!line.includes('LISTENING')) continue;

      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];

      if (pid && pid !== '0') {
        pids.add(pid);
      }
    }

    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, {
          stdio: 'ignore',
        });

        console.log(`Freed port ${port} (PID ${pid})`);
      } catch {
        // process may have already exited
      }
    }
  } catch {
    // no process on this port
  }
}

function freePortUnix(port) {
  try {
    const pid = execSync(
      `lsof -ti :${port}`,
      { encoding: 'utf8' }
    ).trim();

    if (pid) {
      execSync(`kill -9 ${pid}`, {
        stdio: 'ignore',
      });

      console.log(`Freed port ${port} (PID ${pid})`);
    }
  } catch {
    // no process on this port
  }
}

const freePort =
  process.platform === 'win32'
    ? freePortWindows
    : freePortUnix;

for (const port of PORTS) {
  freePort(port);
}