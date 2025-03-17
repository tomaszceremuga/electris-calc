

"use client"
import { FileText, Trash2, ExternalLink } from "lucide-react"
import type { UploadedFile } from "./UploadArea"

interface UploadElementProps {
  index: number
  file: UploadedFile
  onDelete: (index: number) => void
}

const UploadElement = ({ index, file, onDelete }: UploadElementProps) => {
  const formatFileSize = (size: number): string => {
    return size >= 1_048_576 ? `${(size / 1_048_576).toFixed(2)} MB` : `${(size / 1024).toFixed(2)} KB`
  }

  return (
    <div className="flex items-center justify-between p-2 border rounded-md bg-neutral-50">
      <div className="flex items-center gap-2">
        <div>
          <FileText />
        </div>
        <div>
          <p className="text-sm">{file.name}</p>
          <p className="text-xs text-neutral-400">{formatFileSize(file.size)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <a href={file.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary" title="Otwórz plik">
          <ExternalLink size={18} />
        </a>
        <button className="hover:text-red-600" onClick={() => onDelete(index)}>
          <Trash2 />
        </button>
      </div>
    </div>
  )
}

export default UploadElement