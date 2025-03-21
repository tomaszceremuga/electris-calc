"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, FileUp } from "lucide-react";
import type { UploadedFile } from "~/lib/UploadedFileType";
import { useFormContext } from "~/lib/FormContext";
import { cn } from "@/lib/utils";

interface UploadAreaProps {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: (uploadedFiles: UploadedFile[]) => void;
  count: number;
}

const UploadArea = ({ setUploadedFiles, count }: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { formCurrentState } = useFormContext();

  const getDate = (): string => {
    const actualDate = new Date();
    const formatDate = actualDate.toLocaleDateString("pl-PL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return formatDate
      .replace(/^(\w)/, (match) => match.toUpperCase())
      .replace(/ (\d+) /, ", $1 ")
      .replace(/ (\d{4}) /, ", $1, ");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      void handleFiles(files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      void handleFiles(files);
    }
  };

  const uploadFileToBlobStorage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          body: file,
        },
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const blob = (await response.json()) as { url: string };
      return blob.url;
    } catch (error) {
      console.error("Error uploading to Blob storage:", error);
      throw error;
    }
  };

  const handleFiles = async (files: FileList) => {
    try {
      if (files.length > 0) {
        const hasLargeFile = Array.from(files).some(
          (file) => file.size > 26214400,
        );
        if (hasLargeFile) {
          toast("Zbyt duży plik. Możesz przesłać do 200MB");
          return;
        }

        const rightExtensions = [
          "step",
          "stp",
          "x_t",
          "iges",
          "igs",
          "sldprt",
          "dwg",
          "dxf",
          "pdf",
        ];
        const hasGreatExtension = Array.from(files).every((file) => {
          return rightExtensions.includes(
            file.name.split(".").pop()?.toLowerCase() ?? "",
          );
        });

        if (!hasGreatExtension) {
          toast("Możesz przesyłać pliki tylko z odpowiednim rozszerzeniem");
          return;
        }

        if (count + files.length > 12) {
          toast("Nie możesz dodać więcej niż 12 plików");
          return;
        }

        setIsUploading(true);

        const newUploadedFiles: UploadedFile[] = [];

        for (const file of Array.from(files)) {
          try {
            const url = await uploadFileToBlobStorage(file);
            newUploadedFiles.push({
              name: file.name,
              url: url,
              size: file.size,
            });
          } catch (uploadError) {
            console.error("Error uploading file:", uploadError);
            toast.error(`Błąd podczas przesyłania pliku ${file.name}`);
          }
        }

        if (newUploadedFiles.length > 0) {
          setUploadedFiles([
            ...formCurrentState.uploadedFiles,
            ...newUploadedFiles,
          ]);

          toast.success(
            newUploadedFiles.length > 1
              ? `Przesłano ${newUploadedFiles.length} plików`
              : "Plik został przesłany",
            { description: getDate() },
          );
        }
      } else {
        throw new Error("No files selected");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error handling files:", errorMessage);
      toast.error("Wystąpił błąd przy wczytywaniu pliku");
    } finally {
      setIsUploading(false);
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const acceptedExtensions =
    ".step,.stp,.x_t,.iges,.igs,.sldprt,.dwg,.dxf,.pdf";

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-all duration-200 ease-in-out",
        "h-80 sm:w-full md:w-full",
        isDragging
          ? "scale-[1.02] border-primary/70 bg-primary/5"
          : "border-muted-foreground/25 bg-background hover:border-primary/40 hover:bg-muted/10",
      )}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isUploading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="animate-progress-circular h-16 w-16"
                viewBox="0 0 100 100"
              >
                <circle
                  className="text-primary/20"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary"
                  strokeWidth="8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="42"
                  cx="50"
                  cy="50"
                  strokeDasharray="264, 264"
                  strokeDashoffset="264"
                />
              </svg>
            </div>
            <FileUp size={40} className="mx-auto text-primary/70" />
          </div>
          <div className="text-center">
            <p className="font-medium text-primary">Przesyłanie plików</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Proszę czekać...
            </p>
          </div>
        </div>
      ) : (
        <>
          <div
            className={cn(
              "mb-5 flex h-10 w-20 items-center justify-center rounded-full transition-all duration-300",
              isDragging ? "scale-110 bg-primary/20" : "bg-white",
            )}
          >
            <Upload
              size={40}
              className={cn(
                "transition-colors duration-300",
                isDragging ? "text-primary" : "text-muted-foreground",
              )}
            />
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            multiple
            accept={acceptedExtensions}
          />

          <h3
            className={cn(
              "mb-2 text-lg font-medium transition-colors duration-200",
              isDragging ? "text-primary" : "text-foreground",
            )}
          >
            {isDragging ? "Upuść pliki tutaj" : "Prześlij pliki"}
          </h3>

          <p className="mb-4 text-center text-sm text-muted-foreground">
            Przeciągnij i upuść lub
          </p>

          <Button
            onClick={openFileSelector}
            disabled={isUploading}
            size={"lg"}
            className="relative overflow-hidden"
            variant={isDragging ? "outline" : "default"}
          >
            <span className="relative z-10">Wybierz plik</span>
          </Button>

          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p>Obsługiwane formaty STEP, STP, DWG, DXF, PDF</p>
            <p className="mt-1">Maksymalny rozmiar: 25MB</p>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes progress-circular {
          0% {
            stroke-dashoffset: 264;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-progress-circular {
          animation: progress-circular 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default UploadArea;
