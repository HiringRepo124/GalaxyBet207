const EarningsOverview = ({ data }) => {
  const earnings = data?.earnings || {
    rows: [
      { label: "Total Interest", value: "$ 1,250.00" },
      { label: "Direct Reward", value: "$ 890.00" },
      { label: "Total Bonus", value: "$ 2,295.00" },
    ],
    claimable: "$ 5,435.00",
    payoutLegend: [
      { color: "var(--sg-green)", label: "Active" },
      { color: "var(--sg-gold)", label: "Payout" },
      { color: "var(--sg-purple-soft)", label: "Mining" },
      { color: "var(--sg-pink)", label: "New" },
    ],
  };

  return (
    <section className="soft-section">
      <div className="container">
        <h2 className="soft-section-title">Total Earnings Overview</h2>
        <p className="soft-section-sub mb-4">
          Track your rewards, claim payouts, and monitor distribution status.
        </p>
        <div className="sg-earnings-grid">
          <div className="sg-earnings-card">
            {earnings.rows.map((row) => (
              <div key={row.label} className="sg-earnings-row">
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>

          <div className="sg-claim-box">
            <p className="soft-section-sub mb-0">Available to Claim</p>
            <div className="sg-claim-amount">{earnings.claimable}</div>
            <button type="button" className="sg-btn-claim">Claim</button>
          </div>

          <div className="sg-earnings-card sg-donut-wrap">
            <div className="sg-donut" />
            <ul className="sg-donut-legend">
              {earnings.payoutLegend.map((item) => (
                <li key={item.label}>
                  <span style={{ background: item.color }} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="sg-earnings-card">
            <h3 className="soft-section-title" style={{ fontSize: "1.1rem" }}>
              Send reward to wallet
            </h3>
            <p className="soft-section-sub mb-3">
              Convert your internal balance to an external wallet address.
            </p>
            <input
              type="text"
              placeholder="0x02...331"
              className="form-control mb-3"
              style={{
                background: "var(--sg-surface-2)",
                border: "1px solid var(--sg-border)",
                color: "var(--white)",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
              }}
            />
            <button type="button" className="btnTemp px-4 py-2">Update</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarningsOverview;
