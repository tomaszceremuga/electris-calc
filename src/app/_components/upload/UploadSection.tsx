// import React from "react";
// import UploadArea from "./UploadArea";
// import UploadFileList from "./UploadFileList";
// import Requirements from "./Requirements";

// const UploadSection = () => {
//   return <>
    
//     <div className="flex justify-center">
//       <UploadArea/>
//       <Requirements/>
      
//     </div>
//     <UploadFileList/>
//     </>
  
// };

// export default UploadSection;
import React from 'react';
import { Button } from '~/components/ui/button';

const UploadSection = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Sekcja górna */}
      <div className="flex justify-between gap-4">
        {/* Blok upload */}
        <div className="flex flex-col items-center justify-center border-4 border-dashed bg-gray-50 w-72 h-72 p-4">
          <button className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z"
              />
            </svg>
          </button>
          <Button className="bg-zinc-600">Wybierz plik</Button>
        </div>

        {/* Sekcja wymagań */}
        <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md">
          <p className="text-lg font-semibold mb-2">WYMAGANIA</p>
          <div className="text-gray-700 text-sm">
            <p>Rozmiar &lt; 200MB</p>
            <p>Rozszerzenia dla 3D: *.step, *.stp, *.x_t, *.iges, *.igs, *.sldprt</p>
            <p>Rozszerzenia dla 2D: *.dwg, *.dxf, *.pdf</p>
            <p>Możesz dodać maksymalnie 12 zdjęć, dla lepszej jakości nie przesyłaj folderów ZIP.</p>
            <p className="mt-4 font-medium">Domyślnie:</p>
            <ul className="list-disc list-inside ml-4">
              <li>Zagłębione narożniki części są wykonywane jako zaokrąglone narożniki (fazowania).</li>
              <li>Ostre krawędzie i zadziorności zostaną usunięte.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sekcja wczytanych plików */}
      <div className="bg-white p-4 rounded-lg shadow-md w-full">
        <p className="text-lg font-semibold mb-2">WCZYTANE PLIKI</p>
        <div className="space-y-2">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
              <div className="flex items-center gap-2">
                <span>📄</span>
                <div>
                  <p className="text-sm">sciezkadoobrazka.png</p>
                  <p className="text-xs text-gray-500">12MB</p>
                </div>
              </div>
              <button className="text-red-600">🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
