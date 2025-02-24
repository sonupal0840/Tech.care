import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./navbar.module.css";
import logo from "../assets/TestLogo@2x.jpg";
import Dr from "../assets/Dr_profile.jpg";
import setting_icon from "../assets/setting_icon.jpg";
import more_ver from "../assets/more_ver.jpg";
import home_icon from "../assets/home_icon.jpg";
import calender_icon from "../assets/calender_icon.jpg";
import credit_card from "../assets/credit_card.jpg";
import persons_icon from "../assets/persons_icon.jpg";
import message_icon from "../assets/message_icon.jpg";

const Navbar = () => {
  const containerRef = useRef(null);
  const selectedOperationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleClick = (event) => {
        const clickedLink = event.target.closest("li");
        if (!clickedLink) return;
        if (selectedOperationRef.current) {
          selectedOperationRef.current.classList.remove(style.highlight);
        }
        clickedLink.classList.add(style.highlight);
        selectedOperationRef.current = clickedLink;
      };

      container.addEventListener("click", handleClick);
      return () => {
        container.removeEventListener("click", handleClick);
      };
    }
  }, []);

  return (
    <nav className={style.Navbar}>
      <aside>
        <img id={style.Logo} src={logo} alt="Logo" />
      </aside>
      <nav>
        <ul className={style.operations} ref={containerRef}>
          <li>
            <Link to="/">
              <img id={style.icon} src={home_icon} alt="Home" />
              <font>Overview</font>
            </Link>
          </li>
          <li>
            <Link to="">
              <img id={style.icon} src={persons_icon} alt="Patients" />
              <font>Patients</font>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img id={style.icon} src={calender_icon} alt="Schedule" />
              <font>Schedule</font>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img id={style.icon} src={message_icon} alt="Message" />
              <font>Message</font>
            </Link>
          </li>
          <li>
            <Link to="/">
              <img id={style.icon} src={credit_card} alt="Transactions" />
              <font>Transactions</font>
            </Link>
          </li>
        </ul>
      </nav>
      <nav>
        <ul className={style.Dr_Details}>
          <li>
            <img id={style.DrLogo} src={Dr} alt="Doctor Profile" />
          </li>
          <li>
            <strong>Dr. Jose Simmons</strong>
            <br />
            <p id={style.pa}>General Practitioner</p>
          </li>
          <li>
            <Link to="/">
              <img src={setting_icon} alt="Settings" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <img id={style.more} src={more_ver} alt="More Options" />
            </Link>
          </li>
        </ul>
      </nav>
    </nav>
  );
};

export default Navbar;

