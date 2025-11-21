import "./Slots.css";
import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { FiChevronDown, FiSend } from "react-icons/fi";
import { PiCoinsBold } from "react-icons/pi";

const topLinks = ["Home", "Staking", "Info"];

const jackpots = [
  { tier: "Silver", amount: 100, glow: "silver" },
  { tier: "Gold", amount: 500, glow: "gold" },
  { tier: "Bronze", amount: 1000, glow: "bronze" },
];

const symbolRows = [
  ["🍌", "💎", "🍀", "👑", "🍌"],
  ["JACKPOT", "JACKPOT", "JACKPOT", "JACKPOT", "JACKPOT"],
  ["7", "🍓", "🍌", "🍒", "🍀"],
];

const chats = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Aenean commodo ligula eget dolor.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.",
  "Aenean commodo ligula eget dolor.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
];

const betsRows = [
  { game: "Slots", user: "Niiga_777", bet: "0.134778", multi: "9.9k", payout: "0.5" },
  { game: "Slots", user: "Boo", bet: "0.1347", multi: "9.9k", payout: "1.54708" },
  { game: "Slots", user: "Niiga_777", bet: "0.13778", multi: "9.9k", payout: "1.5470948375" },
  { game: "Slots", user: "Boo", bet: "0.1458", multi: "8.9k", payout: "1.5470546231" },
];

const Slots = () => {
  const [activeMode, setActiveMode] = useState("Manual");
  const [betAmount, setBetAmount] = useState("200");
  const [lines, setLines] = useState(3);
  const [betsTab, setBetsTab] = useState("All bets");

  const payout = useMemo(() => {
    const amount = Number(betAmount || 0);
    return ((amount * lines * 0.03372) / 100).toFixed(8);
  }, [betAmount, lines]);

  return (
    <>
      <Helmet>
        <title>SoftGalaxy | Slots</title>
        <meta name="description" content="Play slots on SoftGalaxy with the classic games dashboard layout" />
      </Helmet>

      <section id="slotsPage" className="mt-3 mb-5">
        <div className="container-fluid slotsShell">
          <div className="row g-3">
            <div className="col-12 col-xl-9">
              <div className="slotsCenter">
                <div className="slotsTopBar cardShell">
                  <div className="topLinks">
                    {topLinks.map((link) => (
                      <button key={link} type="button">
                        {link}
                      </button>
                    ))}
                  </div>

                  <div className="topWallet">
                    <span>
                      <PiCoinsBold /> 3,500,100 Bet
                    </span>
                    <span>0x52...331</span>
                  </div>
                </div>

                <div className="jackpotsRow mt-3">
                  {jackpots.map((jackpot) => (
                    <article key={jackpot.tier} className={`jackpotCard ${jackpot.glow}`}>
                      <div className="stars">★ ★</div>
                      <strong>JACKPOT</strong>
                      <small>{jackpot.tier}</small>
                      <span>
                        <PiCoinsBold /> {jackpot.amount.toFixed(2)}
                      </span>
                    </article>
                  ))}
                </div>

                <div className="machineWrap cardShell mt-3">
                  <div className="row g-3 align-items-start">
                    <div className="col-12 col-lg-8">
                      <div className="slotsMachine">
                        {symbolRows.map((row, rowIndex) => (
                          <div key={rowIndex} className={`machineRow ${rowIndex === 1 ? "hit" : ""}`}>
                            {row.map((symbol, symbolIndex) => (
                              <span key={`${rowIndex}-${symbolIndex}`}>{symbol}</span>
                            ))}
                          </div>
                        ))}
                      </div>

                      <div className="totalPayout mt-3">
                        <span>Total payout</span>
                        <strong>
                          <PiCoinsBold /> {payout}
                        </strong>
                      </div>
                    </div>

                    <div className="col-12 col-lg-4">
                      <div className="betPanel">
                        <div className="modeSwitch">
                          <button
                            type="button"
                            className={activeMode === "Manual" ? "active" : ""}
                            onClick={() => setActiveMode("Manual")}
                          >
                            Manual
                          </button>
                          <button
                            type="button"
                            className={activeMode === "Auto" ? "active" : ""}
                            onClick={() => setActiveMode("Auto")}
                          >
                            Auto
                          </button>
                        </div>

                        <label className="betLabel">Bet amount</label>
                        <div className="betInputWrap">
                          <PiCoinsBold />
                          <input
                            type="number"
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                          />
                        </div>

                        <div className="quickBets">
                          <button type="button">Min</button>
                          <button type="button">1/2</button>
                          <button type="button">+5</button>
                          <button type="button">2x</button>
                          <button type="button">Max</button>
                        </div>

                        <label className="betLabel mt-3">Number of lines</label>
                        <div className="linesSelect">
                          <span>{lines}</span>
                          <FiChevronDown />
                        </div>

                        <div className="linesGrid">
                          {[3, 4, 5, 6].map((value) => (
                            <button
                              key={value}
                              type="button"
                              className={lines === value ? "active" : ""}
                              onClick={() => setLines(value)}
                            >
                              {value}
                            </button>
                          ))}
                        </div>

                        <button type="button" className="placeBetBtn mt-4">
                          Place bet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="betsWrap cardShell mt-3">
                  <div className="betsHeader">
                    <div className="betsTabs">
                      {["All bets", "Mybets", "Big hits"].map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          className={betsTab === tab ? "active" : ""}
                          onClick={() => setBetsTab(tab)}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <button type="button" className="showSelect">
                      Show 10 <FiChevronDown />
                    </button>
                  </div>

                  <div className="betsTable">
                    <div className="betsHeadRow">
                      <span>Game</span>
                      <span>Username</span>
                      <span>Bet</span>
                      <span>Multiplier</span>
                      <span>Payout</span>
                    </div>
                    {betsRows.map((item, idx) => (
                      <div key={`${item.user}-${idx}`} className="betsRow">
                        <span>{item.game}</span>
                        <span>{item.user}</span>
                        <span>{item.bet}</span>
                        <span>{item.multi}</span>
                        <span className="highlight">{item.payout}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-3">
              <aside className="slotsRight cardShell h-100">
                <div className="chatTitle">
                  <span>CHAT</span>
                  <strong>31 235</strong>
                </div>

                <div className="chatStack">
                  {chats.map((message, idx) => (
                    <article key={idx} className="chatBubble">
                      <header>
                        <span>{idx % 2 === 0 ? "Niiga_777" : "Boo"}</span>
                        <small>21:30</small>
                      </header>
                      <p>{message}</p>
                    </article>
                  ))}
                </div>

                <div className="chatInput">
                  <input type="text" placeholder="Enter your message" />
                  <button type="button">
                    <FiSend />
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slots;
