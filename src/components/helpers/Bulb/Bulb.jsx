import "./Bulb.scss";
export default function Bulb(props) {
  return (
    <div className="bulb-light">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 95 95">
        <g id="items-to-use">
          <g>
            <g className={props.amount <= 2 ? (props.amount < 2 ? "light turn-on" : "light half") : "light"}>
              <polygon className="cls-1" points="31.29 8.44 11.96 22.71 6.51 35.09 7.84 65.81 12.13 75.55 30.13 88.27 43.18 92.56 66.96 90.25 83.97 74.73 90.57 63.99 90.57 29.48 75.21 13.79 57.54 5.2 31.29 8.44" />
              <polygon id="light" className="cls-2" points="22.86 38.23 33.93 26.34 45.82 20.89 63.32 26.34 69.1 35.42 73.56 39.22 70.75 64.49 59.52 75.55 33.6 75.55 28.31 63 20.22 49.96 22.86 38.23" />
            </g>
            <g>
              <path d="M97,30.49V27.14H89.74v-8.4H82.15v-7.8H70.92V4.22H59.69V0H37.32V4.22H26.09v6.72H14.86v7.8H7.27v8.4H0V67H.09v3.35H7.35v8.4H15v7.8H26.18v6.72H37.41v4.22H59.78V93.29H71V86.57H82.23v-7.8h7.6v-8.4H97.1V30.49ZM78.6,70.32v7.81H71v6.72H59.78v4.22H37.41V84.85H26.18V78.13h-7.6V70.32H11.32V30.49h-.09v-3.3H18.5V19.38h7.59V12.66H37.32V8.44H59.69v4.22H70.92v6.72h7.59v7.81h7.27V67h.09v3.3Z" />
              <path d="M75,38.16v-7.8H66.45v-7.8H56.09V17.38H39.55v5.18H29.18v7.8H20.64v7.8H15.46v20h7V71.56h8.12v7.8H65v-7.8h8.12V58.13h7v-20Zm-5.18,20h-7V71.56H32.86V58.13h-7v-20H31v-7.8h8.54V25.18H56.09v5.18h8.53v7.8h5.19Z" />
            </g>
            <rect className="cls-3" x="51.55" y="37.67" width="11.98" height="10.7" />
          </g>
        </g>
      </svg>
    </div>
  );
}
