import "./Staking.css";
import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";
import { PiCurrencyCircleDollarLight } from "react-icons/pi";
import { FiTrendingUp } from "react-icons/fi";

const pools = [
  {
    id: "usdt-flex",
    title: "USDT Flexible",
    apr: 9.5,
    lockDays: 0,
    tvl: "$2.1M",
    min: 50,
    risk: "Low",
    coin: "USDT",
  },
  {
    id: "eth-30",
    title: "ETH 30D Vault",
    apr: 14.2,
    lockDays: 30,
    tvl: "$4.8M",
    min: 0.05,
    risk: "Medium",
    coin: "ETH",
  },
  {
    id: "btc-60",
    title: "BTC 60D Yield",
    apr: 17.8,
    lockDays: 60,
    tvl: "$6.3M",
    min: 0.001,
    risk: "Medium",
    coin: "BTC",
  },
  {
    id: "sol-90",
    title: "SOL 90D Booster",
    apr: 24.1,
    lockDays: 90,
    tvl: "$1.9M",
    min: 1,
    risk: "High",
    coin: "SOL",
  },
];

const coinMeta = {
  BTC: { icon: FaBitcoin, color: "#f7931a", symbol: "BTC" },
  ETH: { icon: FaEthereum, color: "#6f7cff", symbol: "ETH" },
  SOL: { icon: TbCurrencySolana, color: "#14f195", symbol: "SOL" },
  USDT: { icon: PiCurrencyCircleDollarLight, color: "#26a17b", symbol: "USDT" },
};

const Staking = () => {
  const [selectedPoolId, setSelectedPoolId] = useState(pools[0].id);
  const [amount, setAmount] = useState("250");

  const selectedPool = useMemo(
    () => pools.find((pool) => pool.id === selectedPoolId) || pools[0],
    [selectedPoolId]
  );

  const amountNum = Number(amount || 0);
  const yearlyReward = ((amountNum * selectedPool.apr) / 100).toFixed(4);
  const dailyReward = (((amountNum * selectedPool.apr) / 100) / 365).toFixed(6);

  return (
    <>
      <Helmet>
        <title>SoftGalaxy | Staking</title>
        <meta
          name="description"
          content="Stake BTC, ETH, SOL and USDT on SoftGalaxy and earn APR rewards"
        />
      </Helmet>

      <section id="staking" className="mt-4 pt-lg-3 pb-5">
        <div className="container">
          <div className="row mx-2 mb-4">
            <div className="col-12">
              <span className="d-block F1 textS1">
                <span className="lemon">Crypto</span> Staking Hub
              </span>
              <span className="d-block F3 textS2">
                Lock your assets, earn passive rewards, and track projected yield in real-time.
              </span>
            </div>
          </div>

          <div className="row gx-4 gy-4 mx-2">
            <div className="col-12 col-lg-7">
              <div className="stakingCard p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <h5 className="m-0 stakingTitle">Available Pools</h5>
                  <span className="aprBadge">
                    <FiTrendingUp /> Max APR 24.1%
                  </span>
                </div>

                <div className="poolList">
                  {pools.map((pool) => {
                    const CoinIcon = coinMeta[pool.coin].icon;
                    return (
                      <button
                        key={pool.id}
                        className={`poolItem ${selectedPoolId === pool.id ? "active" : ""}`}
                        onClick={() => setSelectedPoolId(pool.id)}
                      >
                        <div className="poolTop">
                          <div className="d-flex align-items-center gap-2">
                            <CoinIcon style={{ color: coinMeta[pool.coin].color }} />
                            <span className="poolName">{pool.title}</span>
                          </div>
                          <span className={`riskTag ${pool.risk.toLowerCase()}`}>{pool.risk}</span>
                        </div>

                        <div className="poolGrid mt-2">
                          <div>
                            <span className="metaLabel">APR</span>
                            <span className="metaValue">{pool.apr}%</span>
                          </div>
                          <div>
                            <span className="metaLabel">Lock</span>
                            <span className="metaValue">
                              {pool.lockDays === 0 ? "Flexible" : `${pool.lockDays} Days`}
                            </span>
                          </div>
                          <div>
                            <span className="metaLabel">TVL</span>
                            <span className="metaValue">{pool.tvl}</span>
                          </div>
                          <div>
                            <span className="metaLabel">Min</span>
                            <span className="metaValue">
                              {pool.min} {pool.coin}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="stakingCard p-3 p-md-4 stakePanel">
                <h5 className="m-0 stakingTitle mb-3">Stake Calculator</h5>

                <div className="stakeSection">
                  <span className="stakeLabel">Selected Pool</span>
                  <span className="stakeValue">{selectedPool.title}</span>
                </div>

                <div className="stakeSection">
                  <span className="stakeLabel">Amount ({selectedPool.coin})</span>
                  <input
                    className="stakeInput"
                    type="number"
                    min="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Min ${selectedPool.min}`}
                  />
                </div>

                <div className="rewardBox">
                  <div className="d-flex justify-content-between">
                    <span>APR</span>
                    <strong>{selectedPool.apr}%</strong>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>Estimated Daily</span>
                    <strong>{dailyReward} {selectedPool.coin}</strong>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span>Estimated Yearly</span>
                    <strong>{yearlyReward} {selectedPool.coin}</strong>
                  </div>
                </div>

                <button className="stakeBtn mt-3">Stake Now</button>
                <button className="unstakeBtn mt-2">Unstake</button>

                <small className="d-block mt-3 stakeHint">
                  Rewards are estimated and can change based on network conditions and pool utilization.
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Staking;
