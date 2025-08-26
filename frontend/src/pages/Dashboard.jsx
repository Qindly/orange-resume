// Markdown文档页面
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
  const [allDocuments, setAllDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const calculateCompletion = (document) => {
    let completedFields = 0;
    let totalFields = 0;

    // 文档内容
    totalFields += 1;
    if (document.content && document.content.trim() !== '') completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  };

  const fetchAllDocuments = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      const documentsWithCompletion = response.data.resumes?.map((document) => ({
        ...document,
        completion: calculateCompletion(document),
      }));
      setAllDocuments(documentsWithCompletion);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDocuments();
  }, []);

  const handleDeleteDocument = async () => {
    if (!documentToDelete) return;
    try {
      await axiosInstance.delete(API_PATHS.RESUME.DELETE(documentToDelete));
      toast.success("文档删除成功");
      fetchAllDocuments();
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("删除文档失败");
    } finally {
      setDocumentToDelete(null);
      setShowDeleteConfirm(false);
    }
  };
  const handleDeleteClick = (id) => {
    setDocumentToDelete(id);
    setShowDeleteConfirm(true);
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        {/* 首行目录和创建 */}
        <div className={styles.headerWrapper}>
          <div>
            <h1 className={styles.headerTitle}>我的文档</h1>
            <p className={styles.headerSubtitle}>
              {allDocuments.length > 0
                ? `您有 ${allDocuments.length} 个文档`
                : "您还没有文档"}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              className={styles.createButton}
              onClick={() => setOpenCreateModel(true)}
            >
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                立即创建
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
        {!loading && allDocuments.length === 0 && (
          <div className={styles.emptyStateWrapper}>
            <div className={styles.emptyIconWrapper}>
              <LucideFilePlus size={32} className="text-violet-600" />
            </div>

            <h3 className={styles.emptyTitle}> 还没有文档</h3>
            <p className={styles.emptyText}>
              点击下面的按钮创建您的第一个文档。
            </p>

            <button
              className={styles.createButton}
              onClick={() => setOpenCreateModel(true)}
            >
              <div className={styles.createButtonOverlay}></div>
              <span className={styles.createButtonContent}>
                立即创建
                <LucideFilePlus
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </span>
            </button>
          </div>
        )}

        {!loading && allDocuments.length > 0 && (
          <div className={styles.grid}>
            <div
              className={styles.newResumeCard}
              onClick={() => setOpenCreateModel(true)}
            >
              <div className={styles.newResumeIcon}>
                <LucideFilePlus size={32} className="text-white" />
              </div>
              <h3 className={styles.newResumeTitle}>创建新文档</h3>
              <p className={styles.newResumeText}>开始编写您的文档</p>
            </div>

            {allDocuments.map((document) => (
              <ResumeSummaryCard
                key={document._id}
                imgUrl={document.updateAt}
                title={document.title}
                createdAt={document.createdAt}
                updatedAt={document.updateAt}
                onSelect={() => navigate(`/document/${document._id}`)}
                onDelete={() => handleDeleteClick(document._id)}
                completion={document.completion || 0}
                isPremium={document.isPremium}
                isNew={moment().diff(moment(document.createdAt), "days") < 7}
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
            <h3 className={styles.modalTitle}>创建新文档</h3>
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
              fetchAllDocuments();
            }}
          />
        </div>
      </Modal>

      {/* 删除简历的弹窗 */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="确认删除"
        showActionBtn
        actionBtnText="删除"
        onActionClick={handleDeleteDocument}
      >
        <div className="p-4">
          <div className="flex flex-col items-center text-center">
            <div className={styles.deleteIconWrapper}>
              <LucideTrash2 size={24} className="text-red-600" />
            </div>
            <h3 className={styles.deleteTitle}>删除文档？</h3>
            <p className={styles.deleteText}>
              您确定要删除这个文档吗？此操作不可逆。
            </p>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;
