import * as React from "react"
import UploadElement from "./UploadElement"



const UploadFileList = () => {
  return (
    <div className=" p-4 rounded-lg  w-full">
    <p className="text-lg font-semibold mb-2">WCZYTANE PLIKI</p>
    <div className="space-y-2">
      <UploadElement/>
      <UploadElement/>
      <UploadElement/>
      <UploadElement/>
    </div>
  </div>

  )
}

export default UploadFileList
