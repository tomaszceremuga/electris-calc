"use client";

import type React from "react";
import { useState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";

import { type UploadedFile } from "~/lib/UploadedFileType";

interface UploadAreaProps {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  count: number;
}

const UploadArea = ({ setUploadedFiles, count }: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          (file) => file.size > 209715200,
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

        // Przesyłanie plików do Blob storage
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

        // Aktualizacja stanu tylko jeśli mamy pomyślnie przesłane pliki
        if (newUploadedFiles.length > 0) {
          setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);

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

  return (
    <div
      className={`flex flex-col items-center justify-center border-4 border-dashed ${
        isDragging ? "border-primary bg-primary/10" : "bg-neutral-100"
      } sm:full h-72 p-4 transition-colors duration-200 md:w-72`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {isUploading ? (
        <>
          <Loader2 size={80} className="mb-4 animate-spin" />
          <p className="text-center text-sm text-muted-foreground">
            Przesyłanie plików...
          </p>
        </>
      ) : (
        <>
          <button className="mb-4" onClick={openFileSelector} type="button">
            <Download size={80} strokeWidth={2.25} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            className="hidden"
            multiple
          />

          <Button onClick={openFileSelector} disabled={isUploading}>
            Wybierz plik
          </Button>

          {isDragging && (
            <p className="mt-4 text-center text-sm text-primary">
              Upuść plik tutaj
            </p>
          )}

          {!isDragging && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Przeciągnij i upuść plik lub kliknij przycisk
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default UploadArea;
