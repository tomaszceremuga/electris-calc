"use client";

import UploadArea from "./UploadArea";
import UploadFileList from "./UploadFileList";
import { useFormContext } from "~/lib/FormContext";

const UploadSection = () => {
  const { setUploadedFiles } = useFormContext();
  const { formCurrentState } = useFormContext();

  const uploadedFiles = formCurrentState.uploadedFiles;

  const count = uploadedFiles.length;

  return (
    <div className="flex flex-col gap-6 p-5">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-6">
        <div className="w-full md:w-1/2">
          <UploadArea
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            count={count}
          />
        </div>
        <UploadFileList
          uploadedFiles={formCurrentState.uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </div>
    </div>
  );
};

export default UploadSection;
