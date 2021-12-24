import TapBoxV2 from "../TapBox/TapBoxV2";
import "./Taps.scss";

export default function Taps(props) {
  const taps = [...props.taps].map((tap, i) => <TapBoxV2 key={"tap" + (i + 1)} bartenders={props.bartenders} tap={tap} />);

  return <div className="Taps">{taps}</div>;
}
