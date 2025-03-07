import React from "react";

const UploadElement = () => {
  return (
    <div className="flex items-center justify-between p-2 border rounded-md bg-neutral-50">
          <div className="flex items-center gap-2">
          <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19.903 8.586a1 1 0 0 0-.196-.293l-6-6a1 1 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a1 1 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a1 1 0 0 0-.051-.259q-.014-.048-.033-.093M16.586 8H14V5.414zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10z"
          />
          <path fill="currentColor" d="M8 12h8v2H8zm0 4h8v2H8zm0-8h2v2H8z" />
        </svg>
      </div>
            <div>
              <p className="text-sm">sciezkadoobrazka.png</p>
              <p className="text-xs text-neutral-400">12MB</p>
            </div>
          </div>
          <button className=" hover:text-red-600"><svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 24 24"
          
        >
          <path
            fill="currentColor"
            d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4zM6 6v14h12V6zm3 3h2v8H9zm4 0h2v8h-2z"
          />
        </svg></button>
        </div>
  
  );
};

export default UploadElement;
