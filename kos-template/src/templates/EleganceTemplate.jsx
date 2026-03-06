import "../templates.css";
import "./EleganceTemplate.css";
import KosLogo from "../components/KosLogo.jsx";

/**
 * @param {{ title: string, day: string, price: string, dishes: {name: string, image: string}[], bgImage: string }} props
 */
export default function EleganceTemplate({ title, day, price, dishes, bgImage }) {
  return (
    <div className="elegance-wrap">
      {bgImage && <>
        <div className="elegance-bg" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="elegance-bg-overlay" />
      </>}

      {/* Dekoracija */}
      <div className="elegance-side-line" />
      <div className="elegance-side-diamond" />
      <div className="elegance-top-ornament" />
      <div className="elegance-bottom-ornament" />

      <div className="elegance-content">

        {/* Header */}
        <div className="elegance-header">
          <div className="elegance-day">{day}</div>
          <KosLogo size={56} />
        </div>

        {/* Naslov */}
        <div className="elegance-title-wrap">
          <h2 className="elegance-title">{title}</h2>
          <div className="elegance-title-line" />
        </div>

        {/* Jela */}
        <div className="elegance-dishes">
          {dishes.map((d, i) => (
            <div key={i} className="elegance-dish">
              <span className="elegance-dish-num">0{i + 1}</span>
              {d.image
                ? <div className="elegance-dish-img" style={{ backgroundImage: `url(${d.image})` }} />
                : <div className="elegance-dish-placeholder">🍽️</div>
              }
              <div className="elegance-dish-info">
                <div className="elegance-dish-name">{d.name}</div>
                <div className="elegance-dish-sub">KOŠ LOUNGE</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="elegance-footer">
          <div>
            <div className="elegance-price-label">Cena menija</div>
            <div className="elegance-price">
              {price}
              <span className="elegance-price-unit">din.</span>
            </div>
          </div>
          <div className="elegance-address">
            Vojvode Stepe 118<br />
            @kos.lounge
          </div>
        </div>

      </div>
    </div>
  );
}
