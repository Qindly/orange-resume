import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dashboardStyles as styles } from "../assets/dummystyle";
import DashboardLayout from "../components/DashboardLayout";
import { LucideFilePlus, LucideTrash2 } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import CreateResumeForm from "../components/CreateResumeForm";
import { API_PATHS } from "../utils/apiPaths";
import { ResumeSummaryCard } from "../components/Card";
import toast from "react-hot-toast";
import moment from "moment";
import Modal from "../components/Modal";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const calculateCompletion = (resume) => {
    let completedFields = 0;
    let totalFields = 0;

    // Profile Info
    totalFields += 3;
    if (resume.profileInfo?.fullName) completedFields++;
    if (resume.profileInfo?.designation) completedFields++;
    if (resume.profileInfo?.summary) completedFields++;

    // Contact Info
    totalFields += 2;
    if (resume.contactInfo?.email) completedFields++;
    if (resume.contactInfo?.phone) completedFields++;

    // Work Experience
    resume.workExperience?.forEach((exp) => {
      totalFields += 5;
      if (exp.company) completedFields++;
      if (exp.role) completedFields++;
      if (exp.startDate) completedFields++;
      if (exp.endDate) completedFields++;
      if (exp.description) completedFields++;
    });

    // Education
    resume.education?.forEach((edu) => {
      totalFields += 4;
      if (edu.degree) completedFields++;
      if (edu.institution) completedFields++;
      if (edu.startDate) completedFields++;
      if (edu.endDate) completedFields++;
    });

    // Skills
    resume.skills?.forEach((skill) => {
      totalFields += 2;
      if (skill.name) completedFields++;
      if (skill.progress > 0) completedFields++;
    });

    // Projects
    resume.projects?.forEach((project) => {
      totalFields += 4;
      if (project.title) completedFields++;
      if (project.description) completedFields++;
      if (project.github) completedFields++;
      if (project.liveDemo) completedFields++;
    });

    // Certifications
    resume.certifications?.forEach((cert) => {
      totalFields += 3;
      if (cert.title) completedFields++;
      if (cert.issuer) completedFields++;
      if (cert.year) completedFields++;
    });

    // Languages
    resume.languages?.forEach((lang) => {
      totalFields += 2;
      if (lang.name) completedFields++;
      if (lang.progress > 0) completedFields++;
    });

    // Interests
    totalFields += resume.interests?.length || 0;
    completedFields +=
      resume.interests?.filter((i) => i?.trim() !== "")?.length || 0;

    return Math.round((completedFields / totalFields) * 100);
  };

  const fetchAllResumes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      const resumesWithCompletion = response.data.resumes?.map((resume) => ({
        ...resume,
        completion: calculateCompletion(resume),
      }));
      setAllResumes(resumesWithCompletion);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  const handleDeleteResume = async () => {
    if (!resumeToDelete) return;
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeToDelete));
      toast.success("Resume deleted successfully");
      fetchAllResumes();
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("failed to delete resume");
    } finally {
      setResumeToDelete(null);
      setShowDeleteConfirm(false);
    }
  };
  const handleDeleteClick = (id) => {
    setResumeToDelete(id);
    setShowDeleteConfirm(true);
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        {/* 首行目录和创建 */}
        <div className={styles.headerWrapper}>
          <div>
            <h1 className={styles.headerTitle}>My Resumes</h1>
            <p className={styles.headerSubtitle}>
              {allResumes.length > 0
                ? `you have ${allResumes.length} resumes`
                : "you have no resumes"}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              className={styles.createButton}
              onClick={() => setOpenCreateModel(true)}
            >
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Now
                <LucideFilePlus
                  className="group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </span>
            </button>
          </div>
        </div>

        {/* 加载 */}
        {loading && (
          <div className={styles.spinnerWrapper}>
            <div className={styles.spinner}></div>
          </div>
        )}

        {/* 创建页面 */}
        {!loading && allResumes.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyIconWrapper}>
              <LucideFilePlus size={32} className="text-violet-600" />
            </div>

            <h3 className={styles.emptyTitle}> No Resumes Yet</h3>
            <p className={styles.emptyText}>
              Create your first resume by clicking the button below.
            </p>

            <button
              className={styles.createButton}
              onClick={() => setOpenCreateModel(true)}
            >
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                Create Now
                <LucideFilePlus
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </span>
            </button>
          </div>
        )}

        {!loading && allResumes.length > 0 && (
          <div className={styles.grid}>
            <div
              className={styles.newResumeCard}
              onClick={() => setOpenCreateModel(true)}
            >
              <div className={styles.newResumeIcon}>
                <LucideFilePlus size={32} className="text-white" />
              </div>
              <h3 className={styles.newResumeTitle}>Create New Resume</h3>
              <p className={styles.newResumeText}>Start building your resume</p>
            </div>

            {allResumes.map((resume) => (
              <ResumeSummaryCard
                key={resume._id}
                imgUrl={resume.updateAt}
                title={resume.title}
                createdAt={resume.createdAt}
                updatedAt={resume.updateAt}
                onSelect={() => navigate(`/resume/${resume._id}`)}
                onDelete={() => handleDeleteClick(resume._id)}
                completion={resume.completion || 0}
                isPremium={resume.isPremium}
                isNew={moment().diff(moment(resume.createdAt), "days") < 7}
              />
            ))}
          </div>
        )}
      </div>

      {/* 创建简历的弹窗 */}
      <Modal
        isOpen={openCreateModel}
        onClose={() => setOpenCreateModel(false)}
        hideHeader
        maxWidth="max-w-2xl"
      >
        <div className="p-6">
          <div className={styles.modalHeader}>
            <h3 className={styles.modalTitle}>Create New Resume</h3>
            <button
              onClick={() => setOpenCreateModel(false)}
              className={styles.modalCloseButton}
            >
              X
            </button>
          </div>
          <CreateResumeForm
            onSuccess={() => {
              setOpenCreateModel(false);
              fetchAllResumes();
            }}
          />
        </div>
      </Modal>

      {/* 删除简历的弹窗 */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Delete"
        showActionBtn
        actionBtnText="Delete"
        onActionClick={handleDeleteResume}
      >
        <div className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className={styles.deleteIconWrapper}>
              <LucideTrash2 size={24} className="text-red-600" />
            </div>
            <h3 className={styles.deleteTitle}>Delete Resume?</h3>
            <p className={styles.deleteText}>
              Are you sure you want to delete this resume? This action is
              irreversible.
            </p>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
