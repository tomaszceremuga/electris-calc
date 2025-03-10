import * as React from "react";
import UploadElement from "./UploadElement";

interface UploadFileProps {
  fileList: string[]; // File list passed from parent
  setFileList: (newList: string[]) => void;
  fileSize: number[];
  // Function to update the file list
}

const UploadFileList = ({
  fileList,
  setFileList,
  fileSize,
}: UploadFileProps) => {
  const handleDeleteButton = (i: number) => {
    const updatedList = fileList.filter((_, index) => index !== i);
    setFileList(updatedList);
  };

  return (
    fileList.length > 0 && (
      <div className="w-full rounded-lg p-4">
        <p className="mb-2 text-lg font-semibold">WCZYTANE PLIKI</p>
        <div className="space-y-2">
          {fileList.map((fileName, index) => (
            <UploadElement
              key={index}
              index={index}
              onDelete={handleDeleteButton}
              fileName={fileName}
              fileSize={fileSize.at(index) ?? 0}
            />
          ))}
        </div>
      </div>
    )
  );
};

export default UploadFileList;
