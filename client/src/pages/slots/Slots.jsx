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

const slotSymbols = [
  { key: "banana", icon: "🍌", weight: 18, pays: { 3: 1.6, 4: 2.5, 5: 4.2 } },
  { key: "gem", icon: "💎", weight: 13, pays: { 3: 2.3, 4: 3.7, 5: 5.7 } },
  { key: "clover", icon: "🍀", weight: 16, pays: { 3: 1.9, 4: 2.9, 5: 4.8 } },
  { key: "crown", icon: "👑", weight: 10, pays: { 3: 3.2, 4: 5.8, 5: 8.8 } },
  { key: "cherry", icon: "🍒", weight: 17, pays: { 3: 1.4, 4: 2.2, 5: 3.5 } },
  { key: "seven", icon: "7", weight: 8, pays: { 3: 4.3, 4: 7.4, 5: 12.5 } },
  { key: "jackpot", icon: "JACKPOT", weight: 4, pays: { 3: 7.5, 4: 14.5, 5: 25 } },
];

const payLines = [
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2],
    [1, 3],
    [0, 4],
  ],
  [
    [2, 0],
    [1, 1],
    [0, 2],
    [1, 3],
    [2, 4],
  ],
  [
    [1, 0],
    [0, 1],
    [1, 2],
    [2, 3],
    [1, 4],
  ],
];

const symbolMap = Object.fromEntries(slotSymbols.map((item) => [item.key, item]));

const pickWeightedSymbol = () => {
  const totalWeight = slotSymbols.reduce((sum, item) => sum + item.weight, 0);
  let rng = Math.random() * totalWeight;

  for (const symbol of slotSymbols) {
    rng -= symbol.weight;
    if (rng <= 0) return symbol.key;
  }

  return slotSymbols[0].key;
};

const buildRandomGrid = () =>
  Array.from({ length: 3 }, () =>
    Array.from({ length: 5 }, () => pickWeightedSymbol())
  );

const injectLuckyLine = (grid, activeLines) => {
  if (Math.random() > 0.34) return grid;

  const cloned = grid.map((row) => [...row]);
  const targetLine = payLines[Math.floor(Math.random() * activeLines)];
  const targetSymbol = pickWeightedSymbol();
  const chainSize = Math.random() > 0.7 ? 5 : Math.random() > 0.45 ? 4 : 3;

  for (let i = 0; i < chainSize; i += 1) {
    const [row, col] = targetLine[i];
    cloned[row][col] = targetSymbol;
  }

  return cloned;
};

