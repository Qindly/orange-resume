// Dashboard顶部组件
import {
  LayoutTemplate,
} from "lucide-react";
import { landingPageStyles } from "../assets/dummystyle.js";

import { ProfileInfoCard } from "../components/Card.jsx";

const Navbar = () => {
  return (
    <div className="top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-violet-100/50">
      <div className={landingPageStyles.headerContainer}>
        <div className={landingPageStyles.logoContainer}>
          <div className={landingPageStyles.logoIcon}>
            <LayoutTemplate className={landingPageStyles.logoIconInner} />
          </div>
          <span className={landingPageStyles.logoText}>MarkdownXpert</span>
        </div>
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
