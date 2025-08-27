// 填写简历信息时，左边的各个表格
import React from "react";
import Input from "./Input";
import { RatingInput } from "./ResumeSection";
import { Plus, Trash2 } from "lucide-react";
import {
  commonStyles,
  additionalInfoStyles,
  certificationInfoStyles,
  contactInfoStyles,
  educationDetailsStyles,
  profileInfoStyles,
  projectDetailStyles,
  skillsInfoStyles,
  workExperienceStyles,
} from "../assets/dummystyle";

// AdditionalInfoForm Component
export const AdditionalInfoForm = React.memo(
  ({
    languages,
    interests,
    updateArrayItem,
    addArrayItem,
    removeArrayItem,
  }) => {
    return (
      <div className={additionalInfoStyles.container}>
        <h2 className={additionalInfoStyles.heading}>附加信息</h2>

        {/* Languages Section */}
        <div className="mb-10">
          <h3 className={additionalInfoStyles.sectionHeading}>
            <div className={additionalInfoStyles.dotViolet}></div>
            语言
          </h3>
          <div className="space-y-6">
            {languages?.map((lang, index) => (
              <div key={index} className={additionalInfoStyles.languageItem}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <Input
                    label="语言"
                    placeholder="例如：英语"
                    value={lang.name || ""}
                    onChange={({ target }) =>
                      updateArrayItem("languages", index, "name", target.value)
                    }
                  />
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-4">
                      熟练度
                    </label>
                    <RatingInput
                      value={lang.progress || 0}
                      total={5}
                      color="#8b5cf6"
                      bgColor="#e2e8f0"
                      onChange={(value) =>
                        updateArrayItem("languages", index, "progress", value)
                      }
                    />
                  </div>
                </div>
                {languages.length > 1 && (
                  <button
                    type="button"
                    className={commonStyles.trashButton}
                    onClick={() => removeArrayItem("languages", index)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className={`${commonStyles.addButtonBase} ${additionalInfoStyles.addButtonLanguage}`}
              onClick={() =>
                addArrayItem("languages", { name: "", progress: 0 })
              }
            >
              <Plus size={16} /> 添加语言
            </button>
          </div>
        </div>

        {/* Interests Section */}
        <div className="mb-6">
          <h3 className={additionalInfoStyles.sectionHeading}>
            <div className={additionalInfoStyles.dotOrange}></div>
            兴趣爱好
          </h3>
          <div className="space-y-4">
            {interests?.map((interest, index) => (
              <div key={index} className={additionalInfoStyles.interestItem}>
                <Input
                  placeholder="例如：阅读、摄影"
                  value={interest || ""}
                  onChange={({ target }) =>
                    updateArrayItem("interests", index, null, target.value)
                  }
                />
                {interests.length > 1 && (
                  <button
                    type="button"
                    className={commonStyles.trashButton}
                    onClick={() => removeArrayItem("interests", index)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className={`${commonStyles.addButtonBase} ${additionalInfoStyles.addButtonInterest}`}
              onClick={() => addArrayItem("interests", "")}
            >
              <Plus size={16} /> 添加兴趣
            </button>
          </div>
        </div>
      </div>
    );
  }
);

// CertificationInfoForm Component
export const CertificationInfoForm = React.memo(
  ({ certifications, updateArrayItem, addArrayItem, removeArrayItem }) => {
    return (
      <div className={certificationInfoStyles.container}>
        <h2 className={certificationInfoStyles.heading}>证书</h2>
        <div className="space-y-6 mb-6">
          {certifications.map((cert, index) => (
            <div key={index} className={certificationInfoStyles.item}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="证书名称"
                  placeholder="全栈开发工程师"
                  value={cert.title || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "title", target.value)
                  }
                />

                <Input
                  label="颁发机构"
                  placeholder="例如：Coursera / Google 等"
                  value={cert.issuer || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "issuer", target.value)
                  }
                />

                <Input
                  label="年份"
                  placeholder="2024"
                  value={cert.year || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "year", target.value)
                  }
                />
              </div>

              {certifications.length > 1 && (
                <button
                  type="button"
                  className={commonStyles.trashButton}
                  onClick={() => removeArrayItem(index)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className={`${commonStyles.addButtonBase} ${certificationInfoStyles.addButton}`}
            onClick={() =>
              addArrayItem({
                title: "",
                issuer: "",
                year: "",
              })
            }
          >
            <Plus size={16} />
            添加证书
          </button>
        </div>
      </div>
    );
  }
);

// ContactInfoForm Component
export const ContactInfoForm = React.memo(({ contactInfo, updateSection }) => {
  return (
    <div className={contactInfoStyles.container}>
      <h2 className={contactInfoStyles.heading}>联系方式</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="地址"
            placeholder="例如：北京市朝阳区"
            value={contactInfo.location || ""}
            onChange={({ target }) => updateSection("location", target.value)}
          />
        </div>

        <Input
          label="邮箱"
          placeholder="john@example.com"
          type="email"
          value={contactInfo.email || ""}
          onChange={({ target }) => updateSection("email", target.value)}
        />

        <Input
          label="手机号"
          placeholder="1234567890"
          value={contactInfo.phone || ""}
          onChange={({ target }) => updateSection("phone", target.value)}
        />

        <Input
          label="LinkedIn"
          placeholder="https://linkedin.com/in/username"
          value={contactInfo.linkedin || ""}
          onChange={({ target }) => updateSection("linkedin", target.value)}
        />

        <Input
          label="GitHub"
          placeholder="https://github.com/username"
          value={contactInfo.github || ""}
          onChange={({ target }) => updateSection("github", target.value)}
        />

        <div className="md:col-span-2">
          <Input
            label="个人网站"
            placeholder="https://yourwebsite.com"
            value={contactInfo.website || ""}
            onChange={({ target }) => updateSection("website", target.value)}
          />
        </div>
      </div>
    </div>
  );
});

// EducationDetailsForm Component
export const EducationDetailsForm = React.memo(
  ({ educationInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
    return (
      <div className={educationDetailsStyles.container}>
        <h2 className={educationDetailsStyles.heading}>教育经历</h2>
        <div className="space-y-6 mb-6">
          {educationInfo.map((education, index) => (
            <div key={index} className={educationDetailsStyles.item}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="学位/学历"
                  placeholder="计算机科学学士"
                  value={education.degree || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "degree", target.value)
                  }
                />

                <Input
                  label="学校/机构"
                  placeholder="某某大学"
                  value={education.institution || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "institution", target.value)
                  }
                />

                <Input
                  label="开始时间"
                  type="month"
                  value={education.startDate || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "startDate", target.value)
                  }
                />

                <Input
                  label="结束时间"
                  type="month"
                  value={education.endDate || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "endDate", target.value)
                  }
                />
              </div>
              {educationInfo.length > 1 && (
                <button
                  type="button"
                  className={commonStyles.trashButton}
                  onClick={() => removeArrayItem(index)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className={`${commonStyles.addButtonBase} ${educationDetailsStyles.addButton}`}
            onClick={() =>
              addArrayItem({
                degree: "",
                institution: "",
                startDate: "",
                endDate: "",
              })
            }
          >
            <Plus size={16} /> 添加教育经历
          </button>
        </div>
      </div>
    );
  }
);

// ProfileInfoForm Component
export const ProfileInfoForm = React.memo(({ profileData, updateSection }) => {
  return (
    <div className={profileInfoStyles.container}>
      <h2 className={profileInfoStyles.heading}>个人信息</h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="姓名"
            placeholder="张三"
            value={profileData.fullName || ""}
            onChange={({ target }) => updateSection("fullName", target.value)}
          />

          <Input
            label="职位"
            placeholder="全栈开发工程师"
            value={profileData.designation || ""}
            onChange={({ target }) =>
              updateSection("designation", target.value)
            }
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-3">
              个人简介
            </label>
            <textarea
              className={profileInfoStyles.textarea}
              rows={4}
              placeholder="请简要介绍你自己"
              value={profileData.summary || ""}
              onChange={({ target }) => updateSection("summary", target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

// ProjectDetailForm Component
export const ProjectDetailForm = React.memo(
  ({ projectInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
    return (
      <div className={projectDetailStyles.container}>
        <h2 className={projectDetailStyles.heading}>项目经历</h2>
        <div className="space-y-6 mb-6">
          {projectInfo.map((project, index) => (
            <div key={index} className={projectDetailStyles.item}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input
                    label="项目标题"
                    placeholder="个人作品集网站"
                    value={project.title || ""}
                    onChange={({ target }) =>
                      updateArrayItem(index, "title", target.value)
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    项目描述
                  </label>
                  <textarea
                    placeholder="请简要描述该项目"
                    className={projectDetailStyles.textarea}
                    rows={3}
                    value={project.description || ""}
                    onChange={({ target }) =>
                      updateArrayItem(index, "description", target.value)
                    }
                  />
                </div>

                <Input
                  label="GitHub 链接"
                  placeholder="https://github.com/username/project"
                  value={project.github || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "github", target.value)
                  }
                />

                <Input
                  label="在线预览地址"
                  placeholder="https://yourproject.live"
                  value={project.liveDemo || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "liveDemo", target.value)
                  }
                />
              </div>

              {projectInfo.length > 1 && (
                <button
                  type="button"
                  className={commonStyles.trashButton}
                  onClick={() => removeArrayItem(index)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className={`${commonStyles.addButtonBase} ${projectDetailStyles.addButton}`}
            onClick={() =>
              addArrayItem({
                title: "",
                description: "",
                github: "",
                liveDemo: "",
              })
            }
          >
            <Plus size={16} />
            添加项目
          </button>
        </div>
      </div>
    );
  }
);

// SkillsInfoForm Component
export const SkillsInfoForm = React.memo(
  ({ skillsInfo, updateArrayItem, addArrayItem, removeArrayItem }) => {
    return (
      <div className={skillsInfoStyles.container}>
        <h2 className={skillsInfoStyles.heading}>技能</h2>
        <div className="space-y-6 mb-6">
          {skillsInfo.map((skill, index) => (
            <div key={index} className={skillsInfoStyles.item}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="技能名称"
                  placeholder="JavaScript"
                  value={skill.name || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "name", target.value)
                  }
                />

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    熟练度（{skill.progress ? Math.round(skill.progress / 20) : 0}/5）
                  </label>
                  <div className="mt-2">
                    <RatingInput
                      value={skill.progress || 0}
                      total={5}
                      color="#f59e0b"
                      bgColor="#e2e8f0"
                      onChange={(newValue) =>
                        updateArrayItem(index, "progress", newValue)
                      }
                    />
                  </div>
                </div>
              </div>

              {skillsInfo.length > 1 && (
                <button
                  type="button"
                  className={commonStyles.trashButton}
                  onClick={() => removeArrayItem(index)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className={`${commonStyles.addButtonBase} ${skillsInfoStyles.addButton}`}
            onClick={() =>
              addArrayItem({
                name: "",
                progress: 0,
              })
            }
          >
            <Plus size={16} /> 添加技能
          </button>
        </div>
      </div>
    );
  }
);

// WorkExperienceForm Component
export const WorkExperienceForm = React.memo(
  ({ workExperience, updateArrayItem, addArrayItem, removeArrayItem }) => {
    return (
      <div className={workExperienceStyles.container}>
        <h2 className={workExperienceStyles.heading}>工作经历</h2>
        <div className="space-y-6 mb-6">
          {workExperience.map((experience, index) => (
            <div key={index} className={workExperienceStyles.item}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="公司"
                  placeholder="ABC 公司"
                  value={experience.company || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "company", target.value)
                  }
                />

                <Input
                  label="职位"
                  placeholder="前端开发工程师"
                  value={experience.role || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "role", target.value)
                  }
                />

                <Input
                  label="开始时间"
                  type="month"
                  value={experience.startDate || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "startDate", target.value)
                  }
                />

                <Input
                  label="结束时间"
                  type="month"
                  value={experience.endDate || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "endDate", target.value)
                  }
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  工作描述
                </label>
                <textarea
                  placeholder="请描述你在该岗位的主要职责/成果"
                  className={workExperienceStyles.textarea}
                  rows={3}
                  value={experience.description || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "description", target.value)
                  }
                />
              </div>

              {workExperience.length > 1 && (
                <button
                  type="button"
                  className={commonStyles.trashButton}
                  onClick={() => removeArrayItem(index)}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className={`${commonStyles.addButtonBase} ${workExperienceStyles.addButton}`}
            onClick={() =>
              addArrayItem({
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                description: "",
              })
            }
          >
            <Plus size={16} />
            添加工作经历
          </button>
        </div>
      </div>
    );
  }
);
