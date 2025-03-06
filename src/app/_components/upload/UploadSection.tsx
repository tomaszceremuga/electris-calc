import React from "react";
import UploadArea from "./UploadArea";
import UploadFileList from "./UploadFileList";

const UploadSection = () => {
  return (
    <div className="flex">
      <UploadArea/>
      <UploadFileList/>
    </div>
    
  );
};

export default UploadSection;