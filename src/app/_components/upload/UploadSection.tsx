"use client"
import React, { useState } from 'react';
import Requirements from './Requirements';
import UploadArea from './UploadArea';
import UploadFileList from './UploadFileList';


const UploadSection = () => {
  const [fileList,setFileList]=useState<string[]>([])
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-4">
        <UploadArea setFileList={setFileList}/>
        <Requirements/>
      </div>
     <UploadFileList fileList={fileList} setFileList={setFileList}/>
    </div>
  );
};

export default UploadSection;
