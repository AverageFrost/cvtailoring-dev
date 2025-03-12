
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
  height?: string;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFileUpload,
  onRemoveFile,
  file,
  acceptedTypes,
  uploadText,
  acceptedTypesText,
  icon,
  height = "h-[150px]",
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
            `flex flex-col items-center justify-center ${height} border-2 border-dashed rounded-md cursor-pointer transition-colors`,
            isDragging
              ? "border-[#AF93C8] bg-[#F8F6FE]"
              : "border-[#E2DCF8] hover:border-[#AF93C8] hover:bg-[#F8F6FE]"
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
            <p className="mt-2 text-[#3F2A51] font-medium">{uploadText}</p>
            <p className="mt-1 text-sm text-[#AF93C8]">{acceptedTypesText}</p>
          </div>
        </label>
      ) : (
        <div className={`flex flex-col bg-[#F8F6FE] rounded-md p-4 ${height}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <File className="h-8 w-8 text-[#AF93C8] mr-3" />
              <div>
                <p className="font-medium text-[#3F2A51] truncate max-w-[200px]">
                  {file.name}
                </p>
                <p className="text-sm text-[#AF93C8]">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <button
              onClick={onRemoveFile}
              className="p-1.5 bg-white rounded-full hover:bg-[#F8F6FE] transition-colors"
              aria-label="Remove file"
            >
              <X className="h-5 w-5 text-[#AF93C8]" />
            </button>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <p className="text-[#AF93C8] text-sm">File ready for processing</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
