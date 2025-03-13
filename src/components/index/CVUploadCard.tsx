
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader } from "lucide-react";
import FileUploadArea from "@/components/FileUploadArea";

interface CVUploadCardProps {
  onFileUpload: (file: File) => void;
  onRemoveFile: () => void;
  file: File | null;
  isProcessing: boolean;
  isUploading: boolean;
  isExistingFile?: boolean;
}

const CVUploadCard: React.FC<CVUploadCardProps> = ({
  onFileUpload,
  onRemoveFile,
  file,
  isProcessing,
  isUploading,
  isExistingFile,
}) => {
  return (
    <Card className="border-[#E2DCF8] shadow-sm">
      <CardHeader>
        <CardTitle className="text-[#3F2A51]">Upload Your CV</CardTitle>
      </CardHeader>
      <CardContent>
        <FileUploadArea 
          onFileUpload={onFileUpload}
          onRemoveFile={onRemoveFile}
          file={file}
          acceptedTypes=".docx,.txt"
          uploadText="Drag and drop your CV file"
          acceptedTypesText="Accepted file types: DOCX, TXT"
          icon={<Upload className="h-12 w-12 text-[#AF93C8]" />}
          height="h-[350px]"
          isProcessing={isProcessing}
          isUploading={isUploading}
          isExistingFile={isExistingFile}
        />
      </CardContent>
    </Card>
  );
};

export default CVUploadCard;
