import * as React from "react";
import UploadElement from "./UploadElement";

interface UploadFileProps {
  fileList: string[]; // File list passed from parent
  setFileList: (newList: string[]) => void; // Function to update the file list
}

const UploadFileList = ({ fileList, setFileList }: UploadFileProps) => {
  const handleDeleteButton = (i: number) => {
    const updatedList = fileList.filter((_, index) => index !== i);
    setFileList(updatedList);
  };

  return (
    <div className="p-4 rounded-lg w-full">
      <p className="text-lg font-semibold mb-2">WCZYTANE PLIKI</p>
      <div className="space-y-2">
        {fileList.map((fileName, index) => (
          <UploadElement key={index} index={index} onDelete={handleDeleteButton} fileName={fileName} />
        ))}
      </div>
    </div>
  );
};

export default UploadFileList;