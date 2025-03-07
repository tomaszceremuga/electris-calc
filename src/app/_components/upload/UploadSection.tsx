
import React from 'react';
import Requirements from './Requirements';
import UploadArea from './UploadArea';
import UploadFileList from './UploadFileList';

const UploadSection = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-4">
        <UploadArea/>
        <Requirements/>
      </div>
     <UploadFileList/>
    </div>
  );
};

export default UploadSection;
