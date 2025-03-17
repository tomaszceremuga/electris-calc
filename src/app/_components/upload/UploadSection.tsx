"use client";
import React, { useState } from "react";
import Requirements from "./Requirements";
import UploadArea from "./UploadArea";
import UploadFileList from "./UploadFileList";
// import { Button } from "~/components/ui/button";



const UploadSection = () => {
  const [fileList, setFileList] = useState<string[]>([]);
  const [fileSize, setFileSize] = useState<number[]>([]);
  const [count, setCount] = useState<number>(0);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-6 ">
        <div className="w-full md:w-[48%]">
          <UploadArea
            setFileList={setFileList}
            setFileSize={setFileSize}
            count={count}
            setCount={setCount}
          />
        </div>
        <div className="w-full md:w-[48%]">
          <Requirements />
        </div>
      </div>
      <UploadFileList
        fileList={fileList}
        setFileList={setFileList}
        fileSize={fileSize}
        setFileSize={setFileSize}
        setCount={setCount}
      />
    </div>
  );
};

export default UploadSection;
