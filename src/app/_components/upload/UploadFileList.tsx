import type * as React from "react";
import { type UploadedFile } from "~/lib/UploadedFileType";
import { useFormContext } from "~/lib/FormContext";
import { FileText, X } from "lucide-react";
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

  return (
    <div>
      {uploadedFiles.length > 0 && (
        <div className="mt-4 max-h-[200px] overflow-y-auto">
          <p className="mb-2 text-sm font-medium">Wybrane pliki:</p>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-md border p-2"
              >
                <FileText className="h-5 w-5 text-primary" />
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteButton(index)}
                  className="h-7 w-7"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Usuń plik</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadFileList;
