"use client";

import Requirements from "./Requirements";
import UploadArea from "./UploadArea";
import UploadFileList from "./UploadFileList";
import { useFormContext } from "~/lib/FormContext";

const UploadSection = () => {
  const { setUploadedFiles } = useFormContext();
  const { formCurrentState } = useFormContext();

  const uploadedFiles = formCurrentState.uploadedFiles;

  const count = uploadedFiles.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-6">
        <div className="w-full md:w-[48%]">
          <UploadArea
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            count={count}
          />
        </div>
        <div className="w-full md:w-[48%]">
          <Requirements />
        </div>
      </div>
      <UploadFileList
        uploadedFiles={formCurrentState.uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />
    </div>
  );
};

export default UploadSection;
