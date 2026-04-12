import "./legend.css";

const Legend = () => {
  return (
    <div className="my-legend">
      <div className="legend-title">등수(점수)</div>
      <div className="legend-scale">
        <ul className="legend-labels">
          <li>
            <span style={{ background: "#d4af37" }}></span>1등(3점)
          </li>
          <li>
            <span style={{ background: "#c0c0c0" }}></span>2등(2점)
          </li>
          <li>
            <span style={{ background: "#cd7f32" }}></span>3등(1점)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Legend;
