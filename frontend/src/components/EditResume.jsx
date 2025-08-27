// 编辑简历的主要内容，实现左边右边的同步更新
// 1. 先导入 React 相关
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TemplateOne from "./TemplateOne";

// 2. 导入第三方库
import {
  ArrowLeft,
  AlertCircle,
  Download,
  Palette,
  Save,
  Trash2,
  Check,
  Loader2,
  Eye,
  Edit,
} from "lucide-react";
import toast from "react-hot-toast";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

// 3. 导入本地组件
import DashboardLayout from "./DashboardLayout";
import { TitleInput } from "./Input";

import StepProgress from "./StepProgress";
import Modal from "./Modal";
import axiosInstance from "../utils/axiosInstance";

// Forms
import {
  AdditionalInfoForm,
  CertificationInfoForm,
  ContactInfoForm,
  EducationDetailsForm,
  ProfileInfoForm,
  ProjectDetailForm,
  SkillsInfoForm,
  WorkExperienceForm,
} from "./Form"; // 注意这里改为 Forms 目录

// 4. 导入工具和样式
import { API_PATHS } from "../utils/apiPaths";
import { fixTailwindColors } from "../utils/colors";
import { dataURLtoFile } from "../utils/helpers";
import {
  containerStyles,
  buttonStyles,
  statusStyles,
  iconStyles,
} from "../assets/dummystyle";
import "./A4.css";

// 防抖 Hook
// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// };

// 调整观看大小的hook
const useResizeObserver = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const ref = useCallback(
    (node) => {
      if (node) {
        const observer = new ResizeObserver((entries) => {
          const { height } = entries[0].contentRect;
          setSize({ size, height });
        });
        observer.observe(node);
        return () => {
          observer.disconnect();
        };
      }
    },
    [size]
  );
  return { ...size, ref };
};

