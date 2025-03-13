
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import CVUploadCard from "@/components/index/CVUploadCard";
import JobDescriptionCard from "@/components/index/JobDescriptionCard";
import TailorActionButton from "@/components/index/TailorActionButton";
import { useCvTailor } from "@/hooks/use-cv-tailor";

const Index = () => {
  const { user } = useAuth();
  const {
    cvFile,
    jobDescription,
    isProcessing,
    isCvUploading,
    isJobUploading,
    isUploading,
    remainingTime,
    isFormComplete,
    handleCvUpload,
    handleJobFileUpload,
    handleJobTextChange,
    handleRemoveCv,
    handleRemoveJobFile,
    handleClearJobText,
    handleTailorCv,
    handleCancelProcessing
  } = useCvTailor(user);

  return (
    <div className="min-h-screen bg-[#F8F6FE] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3F2A51] mb-2">Your personal CV tailor</h1>
          <p className="text-lg text-[#AF93C8]">Let's optimize your CV for specific job descriptions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <CVUploadCard 
            onFileUpload={handleCvUpload}
            onRemoveFile={handleRemoveCv}
            file={cvFile.file}
            isProcessing={isProcessing}
            isUploading={isCvUploading}
            isExistingFile={Boolean(cvFile.isExistingFile)}
          />

          <JobDescriptionCard 
            onFileUpload={handleJobFileUpload}
            onRemoveFile={handleRemoveJobFile}
            onTextChange={handleJobTextChange}
            onClearText={handleClearJobText}
            file={jobDescription.file}
            content={jobDescription.content || ""}
            isProcessing={isProcessing}
            isUploading={isJobUploading}
          />
        </div>

        <TailorActionButton 
          isProcessing={isProcessing}
          isUploading={isUploading}
          isFormComplete={isFormComplete}
          remainingTime={remainingTime}
          onTailorCv={handleTailorCv}
          onCancelProcessing={handleCancelProcessing}
          user={user}
        />
      </div>
    </div>
  );
};

export default Index;
