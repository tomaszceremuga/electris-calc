import React from "react";
import { FileText, Trash2 } from "lucide-react";

interface UploadElementProps{
  index:number
  fileName:string
}

const UploadElement = ({fileName}:UploadElementProps) => {
  return (
    <div className="flex items-center justify-between p-2 border rounded-md bg-neutral-50">
          <div className="flex items-center gap-2">
          <div>
        <FileText/>
      </div>
            <div>
              <p className="text-sm">{fileName}</p>
              <p className="text-xs text-neutral-400">12MB</p>
            </div>
          </div>
          <button className=" hover:text-red-600">
          <Trash2 />
        </button>
        </div>
  
  );
};

export default UploadElement;
