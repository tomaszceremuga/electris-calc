"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Upload, X, FileText, File } from "lucide-react";

import InfoButton from "./InfoButton";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
// import { type formElementsInterface } from "~/lib/formElementsInterface";

import { type UploadedFile } from "../upload/UploadArea";

interface UploadElementProps {
  id: number;
  onChange: (id: number, value: unknown) => void;
  filled: UploadedFile[] | [];
  name?: string;
  info?: string;
  options?: string[];
  isImportant?: boolean;
  description?: string;
}

const UploadElement: React.FC<UploadElementProps> = ({
  id,
  onChange,
  name,
  description = "",
  info = "",
  isImportant = false,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const prevOption = useRef<File[] | null>(files);

  useEffect(() => {
    const fileNames = files.map((file) => file.name).join(";");

    if (prevOption.current !== files) {
      onChange(id, fileNames);
      prevOption.current = files;
    }
  }, [files, id, onChange]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      toast("Plik został dodany", {
        description: getDate(),
      });
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      toast("Plik został dodany", {
        description: getDate(),
      });
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    toast("Plik został usunięty", {
      description: getDate(),
    });
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-5 p-2">
      <div className="flex items-center">
        <p className="whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
        </p>
        {info && <InfoButton info={info} />}
      </div>
      {description && (
        <p className="pb-1 text-neutral-500 xl:ml-5">{description}</p>
      )}
      <div className="mt-2 xl:ml-5">
        <div className="flex flex-wrap items-center gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Prześlij plik</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Przesyłanie pliku</AlertDialogTitle>
                <AlertDialogDescription>
                  Wybierz plik, który chcesz przesłać. Możesz przeciągnąć i
                  upuścić plik lub kliknąć, aby wybrać z dysku.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div
                className={`mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  multiple
                />

                <div className="flex flex-col items-center gap-2 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    Przeciągnij i upuść pliki tutaj lub
                  </p>
                  <Button
                    variant="secondary"
                    onClick={handleUploadClick}
                    type="button"
                  >
                    Wybierz pliki
                  </Button>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-4 max-h-[200px] overflow-y-auto">
                  <p className="mb-2 text-sm font-medium">Wybrane pliki:</p>
                  <div className="space-y-2">
                    {files.map((file, index) => (
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
                          onClick={() => handleRemoveFile(index)}
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

              <AlertDialogFooter className="mt-4">
                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                <AlertDialogAction
                  disabled={files.length === 0}
                  onClick={() => {
                    // tutaj przesyłanie na backend
                  }}
                >
                  Zatwierdź
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {files.length === 0 ? (
            <span className="text-sm text-muted-foreground">
              Nie przesłano żadnych plików
            </span>
          ) : (
            <div className="flex flex-wrap gap-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-md border bg-muted/30 px-2 py-1 text-sm"
                >
                  <File className="h-3.5 w-3.5" />
                  <span className="max-w-[150px] truncate">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFile(index)}
                    className="ml-1 h-5 w-5"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Usuń plik</span>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadElement;
