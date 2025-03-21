"use client";

import type { UploadedFile } from "~/lib/UploadedFileType";
import { useFormContext } from "~/lib/FormContext";
import {
  FileText,
  Trash2,
  FileIcon,
  FileArchive,
  FileIcon as FilePdf,
} from "lucide-react";
import { Button } from "~/components/ui/button";

interface UploadFileProps {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: (uploadedFiles: UploadedFile[]) => void;
}

const UploadFileList = ({
  uploadedFiles,
  setUploadedFiles,
}: UploadFileProps) => {
  const { formCurrentState } = useFormContext();

  const handleDeleteButton = (i: number) => {
    setUploadedFiles(
      formCurrentState.uploadedFiles.filter((_, index) => index !== i),
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    if (["pdf"].includes(extension ?? "")) {
      return <FilePdf className="h-5 w-5 text-red-500" />;
    } else if (
      ["step", "stp", "x_t", "iges", "igs", "sldprt"].includes(extension ?? "")
    ) {
      return <FileArchive className="h-5 w-5 text-primary" />;
    } else if (["dwg", "dxf"].includes(extension ?? "")) {
      return <FileIcon className="h-5 w-5 text-blue-500" />;
    } else {
      return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="h-full w-full md:w-1/2">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-medium">Wybrane pliki</h2>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
          {uploadedFiles.length}/12
        </span>
      </div>

      {uploadedFiles.length > 0 ? (
        <div
          className={`h-[276px] w-full rounded-lg bg-background ${uploadedFiles.length > 3 && "overflow-y-scroll"} `}
        >
          <div className="space-y-2 p-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="group relative flex items-center gap-3 rounded-md border border-muted bg-white p-3 transition-all hover:border-muted-foreground/30 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md">
                  {getFileIcon(file.name)}
                </div>

                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteButton(index)}
                  className="h-8 w-8 rounded-full text-muted-foreground transition-colors hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Usuń plik</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-[276px] w-full flex-col items-center justify-center rounded-md border border-muted p-8">
          <div className="mb-4 rounded-full">
            <FileText className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-center text-muted-foreground">
            Nie przesłano żadnych plików
          </p>
          <p className="mt-1 text-center text-xs text-muted-foreground">
            Pliki pojawią się tutaj po przesłaniu
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadFileList;
