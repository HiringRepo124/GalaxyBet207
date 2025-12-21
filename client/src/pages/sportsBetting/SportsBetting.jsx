import "./SportsBetting.css";
import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { PiCurrencyCircleDollarLight } from "react-icons/pi";

const events = [
  {
    id: 1,
    league: "UEFA Champions",
    match: "Real Orbit vs Lunar FC",
    time: "Today • 21:00",
    odds: { home: 1.84, draw: 3.4, away: 4.2 },
    trend: "Hot",
  },
  {
    id: 2,
    league: "NBA Galaxy",
    match: "Nebula Nets vs Solar Bulls",
    time: "Today • 23:30",
    odds: { home: 2.1, draw: 0, away: 1.76 },
    trend: "Rising",
  },
  {
    id: 3,
    league: "E-Sports Arena",
    match: "Crypto Titans vs ZeroPing",
    time: "Tomorrow • 18:00",
    odds: { home: 1.65, draw: 0, away: 2.3 },
    trend: "Stable",
  },
  {
    id: 4,
    league: "UFC Main Card",
    match: "Drax Fury vs Kairo Stone",
    time: "Tomorrow • 02:00",
    odds: { home: 1.92, draw: 0, away: 1.92 },
    trend: "Live",
  },
  {
    id: 5,
    league: "Premier League",
    match: "Blue Meteors vs Red Comets",
    time: "Sun • 19:45",
    odds: { home: 2.24, draw: 3.05, away: 2.75 },
    trend: "Hot",
  },
  {
    id: 6,
    league: "Tennis Masters",
    match: "N. Blade vs T. Pulse",
    time: "Sun • 15:00",
    odds: { home: 1.73, draw: 0, away: 2.12 },
    trend: "Live",
  },
];

const coinMeta = {
  BTC: { icon: FaBitcoin, color: "#f7931a", fee: "0.00014 BTC" },
  ETH: { icon: FaEthereum, color: "#6f7cff", fee: "0.0021 ETH" },
  SOL: { icon: TbCurrencySolana, color: "#14f195", fee: "0.008 SOL" },
  USDT: { icon: PiCurrencyCircleDollarLight, color: "#26a17b", fee: "1.0 USDT" },
};

const SportsBetting = () => {
  const [activeCoin, setActiveCoin] = useState("USDT");
  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [selectedPick, setSelectedPick] = useState("home");
  const [stake, setStake] = useState("50");

  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId) || events[0],
    [selectedEventId]
  );

  const odd = selectedEvent.odds[selectedPick] || 1;
  const payout = (Number(stake || 0) * odd).toFixed(2);

  return (
    <>
      <Helmet>
        <title>SoftGalaxy | Sports Betting</title>
        <meta
          name="description"
          content="Bet on top sports events with BTC, ETH, SOL, and USDT on SoftGalaxy"
        />
      </Helmet>

      <section id="sportsBetting" className="mt-4 pt-lg-3 pb-5">
        <div className="container">
          <div className="row mx-2 mb-4">
            <div className="col-12">
              <span className="d-block F1 textS1">
                <span className="lemon">Sports</span> Betting With Crypto
              </span>
              <span className="d-block F3 textS2">
                Pick your match, choose your coin, and place bets instantly with on-chain settlement.
              </span>
            </div>
          </div>

          <div className="row gx-4 gy-4 mx-2">
            <div className="col-12 col-lg-8">
              <div className="sbCard p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <h5 className="m-0 sbTitle">Featured Markets</h5>
                  <span className="sbBadge">Updated 20s ago</span>
                </div>

                <div className="eventList">
                  {events.map((event) => (
                    <button
                      key={event.id}
                      className={`eventItem ${selectedEventId === event.id ? "active" : ""}`}
                      onClick={() => {
                        setSelectedEventId(event.id);
                        setSelectedPick("home");
                      }}
                    >
                      <div className="eventTop">
                        <span className="eventLeague">{event.league}</span>
                        <span className={`eventTrend ${event.trend.toLowerCase()}`}>{event.trend}</span>
                      </div>
                      <span className="eventMatch">{event.match}</span>
                      <span className="eventTime">{event.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="sbCard p-3 p-md-4 betSlip">
                <h5 className="m-0 sbTitle mb-3">Bet Slip</h5>

                <div className="slipSection">
                  <span className="slipLabel">Match</span>
                  <span className="slipValue">{selectedEvent.match}</span>
                </div>

                <div className="slipSection">
                  <span className="slipLabel">Pick</span>
                  <div className="pickButtons">
                    <button
                      className={selectedPick === "home" ? "active" : ""}
                      onClick={() => setSelectedPick("home")}
                    >
                      Home {selectedEvent.odds.home}
                    </button>
                    {selectedEvent.odds.draw > 0 && (
                      <button
                        className={selectedPick === "draw" ? "active" : ""}
                        onClick={() => setSelectedPick("draw")}
                      >
                        Draw {selectedEvent.odds.draw}
                      </button>
                    )}
                    <button
                      className={selectedPick === "away" ? "active" : ""}
                      onClick={() => setSelectedPick("away")}
                    >
                      Away {selectedEvent.odds.away}
                    </button>
                  </div>
                </div>

                <div className="slipSection">
                  <span className="slipLabel">Pay With</span>
                  <div className="coinRow">
                    {Object.keys(coinMeta).map((coin) => {
                      const CoinIcon = coinMeta[coin].icon;
                      return (
                        <button
                          key={coin}
                          className={`coinBtn ${activeCoin === coin ? "active" : ""}`}
                          onClick={() => setActiveCoin(coin)}
                        >
                          <CoinIcon style={{ color: coinMeta[coin].color }} />
                          <span>{coin}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="slipSection">
                  <span className="slipLabel">Stake ({activeCoin})</span>
                  <input
                    type="number"
                    min="1"
                    className="stakeInput"
                    value={stake}
                    onChange={(e) => setStake(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <div className="payoutBox mt-2">
                  <div className="d-flex justify-content-between">
                    <span>Network Fee</span>
                    <span>{coinMeta[activeCoin].fee}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <span>Potential Payout</span>
                    <strong>{payout} {activeCoin}</strong>
                  </div>
                </div>

                <button className="placeBetBtn mt-3">Place Bet</button>
                <small className="d-block mt-2 slipHint">By placing this bet, you accept event settlement and wallet signature terms.</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SportsBetting;
