import "./Staking.css";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { FiSearch, FiBarChart2, FiFlag, FiLock } from "react-icons/fi";
import { GiPokerHand, GiTwoCoins } from "react-icons/gi";
import { IoFootballOutline, IoStatsChartOutline } from "react-icons/io5";
import { MdOutlineAccountBalanceWallet, MdOutlineSupportAgent } from "react-icons/md";

const yearlyStats = [
  { icon: <FiBarChart2 />, title: "Crypto Predict", value: "0.346543" },
  { icon: <GiPokerHand />, title: "Poker", value: "0.346543" },
  { icon: <IoFootballOutline />, title: "Sport Betting", value: "0.346543" },
];

const sideNav = [
  "Staking",
  "Affiliate & Binary",
  "Free BET token",
  "Academy",
  "Become a partner",
];

const gameNav = [
  "Crypto predict",
  "Sport betting",
  "Roulette",
  "Poker",
  "Blackjack",
  "Slots",
];

const chatItems = [
  {
    name: "Niiga_777",
    time: "21:30",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  { name: "Boo", time: "21:30", text: "Aenean commodo ligula eget dolor." },
  { name: "Niiga_777", time: "21:30", text: "Aenean commodo ligula eget dolor." },
  { name: "Boo", time: "21:30", text: "Aenean commodo ligula eget dolor." },
  { name: "Niiga_777", time: "21:30", text: "Lorem ipsum dolor sit amet." },
];

const stakingRows = [
  {
    from: "19.05.2021",
    to: "19.05.2022",
    amount: "1,000",
    type: "Conservative",
    tx: "2b4r230hkrlk32jbk3...",
    profit: "+100000 BET",
  },
  {
    from: "19.05.2021",
    to: "19.05.2022",
    amount: "1,000",
    type: "Dynamic",
    tx: "2b4r230hkrlk32jbk3...",
    profit: "+90000 BET",
  },
  {
    from: "19.05.2021",
    to: "19.05.2022",
    amount: "1,000",
    type: "Conservative",
    tx: "2b4r230hkrlk32jbk3...",
    profit: "+80000 BET",
  },
  {
    from: "19.05.2021",
    to: "19.05.2022",
    amount: "1,000",
    type: "Dynamic",
    tx: "2b4r230hkrlk32jbk3...",
    profit: "+70000 BET",
  },
];

const Staking = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [activeTab, setActiveTab] = useState("my");

  return (
    <>
      <Helmet>
        <title>SoftGalaxy | Staking</title>
        <meta name="description" content="Dashboard staking page for SoftGalaxy" />
      </Helmet>

      <section id="stakingDashboard" className="mt-3 mb-5">
        <div className="container-fluid stakingShell">
          <div className="row g-3">
            <div className="col-12 col-xl-2">
              <aside className="leftPanel panelCard h-100">
                <div className="marketCard">
                  <div className="marketHead">
                    <span>BET/USDT</span>
                    <span className="marketArrow">&gt;</span>
                  </div>
                  <div className="fakeChart" />
                  <div className="marketFoot">
                    <span>$ 0.0452312</span>
                    <span>+ 3.75%</span>
                  </div>
                </div>

                <div className="menuGroup mt-4">
                  <span className="menuTitle">NAVIGATION</span>
                  {sideNav.map((item) => (
                    <button key={item} className="menuItem" type="button">
                      <MdOutlineAccountBalanceWallet />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>

                <div className="menuGroup mt-3">
                  <span className="menuTitle">BETFIN GAMES</span>
                  {gameNav.map((item) => (
                    <button key={item} className="menuItem" type="button">
                      <IoStatsChartOutline />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>

                <div className="leftBottom mt-3">
                  <button className="menuItem" type="button">
                    <MdOutlineSupportAgent />
                    <span>Support</span>
                  </button>
                </div>
              </aside>
            </div>

            <div className="col-12 col-xl-7">
              <div className="centerPanel">
                <div className="topToolbar panelCard">
                  <div className="toolbarSearch">
                    <FiSearch />
                    <input type="text" placeholder="Search" />
                  </div>
                  <div className="toolbarWallet">
                    <span>3,500,100 Bet</span>
                    <span>0x52...331</span>
                  </div>
                </div>

                <div className="overview panelCard mt-3">
                  <div className="overviewHead">
                    <div className="stakeType">
                      <GiTwoCoins />
                      <div>
                        <span>Conservative staking</span>
                        <small>Share betting</small>
                      </div>
                    </div>
                    <div className="overviewStats">
                      <div>
                        <span>APR</span>
                        <strong>135,89%</strong>
                      </div>
                      <div>
                        <span>TVL</span>
                        <strong>25,289,367 BET</strong>
                      </div>
                      <div>
                        <span>Your staking</span>
                        <strong>289,367 BET</strong>
                      </div>
                      <div>
                        <span>Earnings</span>
                        <strong>23,434 BET</strong>
                      </div>
                    </div>
                  </div>

                  <div className="overviewBody">
                    <div className="leftStats">
                      <span className="panelTitle">Sharebet games yearly stats</span>
                      <div className="statCards">
                        {yearlyStats.map((item) => (
                          <div key={item.title} className="statCard">
                            {item.icon}
                            <span>{item.title}</span>
                            <strong>{item.value}</strong>
                          </div>
                        ))}
                      </div>

                      <div className="summaryRow">
                        <div className="summaryList">
                          <span>34.2k users</span>
                          <span>504.4k bets</span>
                          <span>55.3M BET volume</span>
                        </div>
                        <div className="revenueCard">
                          <GiTwoCoins />
                          <strong>23,43M</strong>
                          <small>Staking revenues</small>
                        </div>
                      </div>
                    </div>

                    <div className="rightChart">
                      <span className="panelTitle">Staking types APR comparison</span>
                      <div className="chartFrame">
                        <div className="chartLabel">May 2022 APR: 9.24%</div>
                        <svg className="aprChart" viewBox="0 0 380 220" preserveAspectRatio="none">
                          <polyline
                            points="0,145 40,130 80,105 120,95 160,88 200,90 240,110 280,135 320,138 360,148"
                            className="lineConservative"
                          />
                          <polyline
                            points="0,165 40,150 80,115 120,108 160,114 200,128 240,145 280,152 320,154 360,166"
                            className="lineDynamic"
                          />
                        </svg>
                        <div className="chartMonths">
                          <span>Jan</span>
                          <span>March</span>
                          <span>May</span>
                          <span>July</span>
                          <span>Sept</span>
                          <span>Nov</span>
                        </div>
                        <div className="chartLegend">
                          <span><i className="dot con" /> Conservative</span>
                          <span><i className="dot dyn" /> Dynamic</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stakeBox panelCard mt-3">
                  <div className="stakeInputWrap">
                    <span className="stakeLabel">Stake BET Tokens</span>
                    <small>Staking period is fixed for 1 year</small>
                    <div className="stakeInputRow mt-2">
                      <FiLock />
                      <input
                        type="number"
                        placeholder="Amount to Stake"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                      />
                      <button type="button" className="stakePrimary">
                        Stake
                      </button>
                    </div>
                  </div>

                  <div className="claimBox">
                    <strong>Claim 24,000 BET</strong>
                    <small>12k BET to be credited in 14h 22min</small>
                    <button type="button">Claim</button>
                  </div>
                </div>

                <div className="historyBox panelCard mt-3">
                  <div className="historyTabs">
                    <button
                      className={activeTab === "my" ? "active" : ""}
                      type="button"
                      onClick={() => setActiveTab("my")}
                    >
                      My staking
                    </button>
                    <button
                      className={activeTab === "earn" ? "active" : ""}
                      type="button"
                      onClick={() => setActiveTab("earn")}
                    >
                      My earnings
                    </button>
                    <button
                      className={activeTab === "claims" ? "active" : ""}
                      type="button"
                      onClick={() => setActiveTab("claims")}
                    >
                      Unstakes & claims
                    </button>
                  </div>

                  <div className="historyTable">
                    <div className="historyHeader">
                      <span>Date from</span>
                      <span>Date to</span>
                      <span>Amount</span>
                      <span>Staking type</span>
                      <span>Blockchain Tx ID</span>
                      <span>Staking profit</span>
                    </div>
                    {stakingRows.map((row, idx) => (
                      <div className="historyRow" key={`${row.tx}-${idx}`}>
                        <span>{row.from}</span>
                        <span>{row.to}</span>
                        <span>{row.amount}</span>
                        <span>{row.type}</span>
                        <span>{row.tx}</span>
                        <span className="profit">{row.profit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-xl-3">
              <aside className="rightPanel panelCard h-100">
                <div className="chatHead">
                  <span>CHAT</span>
                  <strong>31 235</strong>
                </div>

                <div className="chatList">
                  {chatItems.map((item, idx) => (
                    <div className="chatItem" key={`${item.name}-${idx}`}>
                      <div className="chatItemTop">
                        <span>{item.name}</span>
                        <small>{item.time}</small>
                      </div>
                      <p>{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="chatInputWrap mt-2">
                  <input type="text" placeholder="Enter your message" />
                  <button type="button">
                    <FiFlag />
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

export default Staking;
