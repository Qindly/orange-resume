import React, { createContext, useContext, useReducer } from 'react';

// 初始状态
const initialState = {
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
};

// Action Types
export const RESUME_ACTIONS = {
  UPDATE_TITLE: 'UPDATE_TITLE',
  UPDATE_PROFILE_INFO: 'UPDATE_PROFILE_INFO',
  UPDATE_CONTACT_INFO: 'UPDATE_CONTACT_INFO',
  UPDATE_TEMPLATE: 'UPDATE_TEMPLATE',
  ADD_WORK_EXPERIENCE: 'ADD_WORK_EXPERIENCE',
  UPDATE_WORK_EXPERIENCE: 'UPDATE_WORK_EXPERIENCE',
  REMOVE_WORK_EXPERIENCE: 'REMOVE_WORK_EXPERIENCE',
  ADD_EDUCATION: 'ADD_EDUCATION',
  UPDATE_EDUCATION: 'UPDATE_EDUCATION',
  REMOVE_EDUCATION: 'REMOVE_EDUCATION',
  ADD_SKILL: 'ADD_SKILL',
  UPDATE_SKILL: 'UPDATE_SKILL',
  REMOVE_SKILL: 'REMOVE_SKILL',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  REMOVE_PROJECT: 'REMOVE_PROJECT',
  ADD_CERTIFICATION: 'ADD_CERTIFICATION',
  UPDATE_CERTIFICATION: 'UPDATE_CERTIFICATION',
  REMOVE_CERTIFICATION: 'REMOVE_CERTIFICATION',
  ADD_LANGUAGE: 'ADD_LANGUAGE',
  UPDATE_LANGUAGE: 'UPDATE_LANGUAGE',
  REMOVE_LANGUAGE: 'REMOVE_LANGUAGE',
  ADD_INTEREST: 'ADD_INTEREST',
  UPDATE_INTEREST: 'UPDATE_INTEREST',
  REMOVE_INTEREST: 'REMOVE_INTEREST',
  SET_RESUME_DATA: 'SET_RESUME_DATA',
  RESET_RESUME: 'RESET_RESUME',
};

// Reducer函数
const resumeReducer = (state, action) => {
  switch (action.type) {
    case RESUME_ACTIONS.UPDATE_TITLE:
      return { ...state, title: action.payload };

    case RESUME_ACTIONS.UPDATE_PROFILE_INFO:
      return {
        ...state,
        profileInfo: { ...state.profileInfo, ...action.payload },
      };

    case RESUME_ACTIONS.UPDATE_CONTACT_INFO:
      return {
        ...state,
        contactInfo: { ...state.contactInfo, ...action.payload },
      };

    case RESUME_ACTIONS.UPDATE_TEMPLATE:
      return {
        ...state,
        template: { ...state.template, ...action.payload },
      };

    case RESUME_ACTIONS.ADD_WORK_EXPERIENCE:
      return {
        ...state,
        workExperience: [...state.workExperience, action.payload],
      };

    case RESUME_ACTIONS.UPDATE_WORK_EXPERIENCE:
      const updatedWorkExp = [...state.workExperience];
      updatedWorkExp[action.payload.index] = {
        ...updatedWorkExp[action.payload.index],
        ...action.payload.data,
      };
      return { ...state, workExperience: updatedWorkExp };

    case RESUME_ACTIONS.REMOVE_WORK_EXPERIENCE:
      return {
        ...state,
        workExperience: state.workExperience.filter((_, index) => index !== action.payload),
      };

    case RESUME_ACTIONS.ADD_EDUCATION:
      return {
        ...state,
        education: [...state.education, action.payload],
      };

    case RESUME_ACTIONS.UPDATE_EDUCATION:
      const updatedEducation = [...state.education];
      updatedEducation[action.payload.index] = {
        ...updatedEducation[action.payload.index],
        ...action.payload.data,
      };
      return { ...state, education: updatedEducation };

    case RESUME_ACTIONS.REMOVE_EDUCATION:
      return {
        ...state,
        education: state.education.filter((_, index) => index !== action.payload),
      };

    case RESUME_ACTIONS.ADD_SKILL:
      return {
        ...state,
        skills: [...state.skills, action.payload],
      };

    case RESUME_ACTIONS.UPDATE_SKILL:
      const updatedSkills = [...state.skills];
      updatedSkills[action.payload.index] = {
        ...updatedSkills[action.payload.index],
        ...action.payload.data,
      };
      return { ...state, skills: updatedSkills };

    case RESUME_ACTIONS.REMOVE_SKILL:
      return {
        ...state,
        skills: state.skills.filter((_, index) => index !== action.payload),
      };

    case RESUME_ACTIONS.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case RESUME_ACTIONS.UPDATE_PROJECT:
      const updatedProjects = [...state.projects];
      updatedProjects[action.payload.index] = {
        ...updatedProjects[action.payload.index],
        ...action.payload.data,
      };
      return { ...state, projects: updatedProjects };

    case RESUME_ACTIONS.REMOVE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((_, index) => index !== action.payload),
      };

    case RESUME_ACTIONS.ADD_CERTIFICATION:
      return {
        ...state,
        certifications: [...state.certifications, action.payload],
      };

    case RESUME_ACTIONS.UPDATE_CERTIFICATION:
      const updatedCertifications = [...state.certifications];
      updatedCertifications[action.payload.index] = {
        ...updatedCertifications[action.payload.index],
        ...action.payload.data,
      };
      return { ...state, certifications: updatedCertifications };

    case RESUME_ACTIONS.REMOVE_CERTIFICATION:
      return {
        ...state,
        certifications: state.certifications.filter((_, index) => index !== action.payload),
      };

    case RESUME_ACTIONS.ADD_LANGUAGE:
      return {
        ...state,
        languages: [...state.languages, action.payload],
      };

    case RESUME_ACTIONS.UPDATE_LANGUAGE:
      const updatedLanguages = [...state.languages];
      updatedLanguages[action.payload.index] = {
        ...updatedLanguages[action.payload.index],
        ...action.payload.data,
      };
      return { ...state, languages: updatedLanguages };

    case RESUME_ACTIONS.REMOVE_LANGUAGE:
      return {
        ...state,
        languages: state.languages.filter((_, index) => index !== action.payload),
      };

    case RESUME_ACTIONS.ADD_INTEREST:
      return {
        ...state,
        interests: [...state.interests, action.payload],
      };

    case RESUME_ACTIONS.UPDATE_INTEREST:
      const updatedInterests = [...state.interests];
      updatedInterests[action.payload.index] = action.payload.value;
      return { ...state, interests: updatedInterests };

    case RESUME_ACTIONS.REMOVE_INTEREST:
      return {
        ...state,
        interests: state.interests.filter((_, index) => index !== action.payload),
      };

    case RESUME_ACTIONS.SET_RESUME_DATA:
      return { ...state, ...action.payload };

    case RESUME_ACTIONS.RESET_RESUME:
      return initialState;

    default:
      return state;
  }
};

