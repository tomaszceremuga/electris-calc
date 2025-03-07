import * as React from "react"
import UploadElement from "./UploadElement"

interface UploadFileProps {
  fileList: string[]; // Function passed from parent to update the file name
}

const UploadFileList = ({fileList}:UploadFileProps) => {
  console.log(fileList)
  return (
    
    <div className=" p-4 rounded-lg  w-full">
    <p className="text-lg font-semibold mb-2">WCZYTANE PLIKI</p>
    <div className="space-y-2">
    {fileList.map((fileName, index) => (
          <UploadElement key={index} index={index} fileName={fileName} />
        ))}
    </div>
  </div>

  )
}

export default UploadFileList
