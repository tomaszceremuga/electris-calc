"use client";
import type React from "react";
import Requirements from "./Requirements";
import UploadArea from "./UploadArea";
import { type UploadedFile } from "~/lib/UploadedFileType";

import UploadFileList from "./UploadFileList";

interface UploadSectionProps {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

const UploadSection = ({
  uploadedFiles,
  setUploadedFiles,
}: UploadSectionProps) => {
  // Używamy count z uploadedFiles.length
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
        uploadedFiles={uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />
    </div>
  );
};

export default UploadSection;
