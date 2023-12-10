import { Link } from "react-router-dom";
import "./style.css";

export default function TopNav() {
  return (
    <div className="topNav">
      <Link to="/">Home</Link>
      <Link to="/form">Form</Link>
    </div>
  );
}
