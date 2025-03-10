"use client"
import React, { useState } from 'react';
import Requirements from './Requirements';
import UploadArea from './UploadArea';
import UploadFileList from './UploadFileList';


const UploadSection = () => {
  const [fileList,setFileList]=useState<string[]>([])
  const [fileSize,setFileSize]=useState<number[]>([])
  const [count,setCount]=useState<number>(0)
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-4">
        <UploadArea setFileList={setFileList} setFileSize={setFileSize} count={count} setCount={setCount}/>
        <Requirements/>
      </div>
     <UploadFileList fileList={fileList} setFileList={setFileList} fileSize={fileSize} setFileSize={setFileSize} setCount={setCount}/>
    </div>
  );
};

export default UploadSection;
