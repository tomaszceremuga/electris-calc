import React from "react";
import { FileText, Trash2 } from "lucide-react";

interface UploadElementProps{
  index:number
  fileName:string
  onDelete: (index: number) => void;
  fileSize:number
  
}

const UploadElement = ({index,fileName,onDelete, fileSize}:UploadElementProps) => {
  const formatFileSize = (size: number): string => {
    return size >= 1_048_576
      ? `${(size / 1_048_576).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  return (
    <div className="flex items-center justify-between p-2 border rounded-md bg-neutral-50">
          <div className="flex items-center gap-2">
          <div>
        <FileText/>
      </div>
            <div>
              <p className="text-sm">{fileName}</p>
              <p className="text-xs text-neutral-400">{formatFileSize(fileSize)}</p>
            </div>
          </div>
          <button className=" hover:text-red-600" onClick={()=>{
            onDelete(index)
          }}>
          <Trash2 />
        </button>
        </div>
  
  );
};

export default UploadElement;
