// 编辑Markdown文档的主要内容，实现左边右边的同步更新
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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

// 3. 导入本地组件
import DashboardLayout from "./DashboardLayout";
import { TitleInput } from "./Input";
import MarkdownEditor from "./MarkdownEditor";

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
import "./MarkdownEditor.css";

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
  const { documentId } = useParams();
  const navigate = useNavigate();
  const documentDownloadRef = useRef(null);
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

  const [documentData, setDocumentData] = useState({
    title: "Professional Resume",
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

  // 添加Markdown内容状态
  const [markdownContent, setMarkdownContent] = useState('');

  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    let completedFields = 0;
    let totalFields = 0;

    // 文档内容
    totalFields += 1;
    if (documentData.content && documentData.content.trim() !== '') completedFields++;

    const percentage = Math.round((completedFields / totalFields) * 100);
    return isNaN(percentage) ? 0 : percentage;
  }, [documentData]);


  // useEffect(() => {
  //   calculateCompletion();
  // }, [documentData]);

  // Validate Inputs
  const validateAndNext = () => {
    const errors = [];

    switch (currentPage) {
      case "profile-info": {
        const { fullName, designation, summary } = documentData.profileInfo;
        if (!fullName.trim()) errors.push("Full Name is required");
        if (!designation.trim()) errors.push("Designation is required");
        if (!summary.trim()) errors.push("Summary is required");
        break;
      }

      case "contact-info": {
        const { email, phone } = documentData.contactInfo;
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
          errors.push("Valid email is required.");
        if (!phone.trim() || !/^\d{10}$/.test(phone))
          errors.push("Valid 10-digit phone number is required");
        break;
      }

      case "work-experience": {
        documentData.workExperience.forEach(
          ({ company, role, startDate, endDate }, index) => {
            if (!company || !company.trim())
              errors.push(`Company is required in experience ${index + 1}`);
            if (!role || !role.trim())
              errors.push(`Role is required in experience ${index + 1}`);
            if (!startDate || !endDate)
              errors.push(
                `Start and End dates are required in experience ${index + 1}`
              );
          }
        );
        break;
      }

      case "education-info": {
        documentData.education.forEach(
          ({ degree, institution, startDate, endDate }, index) => {
            if (!degree.trim())
              errors.push(`Degree is required in education ${index + 1}`);
            if (!institution.trim())
              errors.push(`Institution is required in education ${index + 1}`);
            if (!startDate || !endDate)
              errors.push(
                `Start and End dates are required in education ${index + 1}`
              );
          }
        );
        break;
      }

      case "skills": {
        documentData.skills.forEach(({ name, progress }, index) => {
          if (!name.trim())
            errors.push(`Skill name is required in skill ${index + 1}`);
          if (progress < 1 || progress > 100)
            errors.push(
              `Skill progress must be between 1 and 100 in skill ${index + 1}`
            );
        });
        break;
      }

      case "projects": {
        documentData.projects.forEach(({ title, description }, index) => {
          if (!title.trim())
            errors.push(`Project Title is required in project ${index + 1}`);
          if (!description.trim())
            errors.push(
              `Project description is required in project ${index + 1}`
            );
        });
        break;
      }

      case "certifications": {
        documentData.certifications.forEach(({ title, issuer }, index) => {
          if (!title.trim())
            errors.push(
              `Certification Title is required in certification ${index + 1}`
            );
          if (!issuer.trim())
            errors.push(`Issuer is required in certification ${index + 1}`);
        });
        break;
      }

      case "additionalInfo": {
        // 文档内容验证
        if (!documentData.content || !documentData.content.trim()) {
          errors.push("文档内容不能为空");
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
  };

  const goToNextStep = () => {
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
  };

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
    setDocumentData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  }, []);

  const updateArrayItem = useCallback((section, index, key, value) => {
    setDocumentData((prev) => {
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
    setDocumentData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  }, []);

  const removeArrayItem = useCallback((section, index) => {
    setDocumentData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [section]: updatedArray,
      };
    });
  }, []);

  const fetchDocumentDetailsById = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(documentId)
      );

      if (response.data && response.data.profileInfo) {
        const resumeInfo = response.data;

        setDocumentData((prevState) => ({
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
      console.error("Error fetching document:", error);
      toast.error("加载文档数据失败");
    }
  }, [documentId]);

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
        `thumbnail-${documentId}.png`
      );

      const formData = new FormData();
      formData.append("thumbnail", thumbnailFile);

      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(documentId),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { thumbnailLink } = uploadResponse.data;
      await updateResumeDetails(thumbnailLink);

      toast.success("文档更新成功");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error Uploading Images:", error);
      toast.error("上传图片失败");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateResumeDetails = useCallback(async (thumbnailLink) => {
    try {
      setIsLoading(true);

      await axiosInstance.put(API_PATHS.RESUME.UPDATE(documentId), {
        ...documentData,
        thumbnailLink: thumbnailLink || "",
        completion: completionPercentage,
      });
    } catch (err) {
      console.error("Error updating document:", err);
      toast.error("更新文档详情失败");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDeleteResume = useCallback(async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(documentId));
      toast.success("文档删除成功");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("删除文档失败");
    } finally {
      setIsLoading(false);
    }
  }, []);
  const memoizedForm = useMemo(() => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData={documentData?.profileInfo}
            updateSection={(key, value) =>
              updateSection("profileInfo", key, value)
            }
            onNext={validateAndNext}
          />
        );

      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={documentData?.contactInfo}
            updateSection={(key, value) =>
              updateSection("contactInfo", key, value)
            }
          />
        );

      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={documentData?.workExperience}
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
            educationInfo={documentData?.education}
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
            skillsInfo={documentData?.skills}
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
            projectInfo={documentData?.projects}
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
            certifications={documentData?.certifications}
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
            languages={documentData.languages}
            interests={documentData.interests}
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
  }, [currentPage, documentData, updateSection, updateArrayItem, addArrayItem, removeArrayItem]);

  const downloadPDF = useCallback(async () => {
    const element = documentDownloadRef.current;
    if (!element) {
      toast.error("生成PDF失败，请重试。");
      return;
    }

    setIsDownloading(true);
    setDownloadSuccess(false);
    const toastId = toast.loading("正在生成PDF");

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
          filename: `${documentData.title.replace(/[^a-z0-9]/gi, "_")}.pdf`,
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

      toast.success("PDF下载成功！", { id: toastId });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("PDF error:", err);
      toast.error(`生成PDF失败: ${err.message}`, { id: toastId });
    } finally {
      document.getElementById("__pdf_color_override__")?.remove();
      setIsDownloading(false);
    }
  }, [documentData, documentId]);

  const downloadImage = useCallback(async () => {
    const element = documentDownloadRef.current;
    if (!element) {
      toast.error("生成图片失败，请重试。");
      return;
    }

    setIsDownloading(true);
    const toastId = toast.loading("正在生成图片");

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: "#FFFFFF",
        logging: false,
      });

      const imageDataUrl = canvas.toDataURL("image/png");
      const imageFile = dataURLtoFile(imageDataUrl, `${documentData.title.replace(/[^a-z0-9]/gi, "_")}.png`);

      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadResponse = await axiosInstance.put(
        API_PATHS.RESUME.UPLOAD_IMAGES(documentId),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { thumbnailLink } = uploadResponse.data;
      await updateResumeDetails(thumbnailLink);

      toast.success("图片下载成功！", { id: toastId });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Image error:", err);
      toast.error(`生成图片失败: ${err.message}`, { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  }, [documentData, documentId, updateResumeDetails]);

  useEffect(() => {
    if (documentId) {
      fetchDocumentDetailsById();
    }
  }, [documentId, fetchDocumentDetailsById]);

  return (
    <DashboardLayout>
      <div className={containerStyles.main}>
        <div className={containerStyles.header}>
          <TitleInput
            title="Markdown文档编辑器"
            setTitle={(value) => {
              console.log('标题更新:', value);
            }}
          />

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className={buttonStyles.back}
              disabled={isLoading}
            >
              <ArrowLeft size={16} />
              <span className="text-sm">返回</span>
            </button>

            <button
              onClick={() => {
                console.log('预览Markdown内容:', markdownContent);
                setOpenPreviewModal(true);
              }}
              className={buttonStyles.download}
              disabled={isLoading}
            >
              <Eye size={16} />
              <span className="text-sm">预览</span>
            </button>
          </div>
        </div>

        {/* Markdown编辑器 */}
        <div className="h-full">
          <MarkdownEditor
            content={markdownContent}
            onContentChange={setMarkdownContent}
            onSave={(content) => {
              console.log('保存Markdown内容:', content);
              toast.success('内容已保存');
            }}
          />
        </div>
      </div>

      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title="Markdown文档预览"
        showActionBtn={false}
      >
        <div className="relative">
          <div className="text-center mb-4">
            <div className={statusStyles.modalBadge}>
              <div className={iconStyles.pulseDot}></div>
              <span>Markdown预览</span>
            </div>
          </div>

          {/* 下载按钮区域 */}
          <div className="flex justify-center gap-3 mb-4">
            <button
              onClick={() => downloadPDF()}
              disabled={isDownloading}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <Loader2 size={16} className="mr-2 animate-spin" />
              ) : (
                <Download size={16} className="mr-2" />
              )}
              {isDownloading ? '生成中...' : '下载PDF'}
            </button>

            <button
              onClick={() => downloadImage()}
              disabled={isDownloading}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <Loader2 size={16} className="mr-2 animate-spin" />
              ) : (
                <Download size={16} className="mr-2" />
              )}
              {isDownloading ? '生成中...' : '下载图片'}
            </button>
          </div>

          {/* 预览内容区域 - 增加高度和滚动 */}
          <div className="max-h-[70vh] overflow-y-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div
              ref={documentDownloadRef}
              className="markdown-content bg-white"
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {markdownContent || `# 开始编写您的文档

在左侧编辑区域输入Markdown内容，右侧将实时显示预览效果。

## 支持的语法

- **粗体文本**
- *斜体文本*
- \`行内代码\`
- [链接](https://example.com)
- 列表项

\`\`\`javascript
// 代码块
function hello() {
  console.log('Hello World!');
}
\`\`\`

| 表格 | 示例 |
|------|------|
| 单元格1 | 单元格2 |

> 引用文本示例`}
              </ReactMarkdown>
            </div>
          </div>

          {/* 下载成功提示 */}
          {downloadSuccess && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center text-green-800">
                <Check size={16} className="mr-2" />
                <span className="text-sm">文件下载成功！</span>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* 移除不需要的缩略图元素 */}
    </DashboardLayout>
  );
};

export default EditResume;
