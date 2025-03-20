// // "use client";
// // import { FileText, Trash2, ExternalLink } from "lucide-react";
// // import { type UploadedFile } from "~/lib/UploadedFileType";

// // interface UploadElementProps {
// //   index: number;
// //   file: UploadedFile;
// //   onDelete: (index: number) => void;
// // }

// // const UploadElement = ({ index, file, onDelete }: UploadElementProps) => {
// //   const formatFileSize = (size: number): string => {
// //     return size >= 1_048_576
// //       ? `${(size / 1_048_576).toFixed(2)} MB`
// //       : `${(size / 1024).toFixed(2)} KB`;
// //   };

// //   return (
// //     <div className="flex items-center justify-between rounded-md border bg-neutral-50 p-2">
// //       <div className="flex items-center gap-2">
// //         <div>
// //           <FileText />
// //         </div>
// //         <div>
// //           <p className="text-sm">{file.name}</p>
// //           <p className="text-xs text-neutral-400">
// //             {formatFileSize(file.size)}
// //           </p>
// //         </div>
// //       </div>
// //       <div className="flex items-center gap-2">
// //         <a
// //           href={file.url}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="hover:text-primary"
// //           title="Otwórz plik"
// //         >
// //           <ExternalLink size={18} />
// //         </a>
// //         <button className="hover:text-red-600" onClick={() => onDelete(index)}>
// //           <Trash2 />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default UploadElement;

// "use client";
// import { FileText, Trash2, ExternalLink } from "lucide-react";
// import { type UploadedFile } from "~/lib/UploadedFileType";

// interface UploadElementProps {
//   index: number;
//   file: UploadedFile;
//   onDelete: (index: number) => void;
// }

// const UploadElement = ({ index, file, onDelete }: UploadElementProps) => {
//   const formatFileSize = (size: number): string => {
//     return size >= 1_048_576
//       ? `${(size / 1_048_576).toFixed(2)} MB`
//       : `${(size / 1024).toFixed(2)} KB`;
//   };

//   return (
//     <div className="mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors">
//       <div className="flex w-full items-center justify-between rounded-md border bg-neutral-50 p-2">
//         <div className="flex items-center gap-2">
//           <div>
//             <FileText />
//           </div>
//           <div>
//             <p className="text-sm">{file.name}</p>
//             <p className="text-xs text-neutral-400">
//               {formatFileSize(file.size)}
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <a
//             href={file.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-primary"
//             title="Otwórz plik"
//           >
//             <ExternalLink size={18} />
//           </a>
//           <button
//             className="hover:text-red-600"
//             onClick={() => onDelete(index)}
//           >
//             <Trash2 />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadElement;
"use client";
import { FileText, Trash2, ExternalLink } from "lucide-react";
import { type UploadedFile } from "~/lib/UploadedFileType";

interface UploadElementProps {
  index: number;
  file: UploadedFile;
  onDelete: (index: number) => void;
}

const UploadElement = ({ index, file, onDelete }: UploadElementProps) => {
  const formatFileSize = (size: number): string => {
    return size >= 1_048_576
      ? `${(size / 1_048_576).toFixed(2)} MB`
      : `${(size / 1024).toFixed(2)} KB`;
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition-colors">
      <div className="flex flex-col items-center gap-2 text-center">
        <FileText className="h-10 w-10 text-muted-foreground" />
        <p className="text-sm font-medium">{file.name}</p>
        <p className="text-xs text-neutral-400">{formatFileSize(file.size)}</p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <a
          href={file.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
          title="Otwórz plik"
        >
          <ExternalLink size={18} />
        </a>
        <button className="hover:text-red-600" onClick={() => onDelete(index)}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

export default UploadElement;
