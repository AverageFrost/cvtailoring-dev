import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import FileUploadArea from "@/components/FileUploadArea";
import { cn } from "@/lib/utils";

interface JobDescriptionCardProps {
  onFileUpload: (file: File) => void;
  onRemoveFile: () => void;
  onTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClearText: () => void;
  file: File | null | undefined;
  content: string;
  isProcessing: boolean;
  isUploading: boolean;
}

const JobDescriptionCard: React.FC<JobDescriptionCardProps> = ({
  onFileUpload,
  onRemoveFile,
  onTextChange,
  onClearText,
  file,
  content,
  isProcessing,
  isUploading,
}) => {
  const hasJobText = !!content && content.trim() !== "";

  return (
    <Card className="border-[#E2DCF8] shadow-sm">
      <CardHeader>
        <CardTitle className="text-[#3F2A51]">Upload Job Description</CardTitle>
      </CardHeader>
      <CardContent>
        {file ? (
          <FileUploadArea 
            onFileUpload={onFileUpload}
            onRemoveFile={onRemoveFile}
            file={file}
            acceptedTypes=".docx,.txt"
            uploadText="Drag and drop a job description file"
            acceptedTypesText="Accepted file types: DOCX, TXT"
            icon={<Upload className="h-12 w-12 text-[#AF93C8]" />}
            height="h-[350px]"
            isProcessing={isProcessing}
            isUploading={isUploading}
          />
        ) : hasJobText ? (
          <div className="flex flex-col h-[350px]">
            <div className="p-4 bg-[#F8F6FE] rounded-md flex justify-between items-center mb-2">
              <span className="text-[#3F2A51] font-medium">Pasted Text</span>
              <Button
                onClick={onClearText}
                variant="ghost"
                size="sm"
                className="text-[#AF93C8] hover:text-[#3F2A51] hover:bg-[#E2DCF8] p-1 h-auto"
                aria-label="Clear text"
                disabled={isProcessing}
              >
                <X className="h-4 w-4 mr-1" /> Clear
              </Button>
            </div>
            <div className="h-[316px] flex flex-col border-2 border-[#AF93C8] rounded-md overflow-hidden">
              <Textarea 
                placeholder="Paste job description here..."
                className="w-full flex-grow border-0 focus-visible:ring-0 resize-none overflow-auto"
                value={content || ""}
                onChange={onTextChange}
                disabled={isProcessing}
              />
            </div>
          </div>
        ) : (
          <>
            <FileUploadArea 
              onFileUpload={onFileUpload}
              onRemoveFile={onRemoveFile}
              file={file}
              acceptedTypes=".docx,.txt"
              uploadText="Drag and drop a job description file"
              acceptedTypesText="Accepted file types: DOCX, TXT"
              icon={<Upload className="h-12 w-12 text-[#AF93C8]" />}
              height="h-[150px]"
              isProcessing={isProcessing}
              isUploading={isUploading}
            />
            
            <div className="mt-4">
              <p className="text-[#AF93C8] mb-2">Or paste text directly:</p>
              <div className="relative">
                <Textarea 
                  placeholder="Paste job description here..."
                  className={cn(
                    "min-h-[150px] border-2 focus-visible:ring-0 focus-visible:border-[#AF93C8]",
                    hasJobText ? "border-[#AF93C8]" : "border-[#E2DCF8]"
                  )}
                  value={content || ""}
                  onChange={onTextChange}
                  disabled={isProcessing}
                />
                {content && (
                  <button
                    onClick={onClearText}
                    className="absolute right-2 top-2 p-1 rounded-full bg-[#F8F6FE] hover:bg-[#E2DCF8] transition-colors"
                    aria-label="Clear text"
                    disabled={isProcessing}
                  >
                    <X className="h-4 w-4 text-[#AF93C8]" />
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default JobDescriptionCard;
