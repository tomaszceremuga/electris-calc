import type * as React from "react";
import UploadElement from "./UploadElement";
import { type UploadedFile } from "~/lib/UploadedFileType";

interface UploadFileProps {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
}

const UploadFileList = ({
  uploadedFiles,
  setUploadedFiles,
}: UploadFileProps) => {
  const handleDeleteButton = (i: number) => {
    setUploadedFiles((prev) => prev.filter((_, index) => index !== i));
  };

  return (
    uploadedFiles.length > 0 && (
      <div className="w-full rounded-lg p-4">
        <p className="mb-2 text-lg font-semibold">WCZYTANE PLIKI</p>
        <div className="space-y-2">
          {uploadedFiles.map((file, index) => (
            <UploadElement
              key={index}
              index={index}
              onDelete={handleDeleteButton}
              file={file}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default UploadFileList;
