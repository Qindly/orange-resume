import React from "react";

const RenderResume = ({ templatedId, resumeData, containerWidth }) => {
  switch (templatedId) {
    case "01":
      return (
        <TemplateOne resumeData={resumeData} containerWidth={containerWidth} />
      );
    case "02":
      return (
        <TemplateTwo resumeData={resumeData} containerWidth={containerWidth} />
      );
    case "03":
      return (
        <TemplateThree
          resumeData={resumeData}
          containerWidth={containerWidth}
        />
      );
    default:
      return (
        <TemplateOne resumeData={resumeData} containerWidth={containerWidth} />
      );
  }
};

export default RenderResume;
