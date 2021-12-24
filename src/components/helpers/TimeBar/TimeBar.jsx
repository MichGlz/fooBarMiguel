import "./TimeBar.scss";
import timeDiference from "../../../modules/timeDiference";

export default function TimeBar(props) {
  let level;
  const goal = Number(props.timeEnd) - Number(props.timeInit);
  const diference = Number(props.now) - Number(props.timeInit);
  const timeLeft = timeDiference(props.now, props.timeEnd);
  const timeDisplay = `${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`;
  if (props.now < props.timeEnd && props.now > props.timeInit) {
    level = (diference * 415) / goal;
  } else {
    level = 415;
  }

  const colorDeg = level / 415 > 0.5 ? (1 - level / 415) * 200 : 90;

  const coloringLevel = {
    filter: `hue-rotate(${colorDeg}deg)`,
  };

  return (
    <div className={"TimeBar " + (!props.isBarActive ? "no-active" : undefined)} style={props.isBarActive ? coloringLevel : null}>
      <h2>{props.label}</h2>
      <div className="number-bar">
        <p>{props.isBarActive ? timeDisplay : "00:00:00"}</p>

        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 463.93 59.03">
          <defs>
            <clipPath id="clip-path">
              <rect id="mask" className="cls-1" x="11.75" y="8.42" width="440.68" height="42.17" />
            </clipPath>
          </defs>
          <g id="items-to-use">
            <g id="progress-bar">
              <g id="backGround">
                <rect className="cls-2" x="11.49" y="8.43" width="440.94" height="8.43" />
                <rect className="cls-3" x="11.49" y="16.86" width="440.94" height="33.74" />
              </g>
              <g className="cls-4">
                <g id="level" transform={"translate(" + level + " 0)"}>
                  <g>
                    <rect className="cls-5" x="22.98" y="42.16" width="11.49" height="8.44" />
                    <rect className="cls-6" x="22.98" y="8.42" width="11.49" height="8.43" />
                    <rect x="11.49" y="8.42" width="11.49" height="8.43" />
                    <rect x="11.49" y="42.16" width="11.49" height="8.43" />
                    <polygon className="cls-7" points="22.98 33.73 22.98 42.16 34.48 42.16 34.48 33.73 34.48 25.29 34.48 16.85 22.98 16.85 22.98 25.29 22.98 33.73" />
                  </g>
                  <rect className="cls-8" x="34.48" y="16.85" width="417.96" height="33.75" />
                  <rect className="cls-9" x="34.48" y="8.42" width="406.82" height="8.43" />
                </g>
              </g>
              <g id="contorn">
                <rect className="cls-10" x="440.95" y="8.43" width="11.49" height="8.43" />
                <polygon className="cls-27" points="452.44 8.42 452.44 16.85 452.44 25.29 452.44 33.73 452.44 42.16 452.44 50.6 463.93 50.6 463.93 42.16 463.93 33.73 463.93 25.29 463.93 16.85 463.93 8.42 452.44 8.42" />
                <polygon className="cls-27" points="0 8.42 0 16.85 0 25.29 0 33.73 0 42.16 0 50.6 11.49 50.6 11.49 42.16 11.49 33.73 11.49 25.29 11.49 16.85 11.49 8.42 0 8.42" />
                <rect x="11.49" width="440.94" height="8.43" />
                <rect x="11.49" y="50.6" width="440.94" height="8.43" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
