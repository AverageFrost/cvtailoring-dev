
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Upload, X } from "lucide-react";
import FileUploadArea from "@/components/FileUploadArea";

interface FileData {
  file: File | null;
  content?: string;
}

const Index = () => {
  const [cvFile, setCvFile] = useState<FileData>({ file: null });
  const [jobDescription, setJobDescription] = useState<FileData>({ file: null, content: "" });
  
  const handleCvUpload = (file: File) => {
    setCvFile({ file });
  };

  const handleJobFileUpload = (file: File) => {
    setJobDescription({ file, content: "" });
  };

  const handleJobTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription({ file: null, content: e.target.value });
  };

  const handleRemoveCv = () => {
    setCvFile({ file: null });
  };

  const handleRemoveJobFile = () => {
    if (jobDescription.file) {
      setJobDescription({ file: null, content: jobDescription.content });
    }
  };

  const handleClearJobText = () => {
    setJobDescription({ file: null, content: "" });
  };

  const handleTailorCv = () => {
    // This will be implemented later
    const hasCv = cvFile.file !== null;
    const hasJobDescription = jobDescription.file !== null || (jobDescription.content && jobDescription.content.trim() !== "");
    
    if (!hasCv || !hasJobDescription) {
      console.log("Please upload your CV and provide a job description to continue");
      return;
    }
    
    console.log("Processing CV with job description");
  };

  const isFormComplete = cvFile.file && (jobDescription.file || (jobDescription.content && jobDescription.content.trim() !== ""));

  return (
    <div className="min-h-screen bg-[#f8f6fe] flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3a2963] mb-2">Your personal CV tailor</h1>
          <p className="text-lg text-[#6e59a5]">Let's optimize your CV for specific job descriptions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* CV Upload Section */}
          <Card className="border-[#e2dcf8] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3a2963]">Upload Your CV</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploadArea 
                onFileUpload={handleCvUpload}
                onRemoveFile={handleRemoveCv}
                file={cvFile.file}
                acceptedTypes=".docx,.txt"
                uploadText="Drag and drop your CV file"
                acceptedTypesText="Accepted file types: DOCX, TXT"
                icon={<Upload className="h-12 w-12 text-[#9b87f5]" />}
              />
            </CardContent>
          </Card>

          {/* Job Description Section */}
          <Card className="border-[#e2dcf8] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3a2963]">Upload Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploadArea 
                onFileUpload={handleJobFileUpload}
                onRemoveFile={handleRemoveJobFile}
                file={jobDescription.file}
                acceptedTypes=".docx,.txt"
                uploadText="Drag and drop a job description file"
                acceptedTypesText="Accepted file types: DOCX, TXT"
                icon={<Upload className="h-12 w-12 text-[#9b87f5]" />}
              />
              
              <div className="mt-4">
                <p className="text-[#6e59a5] mb-2">Or paste text directly:</p>
                <div className="relative">
                  <Textarea 
                    placeholder="Paste job description here..."
                    className="min-h-[150px] border-[#e2dcf8] focus-visible:ring-[#9b87f5]"
                    value={jobDescription.content}
                    onChange={handleJobTextChange}
                  />
                  {jobDescription.content && (
                    <button
                      onClick={handleClearJobText}
                      className="absolute right-2 top-2 p-1 rounded-full bg-[#f0ebfc] hover:bg-[#e2dcf8] transition-colors"
                      aria-label="Clear text"
                    >
                      <X className="h-4 w-4 text-[#6e59a5]" />
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center">
          <Button 
            onClick={handleTailorCv}
            disabled={!isFormComplete}
            className="bg-[#9b87f5] hover:bg-[#7e69ab] transition-colors px-8 py-6 rounded-md"
          >
            Tailor CV <ArrowRight className="ml-2" />
          </Button>
          
          {!isFormComplete && (
            <p className="text-[#6e59a5] mt-4 text-center">
              Please upload your CV and provide a job description to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
