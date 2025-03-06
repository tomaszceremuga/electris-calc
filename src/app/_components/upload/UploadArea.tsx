import React from "react";
import { Button } from "~/components/ui/button";

const UploadArea = () => {
  return (
    
        <div className="flex flex-col items-center">
      <div className="relative flex h-72 w-72 flex-col items-center border-[4px] border-dashed bg-gray-50">
        <button className="absolute top-1/2 -translate-y-1/2 transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z"
            />
          </svg>
        </button>
        <Button className="mt-6 bg-zinc-600 absolute bottom-4">Wybierz plik</Button>
      </div>
      
    </div>
  
    
  );
};

export default UploadArea;