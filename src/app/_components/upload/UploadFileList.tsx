import * as React from "react"
import UploadElement from "./UploadElement"



const UploadFileList = () => {
  return (
  
    <div className=" ml-8">
      <p className="text-[20px] font-bold mb-4">WCZYTANE PLIKI</p> 
        <ul>
          <UploadElement/>
          <UploadElement/>
          <UploadElement/>
          <UploadElement/>
          <UploadElement/>
        </ul>
    </div>
  )
}

export default UploadFileList
