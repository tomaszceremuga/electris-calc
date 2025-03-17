
"use client"
import type React from "react"
import { useState, useRef } from "react"
import { Button } from "~/components/ui/button" // Updated import path to match your project structure
import { toast } from "sonner"
import {Download} from "lucide-react"
import { put } from "@vercel/blob";


const BLOB_READ_WRITE_TOKEN="vercel_blob_rw_P6s5BqQMdLPWrMUU_0rQjZBNIHBJKXHW52VHCHpQs1NP2jA"

interface UploadAreaProps {
  setFileList: React.Dispatch<React.SetStateAction<string[]>>;
  setFileSize:React.Dispatch<React.SetStateAction<number[]>>
  count:number
  setCount:React.Dispatch<React.SetStateAction<number>>
  // Change to handle an array of strings
}

const UploadArea = ({setFileList,setFileSize,count,setCount}:UploadAreaProps) => {
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
    if (files && files.length > 0 ) {
      handleFiles(files)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0 ) {
      handleFiles(files)
    }
  }

  const handleFiles = (files: FileList) => {
    try {
      if ( files.length > 0) {
        

        const hasLargeFile = Array.from(files).some(file => file.size > 209715200)
        if (hasLargeFile) {
          toast("Zbyt duży plik. Możesz przesłać do 200MB")
          return
        }

        const rightExtensions=["step","stp","x_t","iges","igs","sldprt","dwg","dxf","pdf"]
        const hasGreatExtension=Array.from(files).every(file=>{
          return rightExtensions.includes(file.name.split('.').pop()?.toLowerCase()??"")
        })
        
        if(!hasGreatExtension){
          toast("Możesz przesyłać pliki tylko z odpowiednim rozszerzeniem")
          return
        }

        if(count+files.length>12){
          toast("Nie możesz dodać więcej niż 12 plików")
          return
        }
        setCount(prev=>prev+files.length)
        // console.log(files[0].name.split('.').pop())
        const fileNames = Array.from(files).map(file => file.name)
        const fileSizes = Array.from(files).map(file => file.size)
        setFileList((prev: string[]) => [...prev, ...fileNames])
        setFileSize((prev:number[])=>[...prev,...fileSizes])
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
      } md:w-72 sm:full h-72 p-4 transition-colors duration-200 `}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <button className="mb-4" onClick={openFileSelector}>
        <Download size={80} strokeWidth={2.25} />
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

