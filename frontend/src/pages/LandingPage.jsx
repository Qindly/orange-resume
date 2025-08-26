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
              <span className={landingPageStyles.logoText}>MarkdownXpert</span>
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
                    开始使用
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
                        欢迎，{user.name}！
                      </div>
                      <button
                        className={landingPageStyles.mobileDashboardButton}
                        onClick={() => {
                          navigate("/dashboard");
                          setMobileMenuOpen(false);
                        }}
                      >
                        进入工作台
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
                      开始使用
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
                  专业的Markdown文档编辑器
                </div>

                {/* 大标题 */}
                <h1 className={landingPageStyles.heading}>
                  <span className={landingPageStyles.headingText}>创建</span>
                  <span className={landingPageStyles.headingGradient}>
                    {" "}
                    专业
                  </span>
                  <span className={landingPageStyles.headingText}>
                    {" "}
                    Markdown文档
                  </span>
                </h1>

                {/* 详情介绍 */}
                <p className={landingPageStyles.description}>
                  使用我们简单易用的Markdown编辑器，在几分钟内创建专业的文档。
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
                      开始编写
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
                    查看模板
                  </button>
                </div>

                {/* 星级介绍 */}
                <div className={landingPageStyles.statsContainer}>
                  {[
                    {
                      value: "50K+",
                      label: "文档已创建",
                      gradient: "from-violet-600 to-fuchsia-600",
                    },
                    {
                      value: "4.9★",
                      label: "用户评分",
                      gradient: "from-orange-500 to-red-500",
                    },
                    {
                      value: "5 分钟",
                      label: "创建时间",
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
                    MarkdownXpert？
                  </span>
                </h2>
                <p className={landingPageStyles.featuresDescription}>
                  MarkdownXpert是一个强大的工具，帮助您创建专业且格式完美的Markdown文档。
                </p>
              </div>

              <div className={landingPageStyles.featuresGrid}>
                {[
                  {
                    icon: <Zap className={landingPageStyles.featureIcon} />,
                    title: "极速编写",
                    description:
                      "使用我们简化的流程，在5分钟内创建专业的Markdown文档",
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
                    description:
                      "从数十个经过验证的行业特定模板中选择",
                    gradient: landingPageStyles.featureIconFuchsia,
                    bg: landingPageStyles.featureCardFuchsia,
                  },
                  {
                    icon: (
                      <Download className={landingPageStyles.featureIcon} />
                    ),
                    title: "即时导出",
                    description:
                      "立即下载高质量PDF，格式完美",
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
                    准备创建您的
                    <span className={landingPageStyles.ctaTitleGradient}>
                      出色文档？
                    </span>
                  </h2>
                  <p className={landingPageStyles.ctaDescription}>
                    立即开始使用MarkdownXpert，将您的文档创作提升到新水平！
                  </p>
                  <button
                    className={landingPageStyles.ctaButton}
                    onClick={handleCTA}
                  >
                    <div className={landingPageStyles.ctaButtonOverlay}></div>
                    <span className={landingPageStyles.ctaButtonText}>
                      立即开始编写
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
              祝您创作成功！
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