const evaluateGrid = (grid, activeLines) => {
  let totalMultiplier = 0;
  let linesWon = 0;
  const winCells = new Set();

  for (let lineIndex = 0; lineIndex < activeLines; lineIndex += 1) {
    const line = payLines[lineIndex];
    const [startRow, startCol] = line[0];
    const target = grid[startRow][startCol];
    let chain = 1;

    for (let i = 1; i < line.length; i += 1) {
      const [row, col] = line[i];
      if (grid[row][col] === target) chain += 1;
      else break;
    }

    if (chain >= 3) {
      const pay = symbolMap[target]?.pays?.[chain] || 0;
      totalMultiplier += pay;
      linesWon += 1;

      for (let i = 0; i < chain; i += 1) {
        const [row, col] = line[i];
        winCells.add(`${row}-${col}`);
      }
    }
  }

  return { totalMultiplier, linesWon, winCells };
};

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
  const [spinning, setSpinning] = useState(false);
  const [reelGrid, setReelGrid] = useState(() => buildRandomGrid());
  const [walletBet, setWalletBet] = useState(3500100);
  const [roundPayout, setRoundPayout] = useState(0);
  const [roundMultiplier, setRoundMultiplier] = useState(0);
  const [roundStatus, setRoundStatus] = useState("Ready to spin");
  const [winningCells, setWinningCells] = useState(new Set());
  const [myBetRows, setMyBetRows] = useState([]);

  const potentialPayout = useMemo(() => {
    const amount = Number(betAmount || 0);
    return (amount * 25).toFixed(2);
  }, [betAmount, lines]);

  const displayedRows = useMemo(() => {
    const mergedRows = [...myBetRows, ...betsRows];
    if (betsTab === "Mybets") return myBetRows;
    if (betsTab === "Big hits") {
      return mergedRows.filter((row) => Number(row.payout) >= Number(row.bet) * 2);
    }
    return mergedRows;
  }, [betsTab, myBetRows]);

  const applyQuickBet = (type) => {
    const current = Number(betAmount || 0);
    if (type === "min") return setBetAmount("10");
    if (type === "half") return setBetAmount((current / 2 || 0).toFixed(2));
    if (type === "plus") return setBetAmount((current + 5).toFixed(2));
    if (type === "double") return setBetAmount((current * 2 || 0).toFixed(2));
    if (type === "max") return setBetAmount(Math.floor(walletBet).toString());
    return null;
  };

  const handleSpin = () => {
    const amount = Number(betAmount || 0);
    if (spinning || amount <= 0) return;

    if (amount > walletBet) {
      setRoundStatus("Insufficient BET balance");
      return;
    }

    setSpinning(true);
    setRoundStatus("Spinning reels...");
    setWinningCells(new Set());
    setWalletBet((prev) => prev - amount);

    setTimeout(() => {
      const randomGrid = injectLuckyLine(buildRandomGrid(), lines);
      const result = evaluateGrid(randomGrid, lines);
      const payoutValue = amount * result.totalMultiplier;

      setReelGrid(randomGrid);
      setRoundMultiplier(result.totalMultiplier);
      setRoundPayout(payoutValue);
      setWinningCells(result.winCells);
      setWalletBet((prev) => prev + payoutValue);

      if (result.linesWon > 0) {
        setRoundStatus(`You hit ${result.linesWon} winning line${result.linesWon > 1 ? "s" : ""}!`);
      } else {
        setRoundStatus("No line hit. Try again!");
      }

      setMyBetRows((prev) => [
        {
          game: "Slots",
          user: "You",
          bet: amount.toFixed(2),
          multi: `${result.totalMultiplier.toFixed(2)}x`,
          payout: payoutValue.toFixed(4),
        },
        ...prev,
      ].slice(0, 24));

      setSpinning(false);
    }, 980);
  };

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
                      <PiCoinsBold /> {walletBet.toLocaleString(undefined, { maximumFractionDigits: 2 })} BET
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
                      <div className={`slotsMachine ${spinning ? "spinning" : ""}`}>
                        {reelGrid.map((row, rowIndex) => (
                          <div key={rowIndex} className="machineRow">
                            {row.map((symbol, symbolIndex) => (
                              <span
                                key={`${rowIndex}-${symbolIndex}`}
                                className={`slotCell ${winningCells.has(`${rowIndex}-${symbolIndex}`) ? "win" : ""}`}
                              >
                                {symbolMap[symbol]?.icon || symbol}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>

                      <div className="totalPayout mt-3">
                        <span>{roundStatus}</span>
                        <strong>
                          <PiCoinsBold /> {roundPayout.toFixed(4)} BET
                        </strong>
                      </div>
                      <small className="d-block mt-2 slotMetaText">
                        Multiplier: {roundMultiplier.toFixed(2)}x | Max single-line payout: {potentialPayout} BET
                      </small>
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
                          <button type="button" onClick={() => applyQuickBet("min")}>Min</button>
                          <button type="button" onClick={() => applyQuickBet("half")}>1/2</button>
                          <button type="button" onClick={() => applyQuickBet("plus")}>+5</button>
                          <button type="button" onClick={() => applyQuickBet("double")}>2x</button>
                          <button type="button" onClick={() => applyQuickBet("max")}>Max</button>
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

                        <button
                          type="button"
                          className="placeBetBtn mt-4"
                          onClick={handleSpin}
                          disabled={spinning}
                        >
                          {spinning ? "Spinning..." : "Place bet"}
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
                    {displayedRows.map((item, idx) => (
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
