import { Link } from "react-router-dom";

const PlatformFeatures = ({ data }) => {
  const features = data?.features || [
    {
      step: "01",
      title: "Connect Your Wallet",
      desc: "Link your wallet to access staking, games, and affiliate rewards across the SoftGalaxy ecosystem.",
    },
    {
      step: "02",
      title: "Stake & Play",
      desc: "Stake BET tokens for passive income or dive into roulette, slots, and sports betting.",
    },
    {
      step: "03",
      title: "Grow Your Network",
      desc: "Build your binary or linear genealogy tree and earn commissions from your affiliate structure.",
    },
  ];

  return (
    <section className="soft-section">
      <div className="container">
        <h2 className="soft-section-title">How SoftGalaxy Works</h2>
        <p className="soft-section-sub mb-4">
          Three simple steps to start earning in the galaxy.
        </p>
        <div className="sg-features-grid">
          {features.map((f) => (
            <div key={f.step} className="sg-feature-card">
              <div className="sg-feature-num">{f.step}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomeCTA = () => (
  <section className="soft-section">
    <div className="container">
      <div className="sg-cta">
        <h2>Ready to enter the Galaxy?</h2>
        <p>Join thousands of players staking, betting, and building their network today.</p>
        <Link to="/signup" className="btnTemp px-5 py-3">Create Account</Link>
      </div>
    </div>
  </section>
);

export { HomeCTA };
export default PlatformFeatures;
