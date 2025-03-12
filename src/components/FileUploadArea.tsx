
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { File, X } from "lucide-react";

interface FileUploadAreaProps {
  onFileUpload: (file: File) => void;
  onRemoveFile: () => void;
  file: File | null;
  acceptedTypes: string;
  uploadText: string;
  acceptedTypesText: string;
  icon: React.ReactNode;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFileUpload,
  onRemoveFile,
  file,
  acceptedTypes,
  uploadText,
  acceptedTypesText,
  icon,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        const fileExtension = `.${file.name.split(".").pop()}`.toLowerCase();
        
        if (acceptedTypes.includes(fileExtension)) {
          onFileUpload(file);
        } else {
          console.error("Invalid file type");
          // In a real app, you'd show an error toast here
        }
      }
    },
    [acceptedTypes, onFileUpload]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFileUpload(e.target.files[0]);
      }
    },
    [onFileUpload]
  );

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="w-full">
      {!file ? (
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center h-[200px] border-2 border-dashed rounded-md cursor-pointer transition-colors",
            isDragging
              ? "border-[#9b87f5] bg-[#f0ebfc]"
              : "border-[#e2dcf8] hover:border-[#9b87f5] hover:bg-[#f8f6fe]"
          )}
        >
          <input
            type="file"
            accept={acceptedTypes}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex flex-col items-center">
            {icon}
            <p className="mt-2 text-[#3a2963] font-medium">{uploadText}</p>
            <p className="mt-1 text-sm text-[#6e59a5]">{acceptedTypesText}</p>
          </div>
        </label>
      ) : (
        <div className="flex flex-col bg-[#f0ebfc] rounded-md p-4 h-[200px]">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <File className="h-8 w-8 text-[#9b87f5] mr-3" />
              <div>
                <p className="font-medium text-[#3a2963] truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-sm text-[#6e59a5]">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <button
              onClick={onRemoveFile}
              className="p-1.5 bg-white rounded-full hover:bg-[#e2dcf8] transition-colors"
              aria-label="Remove file"
            >
              <X className="h-5 w-5 text-[#6e59a5]" />
            </button>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <p className="text-[#6e59a5] text-sm">File ready for processing</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
