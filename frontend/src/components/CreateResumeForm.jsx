//创建文档的弹窗页面内容
import React, { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";

const CreateResumeForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("标题是必需的");
      toast.error("请输入文档标题");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });
      if (response.data?.newResume?._id) {
        toast.success("文档创建成功！");
        onSuccess();
        // navigate('/dashboard');
        navigate(`/document/${response.data.newResume._id}`);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        const errorMessage = err.response.data.message;
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        const errorMessage = "创建文档时发生错误";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounder-2xl border border-gray-100 shadow-lg p-5">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        创建新文档
      </h3>
      <p className="text-gray-600 mb-8">
        为您的文档起一个最能代表您内容的标题。
      </p>

      <form onSubmit={handleCreateDocument}>
        <Input
          label="文档标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={error}
          placeholder="为您的文档输入标题"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-rose-200 transition-all"
        >
          创建文档
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
