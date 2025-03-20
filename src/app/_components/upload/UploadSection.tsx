"use client";

import UploadArea from "./UploadArea";
import UploadFileList from "./UploadFileList";
import { useFormContext } from "~/lib/FormContext";

const UploadSection = () => {
  const { setUploadedFiles } = useFormContext();
  const { formCurrentState } = useFormContext();

  const uploadedFiles = formCurrentState.uploadedFiles;

  const count = uploadedFiles.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-6">
        <div className="w-full md:w-[48%]">
          <UploadArea
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            count={count}
          />
        </div>
        <div className="w-full md:w-[48%]">
          <div className="w-full rounded-lg bg-neutral-100 p-4 shadow-md md:max-w-md">
            <p className="mb-2 text-lg font-semibold">WYMAGANIA</p>
            <div className="text-sm text-neutral-700">
              <p>
                Rozmiar &lt;
                <span className="font-bold text-neutral-950"> 200MB</span>
              </p>
              <p>
                Rozszerzenia dla 3D:
                <span className="font-bold text-neutral-950">
                  {" "}
                  *.step, *.stp, *.x_t, *.iges, *.igs, *.sldprt
                </span>
              </p>
              <p>
                Rozszerzenia dla 2D:
                <span className="font-bold text-neutral-950">
                  {" "}
                  *.dwg, *.dxf, *.pdf{" "}
                </span>
              </p>
              <p>
                Możesz dodać{" "}
                <span className="font-bold text-neutral-950">
                  {" "}
                  maksymalnie 12 zdjęć{" "}
                </span>
                , dla lepszej jakości nie przesyłaj{" "}
                <span className="font-bold text-neutral-950">
                  {" "}
                  folderów ZIP.
                </span>
              </p>
              <p className="mt-4 font-medium">Domyślnie:</p>
              <ul className="ml-4 list-inside list-disc">
                <li>
                  {" "}
                  <span className="font-bold text-neutral-950">
                    {" "}
                    Zagłębione narożniki części{" "}
                  </span>
                  są wykonywane{" "}
                  <span className="font-bold text-red-600">
                    jako zaokrąglone narożniki (fazowania)
                  </span>
                  .
                </li>
                <li>
                  <span className="font-bold text-neutral-950">
                    Ostre krawędzie i zadziorności
                  </span>{" "}
                  zostaną{" "}
                  <span className="font-bold text-red-600"> usunięte</span>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <UploadFileList
        uploadedFiles={formCurrentState.uploadedFiles}
        setUploadedFiles={setUploadedFiles}
      />
    </div>
  );
};

export default UploadSection;