const EditResume = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const resumeDownloadRef = useRef(null);
  const thumbnailRef = useRef(null);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("profile-info");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const [completionPercentage, setCompletionPercentage] = useState(0);

  const { width: previewWidth, ref: previewContainerRef } = useResizeObserver();



  const [resumeData, setResumeData] = useState({
    title: "职业简历",
    thumbnailLink: "",
    profileInfo: {
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "modern",
      colorPalette: [],
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
    interests: [""],
  });

  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resumeData.profileInfo.fullName) completedFields++;
    if (resumeData.profileInfo.designation) completedFields++;
    if (resumeData.profileInfo.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resumeData.contactInfo.email) completedFields++;
    if (resumeData.contactInfo.phone) completedFields++;

    // Work Experience
    resumeData.workExperience.forEach((exp) => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resumeData.education.forEach((edu) => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills
    resumeData.skills.forEach((skill) => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects
    resumeData.projects.forEach((project) => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resumeData.certifications.forEach((cert) => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages
    resumeData.languages.forEach((lang) => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests
    totalFields += resumeData.interests.length;
    completedFields += resumeData.interests.filter(
      (i) => i.trim() !== ""
    ).length;

    const percentage = Math.round((completedFields / totalFields) * 100);
    return isNaN(percentage) ? 0 : percentage;
  }, [resumeData]);

  const goToNextStep = useCallback(() => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if (currentPage === "additionalInfo") setOpenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentPage(pages[nextIndex]);

      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  // useEffect(() => {
  //   calculateCompletion();
  // }, [resumeData]);

  // Validate Inputs
  const validateAndNext = useCallback(() => {
    const errors = [];

    switch (currentPage) {
      case "profile-info": {
        const { fullName, designation, summary } = resumeData.profileInfo;
        if (!fullName.trim()) errors.push("姓名为必填项");
        if (!designation.trim()) errors.push("职位为必填项");
        if (!summary.trim()) errors.push("个人简介为必填项");
        break;
      }

      case "contact-info": {
        const { email, phone } = resumeData.contactInfo;
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
          errors.push("请输入有效的邮箱地址");
        if (!phone.trim() || !/^\d{10}$/.test(phone))
          errors.push("请输入有效的 10 位手机号");
        break;
      }

      case "work-experience": {
        resumeData.workExperience.forEach(
          ({ company, role, startDate, endDate }, index) => {
            if (!company || !company.trim()) errors.push(`第 ${index + 1} 条工作经历缺少公司名称`);
            if (!role || !role.trim()) errors.push(`第 ${index + 1} 条工作经历缺少职位`);
            if (!startDate || !endDate) errors.push(`第 ${index + 1} 条工作经历需填写起止日期`);
          }
        );
        break;
      }

      case "education-info": {
        resumeData.education.forEach(
          ({ degree, institution, startDate, endDate }, index) => {
            if (!degree.trim()) errors.push(`第 ${index + 1} 条教育经历缺少学位/学历`);
            if (!institution.trim()) errors.push(`第 ${index + 1} 条教育经历缺少学校/机构`);
            if (!startDate || !endDate) errors.push(`第 ${index + 1} 条教育经历需填写起止日期`);
          }
        );
        break;
      }

      case "skills": {
        resumeData.skills.forEach(({ name, progress }, index) => {
          if (!name.trim()) errors.push(`第 ${index + 1} 项技能缺少名称`);
          if (progress < 1 || progress > 100) errors.push(`第 ${index + 1} 项技能的熟练度需在 1-100 之间`);
        });
        break;
      }

      case "projects": {
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim()) errors.push(`第 ${index + 1} 个项目缺少标题`);
          if (!description.trim()) errors.push(`第 ${index + 1} 个项目缺少描述`);
        });
        break;
      }

      case "certifications": {
        resumeData.certifications.forEach(({ title, issuer }, index) => {
          if (!title.trim()) errors.push(`第 ${index + 1} 个证书缺少名称`);
          if (!issuer.trim()) errors.push(`第 ${index + 1} 个证书缺少颁发机构`);
        });
        break;
      }

      case "additionalInfo": {
        if (
          resumeData.languages.length === 0 ||
          !resumeData.languages[0].name?.trim()
        ) {
          errors.push("至少填写一种语言");
        }
        if (
          resumeData.interests.length === 0 ||
          !resumeData.interests[0]?.trim()
        ) {
          errors.push("至少填写一个兴趣爱好");
        }
        break;
      }

      default:
        break;
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(", "));
      return;
    }

    setErrorMsg("");
    goToNextStep();
  }, [currentPage, resumeData, goToNextStep]);

 

  const goBack = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if (currentPage === "profile-info") navigate("/dashboard");

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);

      const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };



  const updateSection = useCallback((section, key, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  }, []);

  const updateArrayItem = useCallback((section, index, key, value) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];

      if (key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value,
        };
      }

      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  }, []);

  const addArrayItem = useCallback((section, newItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  }, []);

  const removeArrayItem = useCallback((section, index) => {
    setResumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  }, []);

  const fetchResumeDetailsById = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      const resumeInfo = response?.data?.resume;
      if (resumeInfo) {
        setResumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience:
            resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications:
            resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests,
        }));
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
      toast.error("加载简历数据失败");
    }
  }, [resumeId]);


  const updateResumeDetails = useCallback(async (thumbnailLink, options = {}) => {
    const { silent = false, showToast = false } = options;
    try {
      if (!silent) setIsLoading(true);

      await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), {
        ...resumeData,
        thumbnailLink: thumbnailLink || "",
        completion: completionPercentage,
      });

      if (showToast) {
        toast.success("自动保存成功");
      }
    } catch (err) {
      console.error("Error updating resume:", err);
      toast.error("Failed to update resume details");
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, [resumeId, resumeData, completionPercentage]);

  const uploadResumeImages = useCallback(async () => {
    try {
      setIsLoading(true);

      const thumbnailElement = thumbnailRef.current;
      if (!thumbnailElement) {
        throw new Error("Thumbnail element not found");
      }

      const fixedThumbnail = fixTailwindColors(thumbnailElement);

      const thumbnailCanvas = await html2canvas(fixedThumbnail, {
        scale: 0.5,
        backgroundColor: "#FFFFFF",
        logging: false,
      });

      document.body.removeChild(fixedThumbnail);

      const thumbnailDataUrl = thumbnailCanvas.toDataURL("image/png");
      const thumbnailFile = dataURLtoFile(
        thumbnailDataUrl,
        `thumbnail-${resumeId}.png`
      );

      const formData = new FormData();
      formData.append("thumbnail", thumbnailFile);

      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { thumbnailLink } = uploadResponse.data;
      await updateResumeDetails(thumbnailLink);

      toast.success("简历更新成功");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error Uploading Images:", error);
      toast.error("上传图片失败");
    } finally {
      setIsLoading(false);
    }
  }, [resumeId, updateResumeDetails, navigate]);



  const handleDeleteResume = useCallback(async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast.success("简历删除成功");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("删除简历失败");
    } finally {
      setIsLoading(false);
    }
  }, [resumeId, navigate]);
  const memoizedForm = useMemo(() => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) =>
              updateSection("profileInfo", key, value)
            }
            onNext={validateAndNext}
          />
        );

      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) =>
              updateSection("contactInfo", key, value)
            }
          />
        );

      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("workExperience", index)
            }
          />
        );

      case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("education", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
          />
        );

      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("skills", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
          />
        );

      case "projects":
        return (
          <ProjectDetailForm
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("projects", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
          />
        );

      case "certifications":
        return (
          <CertificationInfoForm
            certifications={resumeData?.certifications}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("certifications", index, key, value);
            }}
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) =>
              removeArrayItem("certifications", index)
            }
          />
        );

      case "additionalInfo":
        return (
          <AdditionalInfoForm
            languages={resumeData.languages}
            interests={resumeData.interests}
            updateArrayItem={(section, index, key, value) =>
              updateArrayItem(section, index, key, value)
            }
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            removeArrayItem={(section, index) =>
              removeArrayItem(section, index)
            }
          />
        );

      default:
        return null;
    }
  }, [currentPage, resumeData, updateSection, updateArrayItem, addArrayItem, removeArrayItem, validateAndNext]);

  const downloadPDF = useCallback(async () => {
    const element = resumeDownloadRef.current;
    if (!element) {
      toast.error("生成 PDF 失败，请重试。");
      return;
    }

    setIsDownloading(true);
    setDownloadSuccess(false);
    const toastId = toast.loading("正在生成 PDF");

    const override = document.createElement("style");
    override.id = "__pdf_color_override__";
    override.textContent = `
      * {
        color: #000 !important;
        background-color: #fff !important;
        border-color: #000 !important;
      }
    `;
    document.head.appendChild(override);

    try {
      await html2pdf()
        .set({
          margin: 0,
          filename: `${resumeData.title.replace(/[^a-z0-9]/gi, "_")}.pdf`,
          image: { type: "png", quality: 1.0 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            backgroundColor: "#FFFFFF",
            logging: false,
            windowWidth: element.scrollWidth,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
          pagebreak: {
            mode: ["avoid-all", "css", "legacy"],
          },
        })
        .from(element)
        .save();

      toast.success("PDF 下载成功", { id: toastId });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("PDF error:", err);
      toast.error(`生成 PDF 失败: ${err.message}`, { id: toastId });
    } finally {
      document.getElementById("__pdf_color_override__")?.remove();
      setIsDownloading(false);
    }
  }, [resumeData]);

  const exportAsPNG = useCallback(async () => {
    const element = resumeDownloadRef.current;
    if (!element) {
      toast.error("未找到导出区域");
      return;
    }
    try {
      const override = document.createElement("style");
      override.id = "__png_color_override__";
      override.textContent = `
        * {
          color: #000 !important;
          background-color: #fff !important;
          border-color: #000 !important;
          box-shadow: none !important;
          background-image: none !important;
        }
      `;
      document.head.appendChild(override);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
        windowWidth: element.scrollWidth,
      });
      document.getElementById("__png_color_override__")?.remove();

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${resumeData.title.replace(/[^a-z0-9\u4e00-\u9fa5]/gi, "_")}.png`;
      link.click();
      toast.success("PNG 导出成功");
    } catch (e) {
      console.error("PNG export error:", e);
      toast.error("PNG 导出失败");
    }
  }, [resumeData]);

  const exportAsImagePDF = useCallback(async () => {
    const element = resumeDownloadRef.current;
    if (!element) {
      toast.error("未找到导出区域");
      return;
    }
    try {
      const override = document.createElement("style");
      override.id = "__imgpdf_color_override__";
      override.textContent = `
        * {
          color: #000 !important;
          background-color: #fff !important;
          border-color: #000 !important;
          box-shadow: none !important;
          background-image: none !important;
        }
      `;
      document.head.appendChild(override);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
        windowWidth: element.scrollWidth,
      });
      document.getElementById("__imgpdf_color_override__")?.remove();

      const dataUrl = canvas.toDataURL("image/png");

      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => (img.onload = resolve));

      const pdf = new window.jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageW = 210;
      const pageH = 297;
      const margin = 10;
      const maxW = pageW - margin * 2;
      const maxH = pageH - margin * 2;

      const imgWmm = maxW;
      const imgHmm = Math.min(maxH, (img.height / img.width) * imgWmm);
      const offsetX = margin;
      const offsetY = (pageH - imgHmm) / 2;

      pdf.addImage(dataUrl, "PNG", offsetX, offsetY, imgWmm, imgHmm);
      pdf.save(`${resumeData.title.replace(/[^a-z0-9\u4e00-\u9fa5]/gi, "_")}.pdf`);
      toast.success("图片PDF 导出成功");
    } catch (e) {
      console.error("Image PDF export error:", e);
      toast.error("图片PDF 导出失败");
    }
  }, [resumeData]);

  useEffect(() => {
    if (resumeId) {
      fetchResumeDetailsById();
    }
  }, [resumeId, fetchResumeDetailsById]);

  // Auto-save interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateResumeDetails(undefined, { silent: true, showToast: true });
    }, 1 * 10 * 1000);

    return () => clearInterval(intervalId);
  }, [updateResumeDetails]);

  return (
    <DashboardLayout>
      <div className={containerStyles.main}>
        <div className={containerStyles.header}>
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setResumeData((prev) => ({
                ...prev,
                title: value,
              }))
            }
          />

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDeleteResume}
              className={buttonStyles.delete}
              disabled={isLoading}
            >
              <Trash2 size={16} />
              <span className="text-sm">删除</span>
            </button>

            <button
              onClick={() => setOpenPreviewModal(true)}
              className={buttonStyles.download}
              disabled={isLoading}
            >
              <Download size={16} />
              <span className="text-sm">预览</span>
            </button>
          </div>
        </div>

        {/* step progress */}
        <div className={containerStyles.grid}>
          <div className={containerStyles.formContainer}>
            <StepProgress progress={progress} />
            {memoizedForm}
            <div className="p-4 sm:p-6">
              {errorMsg && (
                <div className={statusStyles.error}>
                  <AlertCircle size={16} />
                  {errorMsg}
                </div>
              )}
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  className={buttonStyles.back}
                  onClick={goBack}
                  disabled={isLoading}
                >
                  <ArrowLeft size={16} />
                  <span>上一步</span>
                </button>
                <button
                  className={buttonStyles.save}
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {isLoading ? "保存中..." : "保存并退出"}
                </button>

                <button
                  className={buttonStyles.next}
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage === "additionalInfo" && <Download size={16} />}
                  {currentPage === "additionalInfo" ? "预览并下载" : "下一步"}
                  {currentPage === "additionalInfo" && (
                    <ArrowLeft size={16} className="rotate-100" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className={containerStyles.previewContainer}>
              <div className="text-center mb-4">
                <div className={statusStyles.completionBadge}>
                  <div className={iconStyles.pulseDot}></div>
                  <span>预览 - 完成度 {completionPercentage}%</span>
                </div>
              </div>

              <div
                className="preview-container relative"
                ref={previewContainerRef}
              >
                <div className={containerStyles.previewInner}>
                  <TemplateOne
                    key={`preview-${resumeData?.template?.theme}`}
                    resumeData={resumeData}
                    containerWidth={previewWidth}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnText={
          isDownloading ? "生成中..." : downloadSuccess ? "已下载" : "下载 PDF"
        }
        actionBtnIcon={
          isDownloading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : downloadSuccess ? (
            <Check size={16} className="text-white" />
          ) : (
            <Download size={16} />
          )
        }
        onActionClick={downloadPDF}
      >
        <div className="relative">
          <div className="text-center mb-4">
            <div className={statusStyles.modalBadge}>
              <div className={iconStyles.pulseDot}></div>
              <span>Completion:{completionPercentage}%</span>
            </div>
          </div>

          <div className={containerStyles.pdfPreview}>
            <div ref={resumeDownloadRef} className="a4-wrapper">
              <div className="w-full h-full">
                <TemplateOne
                  key={`pdf-${resumeData?.template?.theme}`}
                  resumeData={resumeData}
                  containerWidth={null}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 justify-end">
            <button className={buttonStyles.back} onClick={exportAsPNG} disabled={isDownloading || isLoading}>
              导出 PNG
            </button>
            <button className={buttonStyles.save} onClick={exportAsImagePDF} disabled={isDownloading || isLoading}>
              导出图片 PDF
            </button>
          </div>
        </div>
      </Modal>

      {/* now thumnail error fix */}
      <div style={{ display: "none" }} ref={thumbnailRef}>
        <div className={containerStyles.hiddenThumbnail}>
          <TemplateOne
            key={`thumbnail-${resumeData?.template?.theme}`}
            resumeData={resumeData}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EditResume;
