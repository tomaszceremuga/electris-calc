
"use client"
import type React from "react"
import { useState, useRef } from "react"
import { Button } from "~/components/ui/button" // Updated import path to match your project structure
import { toast } from "sonner"

interface UploadAreaProps {
  setFileList: React.Dispatch<React.SetStateAction<string[]>>;
  setFileSize:React.Dispatch<React.SetStateAction<number[]>>
  // Change to handle an array of strings
}

const UploadArea = ({setFileList,setFileSize}:UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getDate = (): string => {
    const actualDate = new Date()
    const formatDate = actualDate.toLocaleDateString("pl-PL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    return formatDate
      .replace(/^(\w)/, (match) => match.toUpperCase())
      .replace(/ (\d+) /, ", $1 ")
      .replace(/ (\d{4}) /, ", $1, ")
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    let size: number
    if (files && files.length > 0) {
      size=files[0]?.size ?? 0
      handleFiles(files,size)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    let size: number
    if (files && files.length > 0) {
      size=files[0]?.size ?? 0
      console.log(size)
      handleFiles(files,size)
    }
  }

  const handleFiles = (files: FileList,size: number) => {
    try {
      if ( files.length > 0) {
        const fileNames = Array.from(files).map(file => file.name)
        setFileList((prev: string[]) => [...prev, ...fileNames])
        setFileSize((prev:number[])=>[...prev,size])
        toast("Plik został wczytany", {
          description: getDate(),
        })
      } else {
        throw new Error("No files selected")
      }
    } catch (error) {
      console.error("Error setting file list:", error)
      toast.error("Wystąpił błąd przy wczytywaniu pliku")
    }

  }

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center border-4 border-dashed ${
        isDragging ? "border-primary bg-primary/10" : "bg-neutral-100"
      } w-72 h-72 p-4 transition-colors duration-200`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <button className="mb-4" onClick={openFileSelector}>
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z"
          />
        </svg>
      </button>

      <input type="file" ref={fileInputRef} onChange={handleFileInputChange} className="hidden" />

      <Button onClick={openFileSelector}>Wybierz plik</Button>

      {isDragging && <p className="mt-4 text-sm text-center text-primary">Upuść plik tutaj</p>}

      {!isDragging && (
        <p className="mt-4 text-sm text-center text-muted-foreground">Przeciągnij i upuść plik lub kliknij przycisk</p>
      )}
    </div>
  )
}

export default UploadArea

