import "./Support.css";
import { createRoot } from "react-dom/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FiSearch } from "react-icons/fi";
import { PiFlagBannerFoldThin } from "react-icons/pi";
import { PiMoneyWavyLight } from "react-icons/pi";
import { PiHandbagLight } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";
import { IoMegaphoneOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { GiPokerHand } from "react-icons/gi";
import { MdSportsSoccer, MdOutlineCasino } from "react-icons/md";
import { RiCoinsLine } from "react-icons/ri";

const Support = () => {
  useEffect(() => {
    const carousel = window.$("#owlSupport");
    carousel.owlCarousel({
      items: 4,
      itemsDesktop: [1000, 4],
      itemsDesktopSmall: [900, 3],
      itemsTablet: [600, 2],
      itemsMobile: false,
      navigation: true,
      autoPlay: 4000,
    });
    return () => {
      carousel.trigger("destroy.owl.carousel");
    };
  }, []);

  const HandelIconDropDownMenu = () => {
    const detailsElements = document.querySelectorAll(".faq-item details");

    detailsElements.forEach((details) => {
      const icon = details.querySelector(".icon");
      if (!icon._iconRoot) {
        icon._iconRoot = createRoot(icon);
      }
      details.addEventListener("toggle", () => {
        icon._iconRoot.render(details.open ? <FiMinus /> : <FaAngleDown />);
      });
    });
  };

  return (
    <>
      <Helmet>
        <title>SoftGalaxy | Support</title>
        <meta name="description" content="SoftGalaxy | Support" />
      </Helmet>
      <section id="Support" className="mt-4 pt-lg-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-11  col-md-10 col-lg-8 text-center subbortSearchSection">
              <span>How can we help you?</span>
              <div className="inbutSection d-flex align-items-center p-1 mt-3">
                <FiSearch className="searchIcon my-1 mx-2" />
                <input type="text" placeholder="Ask a question..." />
                <span className="py-2 px-3">Search</span>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center my-5 pt-md-3">
            <div className="col-11 col-md-10 col-lg-8 hrTitle text-center">
              <span>
                or choose a catagory to quickly find the help you need
              </span>
            </div>
          </div>
          <div className="row d-flex justify-content-center my-4">
            <div className="col-12 supportType">
              <div id="owlSupport" className="owl-carousel owl-theme">
                <div className="item text-center py-3">
                  <PiFlagBannerFoldThin className="supportTypeIcon rev mb-2" />
                  <span className="d-block">getting started</span>
                </div>
                <div className="item text-center py-3">
                  <PiMoneyWavyLight className="supportTypeIcon mb-2" />
                  <span className="d-block">pricing & plans</span>
                </div>
                <div className="item text-center py-3">
                  <PiHandbagLight className="supportTypeIcon mb-2" />
                  <span className="d-block">sales question</span>
                </div>
                <div className="item text-center py-3">
                  <IoBookOutline className="supportTypeIcon mb-2" />
                  <span className="d-block">usage guides</span>
                </div>
                <div className="item text-center py-3">
                  <IoMegaphoneOutline className="supportTypeIcon mb-2" />
                  <span className="d-block">information</span>
                </div>
                <div className="item text-center py-3">
                  <MdOutlineCasino className="supportTypeIcon mb-2" />
                  <span className="d-block">slots</span>
                </div>
                <div className="item text-center py-3">
                  <MdSportsSoccer className="supportTypeIcon mb-2" />
                  <span className="d-block">sports betting</span>
                </div>
                <div className="item text-center py-3">
                  <RiCoinsLine className="supportTypeIcon mb-2" />
                  <span className="d-block">staking</span>
                </div>
                <div className="item text-center py-3">
                  <GiPokerHand className="supportTypeIcon mb-2" />
                  <span className="d-block">games & rules</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center pt-4">
            <div className="col-11 col-md-10 col-lg-8 text-center pricingSection">
              <span className="FontOne">Pricing Plans</span>
              <span className="FontTow d-block mt-2 mx-lg-5">
                SoftGalaxy offers competitive rates and pricing plans to help
                you find a plan that fits the needs and budget of your business.
              </span>
            </div>
          </div>
          <div className="row d-flex justify-content-center my-4">
            <div className="col-11 col-lg-8 questionSection">              <p className="faqSectionLabel">NFTs &amp; Marketplace</p>              <div className="faq-container">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      What is an NFT?
                      <span className="icon">
                        <FaAngleDown />
                      </span>
                    </summary>
                    <p>
                      An NFT, or Non-Fungible Token, is a unique digital asset
                      that represents ownership of a specific item or piece of
                      content on the blockchain.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      How do I buy an NFT?
                      <span className="icon">
                        <FaAngleDown />
                      </span>
                    </summary>
                    <p>
                      To buy an NFT, you typically need a digital wallet that
                      supports cryptocurrencies and NFTs. You will also need to
                      purchase cryptocurrency (like Ethereum) to make the
                      transaction.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      Can I create my own NFT?
                      <span className="icon">
                        <FaAngleDown />
                      </span>
                    </summary>
                    <p>
                      es! You can create your own NFT by minting it on a
                      blockchain. Many platforms allow creators to upload their
                      digital art, music, videos, or other types of content and
                      convert them into NFTs.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      What are gas fees?
                      <span className="icon">
                        <FaAngleDown />
                      </span>
                    </summary>
                    <p>
                      Gas fees are transaction fees that are paid to miners on a
                      blockchain network to process and validate transactions.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      How do I sell my NFT?
                      <span className="icon">
                        <FaAngleDown />
                      </span>
                    </summary>
                    <p>
                      To sell your NFT, you can list it on an NFT marketplace.
                      You'll need to connect your digital wallet, select the NFT
                      you want to sell, and set a price.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      What happens if I lose access to my wallet?
                      <span className="icon">
                        <FaAngleDown />
                      </span>
                    </summary>
                    <p>
                      If you lose access to your digital wallet, you may lose
                      access to your NFTs and cryptocurrency.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      Are NFTs a good investment?
                      <span className="icon">
                        <FaAngleDown />
                      </span>
                    </summary>
                    <p>
                      The value of NFTs can be highly speculative and varies
                      greatly based on demand, rarity, and market trends.
                    </p>
                  </details>
                </div>
              </div>

              {/* Slots FAQ */}
              <p className="faqSectionLabel mt-4">Slots</p>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      How do the Slots reels work?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      Our Slots game uses a weighted random symbol generator across a 3×5 reel grid. Each spin independently picks symbols based on probability weights, so every result is provably fair and independent of previous spins.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      What are paylines and how are wins calculated?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      The game evaluates 6 paylines — 3 horizontal rows and 3 diagonal lines. A win occurs when 3 or more matching symbols appear consecutively on a payline. The payout multiplier depends on the symbol rarity and the chain length (3, 4, or 5 matching symbols).
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      What is the minimum and maximum bet on Slots?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      You can bet as little as 1 token or as much as your full wallet balance. Use the Quick Bet buttons (Min, ½, +5, 2×, Max) to adjust your stake quickly before each spin.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      What happens if I run out of balance?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      If your wallet balance is insufficient to cover the bet amount, the spin button will display "Insufficient Balance" and the spin will not proceed. Top up your wallet to continue playing.
                    </p>
                  </details>
                </div>
              </div>

              {/* Sports Betting FAQ */}
              <p className="faqSectionLabel mt-4">Sports Betting</p>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      Which sports can I bet on?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      SoftGalaxy supports betting on Football, Basketball, MMA, Tennis, and E-Sports. New leagues and events are added regularly. Use the sport filter tabs at the top of the Sports page to browse by category.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      How do I place a sports bet?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      Select an event from the Featured Markets list, choose your pick (Home / Draw / Away), select your preferred cryptocurrency (BTC, ETH, SOL, or USDT), enter your stake amount, and click Place Bet. The potential payout is calculated in real time based on the current odds.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      What do the odds trend arrows mean?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      The green upward arrow means the odds have increased since the last update (the outcome is becoming less likely according to the market). A red downward arrow means odds have dropped (outcome is gaining popularity). The percentage shown is the relative change.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      What is a network fee and why is it charged?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      A network fee (gas fee) is a small charge paid to blockchain validators to process and confirm your bet transaction on-chain. The fee varies by cryptocurrency: BTC fees are generally higher, while USDT and SOL fees are lower.
                    </p>
                  </details>
                </div>
              </div>

              {/* Staking FAQ */}
              <p className="faqSectionLabel mt-4">Staking</p>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      What is staking on SoftGalaxy?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      Staking allows you to lock your BET tokens for a chosen duration to earn passive rewards. The longer the lock period and the higher the amount staked, the greater the APY (Annual Percentage Yield) you receive.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      Can I unstake my tokens early?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      Early unstaking is possible but may incur a penalty fee depending on the lock plan chosen. Flexible plans have no lock-in, while fixed-term plans (30, 90, 180 days) offer higher yields in exchange for the lock commitment.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      How are staking rewards distributed?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      Rewards accrue daily based on your staked amount and chosen APY tier. They are automatically credited to your wallet at the end of each epoch. You can view your accumulated rewards and estimated monthly income in the Staking dashboard.
                    </p>
                  </details>
                </div>
              </div>
              <div className="faq-container mt-2">
                <div className="faq-item" onClick={HandelIconDropDownMenu}>
                  <details>
                    <summary className="d-flex justify-content-between align-items-center">
                      Is there a minimum amount required to stake?
                      <span className="icon"><FaAngleDown /></span>
                    </summary>
                    <p>
                      Yes, the minimum staking amount is 10 BET tokens. There is no maximum limit. Higher staked amounts unlock premium APY tiers and additional platform benefits such as reduced trading fees and exclusive NFT drops.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center pt-4">
            <div className="col-11 col-md-10 col-lg-8 text-center pricingSection">
              <span className="FontOne">You still have a question?</span>
              <span className="FontTow d-block mt-2 mx-lg-5">
                If you cannot find answer to your question in our FAQ, you can
                always contact us. We will answer to you shortly!
              </span>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-center my-5 contactSection">
            <div className="col-9 col-md-4 phonSection mx-md-3 text-center p-4">
              <FiPhoneCall className="helpIcon" />
              <span className="d-block ploedText mt-3">+(000)000-0-000</span>
              <span className="d-block sendText mt-2">
                We are always happy to help
              </span>
            </div>
            <div className="col-9 col-md-4 mailSection mx-md-3 text-center p-4 mt-3 mt-md-0">
              <CiMail className="helpIcon" />
              <span className="d-block ploedText mt-3">
                support@softgalaxy.com
              </span>
              <span className="d-block sendText mt-2">
                The best way to get answer faster
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Support;
