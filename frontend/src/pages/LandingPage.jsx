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
              <span className={landingPageStyles.logoText}>OrangeResume 简历</span>
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
                    立即开始
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
                        欢迎你，{user.name}！
                      </div>
                      <button
                        className={landingPageStyles.mobileDashboardButton}
                        onClick={() => {
                          navigate("/dashboard");
                          setMobileMenuOpen(false);
                        }}
                      >
                        前往控制台
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
                      立即开始
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
                <div className={landingPageStyles.tagline}>专业简历生成器</div>

                {/* 大标题 */}
                <h1 className={landingPageStyles.heading}>
                  <span className={landingPageStyles.headingText}>使用</span>
                  <span className={landingPageStyles.headingGradient}>
                    {" "}
                    OrangeResume
                  </span>
                  <span className={landingPageStyles.headingText}>
                    {" "}
                    专业简历
                  </span>
                </h1>

                {/* 详情介绍 */}
                <p className={landingPageStyles.description}>
                  创建一个专业简历，只需几分钟。
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
                      开始创建
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
                    浏览模板
                  </button>
                </div>

                {/* 星级介绍 */}
                <div className={landingPageStyles.statsContainer}>
                  {[ 
                    { 
                      value: "50K+", 
                      label: "已创建简历数", 
                      gradient: "from-violet-600 to-fuchsia-600",
                    },
                    {
                      value: "4.9★", 
                      label: "用户评分", 
                      gradient: "from-orange-500 to-red-500",
                    },
                    {
                      value: "5 分钟", 
                      label: "平均创建时长", 
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
                  为什么选择
                  <span className={landingPageStyles.featuresTitleGradient}>
                    OrangeResume
                  </span>
                  ？
                </h2>
                <p className={landingPageStyles.featuresDescription}>
                  OrangeResume 帮你快速生成专业、适配 ATS 的简历。
                </p>
              </div>

              <div className={landingPageStyles.featuresGrid}>
                {[
                  {
                    icon: <Zap className={landingPageStyles.featureIcon} />,
                    title: "极速生成",
                    description: "用精简流程，5 分钟内创建专业简历",
                    gradient: landingPageStyles.featureIconViolet,
                    bg: landingPageStyles.featureCardViolet,
                  },
                  {
                    icon: (
                      <LayoutTemplate
                        className={landingPageStyles.featureIcon}
                      />
                    ),
                    title: "专业模板",
                    description: "数十款行业模板，HR 认可的结构与版式",
                    gradient: landingPageStyles.featureIconFuchsia,
                    bg: landingPageStyles.featureCardFuchsia,
                  },
                  {
                    icon: (
                      <Download className={landingPageStyles.featureIcon} />
                    ),
                    title: "一键导出",
                    description: "一键下载高质量 PDF，排版完美",
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
                    准备好创建你的
                    <span className={landingPageStyles.ctaTitleGradient}>
                      亮眼简历
                    </span>
                    了吗？
                  </h2>
                  <p className={landingPageStyles.ctaDescription}>
                    立即使用 OrangeResume，助力你的求职更上一层楼！
                  </p>
                  <button
                    className={landingPageStyles.ctaButton}
                    onClick={handleCTA}
                  >
                    <div className={landingPageStyles.ctaButtonOverlay}></div>
                    <span className={landingPageStyles.ctaButtonText}>
                      现在开始创建
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className={landingPageStyles.footer}>
          <div className={landingPageStyles.footerContainer}>
            <p className={landingPageStyles.footerText}>祝你求职顺利！</p>
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
