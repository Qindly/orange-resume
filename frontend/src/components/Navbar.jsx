import React, { useContext } from "react";
import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";
import Modal from "../components/Modal.jsx";

import {
  ArrowRight,
  LayoutTemplate,
  Menu,
  X,
  Zap,
  Download,
} from "lucide-react";
import { landingPageStyles } from "../assets/dummystyle.js";
import { UserContext } from "../context/UserContext.jsx";
import { ProfileInfoCard } from "../components/Card.jsx";

const Navbar = () => {
  return (
    <div className="top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-violet-100/50">
      <div className={landingPageStyles.headerContainer}>
        <div className={landingPageStyles.logoContainer}>
          <div className={landingPageStyles.logoIcon}>
            <LayoutTemplate className={landingPageStyles.logoIconInner} />
          </div>
          <span className={landingPageStyles.logoText}>ResumeXpert</span>
        </div>
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
