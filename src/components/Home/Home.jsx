import "./Home.scss";
import { useEffect } from "react";
export default function Home(props) {
  useEffect(() => {
    if (props.isCustomer) {
      props.setIsCustomer(false);
    }
  }, []);

  return <div className="Home"></div>;
}
