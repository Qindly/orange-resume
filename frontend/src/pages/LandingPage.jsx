// 首页展示页面
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
import { useNavigate } from "react-router-dom";
import { ProfileInfoCard } from "../components/Card.jsx";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className={landingPageStyles.container}>
        <header className={landingPageStyles.header}>
          <div className={landingPageStyles.headerContainer}>
            <div className={landingPageStyles.logoContainer}>
              <div className={landingPageStyles.logoIcon}>
                <LayoutTemplate className={landingPageStyles.logoIconInner} />
              </div>
              <span className={landingPageStyles.logoText}>ResumeXpert</span>
            </div>
            <button
              className={landingPageStyles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={24} className={landingPageStyles.mobileMenuIcon} />
              ) : (
                <Menu size={24} className={landingPageStyles.mobileMenuIcon} />
              )}
            </button>

            <div className="hidden md:flex items-center">
              {user ? (
                <ProfileInfoCard />
              ) : (
                <button
                  className={landingPageStyles.desktopAuthButton}
                  onClick={() => setOpenAuthModal(true)}
                >
                  <div
                    className={landingPageStyles.desktopAuthButtonOverlay}
                  ></div>
                  <span className={landingPageStyles.desktopAuthButtonText}>
                    Get Started
                  </span>
                </button>
              )}
            </div>

            {mobileMenuOpen && (
              <div className={landingPageStyles.mobileMenu}>
                <div className={landingPageStyles.mobileMenuContent}>
                  {user ? (
                    <div className={landingPageStyles.mobileUserInfo}>
                      <div className={landingPageStyles.mobileUserWelcome}>
                        Welcome, {user.name}!
                      </div>
                      <button
                        className={landingPageStyles.mobileDashboardButton}
                        onClick={() => {
                          navigate("/dashboard");
                          setMobileMenuOpen(false);
                        }}
                      >
                        Go to Dashboard
                      </button>
                    </div>
                  ) : (
                    <button
                      className={landingPageStyles.mobileAuthButton}
                      onClick={() => {
                        setOpenAuthModal(true);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Get Started
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </header>

        <main className={landingPageStyles.main}>
          {/* 主题介绍 */}
          <section className={landingPageStyles.heroSection}>
            <div className={landingPageStyles.heroGrid}>
              <div className={landingPageStyles.heroLeft}>
                <div className={landingPageStyles.tagline}>
                  Professional Resume Builder
                </div>

                {/* 大标题 */}
                <h1 className={landingPageStyles.heading}>
                  <span className={landingPageStyles.headingText}>Craft</span>
                  <span className={landingPageStyles.headingGradient}>
                    {" "}
                    Professional
                  </span>
                  <span className={landingPageStyles.headingText}>
                    {" "}
                    Resumes
                  </span>
                </h1>

                {/* 详情介绍 */}
                <p className={landingPageStyles.description}>
                  Create a professional resume in minutes with our easy-to-use
                  resume builder.
                </p>

                {/* 开始的两个选项 */}
                <div className={landingPageStyles.ctaButtons}>
                  <button
                    className={landingPageStyles.primaryButton}
                    onClick={handleCTA}
                  >
                    <div
                      className={landingPageStyles.primaryButtonOverlay}
                    ></div>
                    <span className={landingPageStyles.primaryButtonContent}>
                      Start Building
                      <ArrowRight
                        className={landingPageStyles.primaryButtonIcon}
                        size={18}
                      />
                    </span>
                  </button>

                  <button
                    className={landingPageStyles.secondaryButton}
                    onClick={handleCTA}
                  >
                    View Templates
                  </button>
                </div>

                {/* 星级介绍 */}
                <div className={landingPageStyles.statsContainer}>
                  {[
                    {
                      value: "50K+",
                      label: "Resumes Created",
                      gradient: "from-violet-600 to-fuchsia-600",
                    },
                    {
                      value: "4.9★",
                      label: "User Rating",
                      gradient: "from-orange-500 to-red-500",
                    },
                    {
                      value: "5 Min",
                      label: "Build Time",
                      gradient: "from-emerald-500 to-teal-500",
                    },
                  ].map((stat, idx) => (
                    <div className={landingPageStyles.statItem} key={idx}>
                      <div
                        className={`${landingPageStyles.statNumber} ${stat.gradient}`}
                      >
                        {stat.value}
                      </div>
                      <div className={landingPageStyles.statLabel}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 特点介绍 */}
          <section className={landingPageStyles.featuresSection}>
            <div className={landingPageStyles.featuresContainer}>
              <div className={landingPageStyles.featuresHeader}>
                <h2 className={landingPageStyles.featureTitle}>
                  Why Choose
                  <span className={landingPageStyles.featuresTitleGradient}>
                    ResumeXpert?
                  </span>
                </h2>
                <p className={landingPageStyles.featuresDescription}>
                  ResumeXpert is a powerful tool that helps you create a
                  professional and ATS-friendly resume.
                </p>
              </div>

              <div className={landingPageStyles.featuresGrid}>
                {[
                  {
                    icon: <Zap className={landingPageStyles.featureIcon} />,
                    title: "Lightning Fast",
                    description:
                      "Create professional resumes in under 5 minutes with our streamlined process",
                    gradient: landingPageStyles.featureIconViolet,
                    bg: landingPageStyles.featureCardViolet,
                  },
                  {
                    icon: (
                      <LayoutTemplate
                        className={landingPageStyles.featureIcon}
                      />
                    ),
                    title: "Pro Templates",
                    description:
                      "Choose from dozens of recruiter-approved, industry-specific templates",
                    gradient: landingPageStyles.featureIconFuchsia,
                    bg: landingPageStyles.featureCardFuchsia,
                  },
                  {
                    icon: (
                      <Download className={landingPageStyles.featureIcon} />
                    ),
                    title: "Instant Export",
                    description:
                      "Download high-quality PDFs instantly with perfect formatting",
                    gradient: landingPageStyles.featureIconOrange,
                    bg: landingPageStyles.featureCardOrange,
                  },
                ].map((feature, index) => (
                  <div key={index} className={landingPageStyles.featureCard}>
                    <div className={landingPageStyles.featureCardHover}></div>
                    <div
                      className={`${landingPageStyles.featureCardContent} ${feature.bg}`}
                    >
                      <div
                        className={`${landingPageStyles.featureIconContainer} ${feature.gradient}`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className={landingPageStyles.featureTitle}>
                        {feature.title}
                      </h3>
                      <p className={landingPageStyles.featureDescription}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA行为 */}
          <section className={landingPageStyles.ctaSection}>
            <div className={landingPageStyles.ctaContainer}>
              <div className={landingPageStyles.ctaCard}>
                <div className={landingPageStyles.ctaCardBg}></div>
                <div className={landingPageStyles.ctaCardContent}>
                  <h2 className={landingPageStyles.ctaTitle}>
                    Ready to Build Your
                    <span className={landingPageStyles.ctaTitleGradient}>
                      Standout Resume?
                    </span>
                  </h2>
                  <p className={landingPageStyles.ctaDescription}>
                    Get started with ResumeXpert today and take your job search
                    to the next level!
                  </p>
                  <button
                    className={landingPageStyles.ctaButton}
                    onClick={handleCTA}
                  >
                    <div className={landingPageStyles.ctaButtonOverlay}></div>
                    <span className={landingPageStyles.ctaButtonText}>
                      Start Building Now
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className={landingPageStyles.footer}>
          <div className={landingPageStyles.footerContainer}>
            <p className={landingPageStyles.footerText}>
              Best Wishes For Your Success!
            </p>
          </div>
        </footer>

        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setOpenAuthModal(false);
            setCurrentPage("login");
          }}
          hideHeader
        >
          <div>
            {currentPage === "login" && (
              <Login setCurrentPage={setCurrentPage} />
            )}
            {currentPage === "signup" && (
              <SignUp setCurrentPage={setCurrentPage} />
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default LandingPage;
