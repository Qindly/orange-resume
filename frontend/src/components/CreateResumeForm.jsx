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

  const handleCreateResume = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Title is required");
      toast.error("Please enter a resume title");
      return;
    }
    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });
      if (response.data?.newResume?._id) {
        toast.success("Resume created successfully!");
        onSuccess();
        // navigate('/dashboard');
        navigate(`/resume/${response.data.newResume._id}`);
      }
    } catch (err) {
      if (err.response?.data?.message) {
        const errorMessage = err.response.data.message;
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        const errorMessage = "An error occurred while creating the resume";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounder-2xl border border-gray-100 shadow-lg p-5">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Create New Resume
      </h3>
      <p className="text-gray-600 mb-8">
        Give your resume a title that best represents your skills and
        experience.
      </p>

      <form onSubmit={handleCreateResume}>
        <Input
          label="Resume Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={error}
          placeholder="Enter a title for your resume"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-rose-200 transition-all"
        >
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