// 创建Context
const ResumeContext = createContext();

// Provider组件
export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // 提供便捷的action creators
  const actions = {
    updateTitle: (title) => dispatch({ type: RESUME_ACTIONS.UPDATE_TITLE, payload: title }),
    updateProfileInfo: (data) => dispatch({ type: RESUME_ACTIONS.UPDATE_PROFILE_INFO, payload: data }),
    updateContactInfo: (data) => dispatch({ type: RESUME_ACTIONS.UPDATE_CONTACT_INFO, payload: data }),
    updateTemplate: (data) => dispatch({ type: RESUME_ACTIONS.UPDATE_TEMPLATE, payload: data }),
    
    addWorkExperience: (experience) => dispatch({ type: RESUME_ACTIONS.ADD_WORK_EXPERIENCE, payload: experience }),
    updateWorkExperience: (index, data) => dispatch({ type: RESUME_ACTIONS.UPDATE_WORK_EXPERIENCE, payload: { index, data } }),
    removeWorkExperience: (index) => dispatch({ type: RESUME_ACTIONS.REMOVE_WORK_EXPERIENCE, payload: index }),
    
    addEducation: (education) => dispatch({ type: RESUME_ACTIONS.ADD_EDUCATION, payload: education }),
    updateEducation: (index, data) => dispatch({ type: RESUME_ACTIONS.UPDATE_EDUCATION, payload: { index, data } }),
    removeEducation: (index) => dispatch({ type: RESUME_ACTIONS.REMOVE_EDUCATION, payload: index }),
    
    addSkill: (skill) => dispatch({ type: RESUME_ACTIONS.ADD_SKILL, payload: skill }),
    updateSkill: (index, data) => dispatch({ type: RESUME_ACTIONS.UPDATE_SKILL, payload: { index, data } }),
    removeSkill: (index) => dispatch({ type: RESUME_ACTIONS.REMOVE_SKILL, payload: index }),
    
    addProject: (project) => dispatch({ type: RESUME_ACTIONS.ADD_PROJECT, payload: project }),
    updateProject: (index, data) => dispatch({ type: RESUME_ACTIONS.UPDATE_PROJECT, payload: { index, data } }),
    removeProject: (index) => dispatch({ type: RESUME_ACTIONS.REMOVE_PROJECT, payload: index }),
    
    addCertification: (certification) => dispatch({ type: RESUME_ACTIONS.ADD_CERTIFICATION, payload: certification }),
    updateCertification: (index, data) => dispatch({ type: RESUME_ACTIONS.UPDATE_CERTIFICATION, payload: { index, data } }),
    removeCertification: (index) => dispatch({ type: RESUME_ACTIONS.REMOVE_CERTIFICATION, payload: index }),
    
    addLanguage: (language) => dispatch({ type: RESUME_ACTIONS.ADD_LANGUAGE, payload: language }),
    updateLanguage: (index, data) => dispatch({ type: RESUME_ACTIONS.UPDATE_LANGUAGE, payload: { index, data } }),
    removeLanguage: (index) => dispatch({ type: RESUME_ACTIONS.REMOVE_LANGUAGE, payload: index }),
    
    addInterest: (interest) => dispatch({ type: RESUME_ACTIONS.ADD_INTEREST, payload: interest }),
    updateInterest: (index, value) => dispatch({ type: RESUME_ACTIONS.UPDATE_INTEREST, payload: { index, value } }),
    removeInterest: (index) => dispatch({ type: RESUME_ACTIONS.REMOVE_INTEREST, payload: index }),
    
    setResumeData: (data) => dispatch({ type: RESUME_ACTIONS.SET_RESUME_DATA, payload: data }),
    resetResume: () => dispatch({ type: RESUME_ACTIONS.RESET_RESUME }),
  };

  const value = {
    state,
    dispatch,
    actions,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

// 自定义Hook
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export default ResumeContext;
