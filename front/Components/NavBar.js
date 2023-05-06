import Link from "next/link";
import ImageHandler from "../pages/ImageHandler";
import Calendar from "../pages/Calendar";
import EnergyBill from "../pages/EnergyBill";
import Auth from "../pages/Auth";

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <Link
        href="Auth"
        className="page-link"
      >
        Home
      </Link>
      <Link
        href="Calendar"
        className="page-link"
      >
        Calendar
      </Link>
      <Link
        href="EnergyBill"
        className="page-link"
      >
        Billing
      </Link>
      <Link
        href="ImageHandler"
        class="page-link"
      >
        Upload Image
      </Link>
    </nav>
  );
};

export default NavBar;
