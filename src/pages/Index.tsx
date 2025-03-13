import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Upload, X, Loader } from "lucide-react";
import FileUploadArea from "@/components/FileUploadArea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface FileData {
  file: File | null;
  content?: string;
  filePath?: string;
}

const Index = () => {
  const [cvFile, setCvFile] = useState<FileData>({ file: null });
  const [jobDescription, setJobDescription] = useState<FileData>({ file: null, content: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(29);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleCvUpload = async (file: File) => {
    const fileExtension = `.${file.name.split(".").pop()}`.toLowerCase();
    if (![".docx", ".txt"].includes(fileExtension)) {
      toast({
        title: "Invalid file format",
        description: "Please upload a DOCX or TXT file for your CV",
        variant: "destructive",
      });
      return;
    }
    
    if (user) {
      setIsUploading(true);
      try {
        // Upload the file to Supabase storage
        const filePath = `${user.id}/cv/${Date.now()}_${file.name}`;
        const { error } = await supabase.storage
          .from('user_files')
          .upload(filePath, file);
          
        if (error) {
          throw error;
        }
        
        setCvFile({ file, filePath });
      } catch (error: any) {
        toast({
          title: "Upload failed",
          description: error.message || "Failed to upload your CV",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    } else {
      // If not authenticated, just set the file locally
      setCvFile({ file });
    }
  };

  const handleJobFileUpload = async (file: File) => {
    const fileExtension = `.${file.name.split(".").pop()}`.toLowerCase();
    if (![".docx", ".txt"].includes(fileExtension)) {
      toast({
        title: "Invalid file format",
        description: "Please upload a DOCX or TXT file for the job description",
        variant: "destructive",
      });
      return;
    }
    
    if (user) {
      setIsUploading(true);
      try {
        // Upload the file to Supabase storage
        const filePath = `${user.id}/job/${Date.now()}_${file.name}`;
        const { error } = await supabase.storage
          .from('user_files')
          .upload(filePath, file);
          
        if (error) {
          throw error;
        }
        
        setJobDescription({ file, filePath, content: "" });
      } catch (error: any) {
        toast({
          title: "Upload failed",
          description: error.message || "Failed to upload your job description",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    } else {
      // If not authenticated, just set the file locally
      setJobDescription({ file, content: "" });
    }
  };

  const handleJobTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription({ file: null, content: e.target.value });
  };

  const handleRemoveCv = async () => {
    if (!isProcessing && !isUploading) {
      // If the file was uploaded to Supabase, remove it from storage
      if (user && cvFile.filePath) {
        try {
          const { error } = await supabase.storage
            .from('user_files')
            .remove([cvFile.filePath]);
            
          if (error) {
            throw error;
          }
        } catch (error: any) {
          console.error("Error removing file:", error.message);
        }
      }
      
      setCvFile({ file: null });
    }
  };

  const handleRemoveJobFile = async () => {
    if (!isProcessing && !isUploading) {
      // If the file was uploaded to Supabase, remove it from storage
      if (user && jobDescription.filePath) {
        try {
          const { error } = await supabase.storage
            .from('user_files')
            .remove([jobDescription.filePath]);
            
          if (error) {
            throw error;
          }
        } catch (error: any) {
          console.error("Error removing file:", error.message);
        }
      }
      
      setJobDescription({ file: null, content: "" });
    }
  };

  const handleClearJobText = () => {
    if (!isProcessing && !isUploading) {
      setJobDescription({ file: null, content: "" });
    }
  };

  const handleTailorCv = () => {
    const hasCv = cvFile.file !== null;
    const hasJobDescription = jobDescription.file !== null || (jobDescription.content && jobDescription.content.trim() !== "");
    
    if (!hasCv) {
      toast({
        title: "CV required",
        description: "Please upload your CV to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (!hasJobDescription) {
      toast({
        title: "Job description required",
        description: "Please provide a job description to continue",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsProcessing(false);
          navigate("/results");
          return 29;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const handleCancelProcessing = () => {
    setIsProcessing(false);
    setRemainingTime(29);
    
    toast({
      title: "Processing cancelled",
      description: "Your CV tailoring has been cancelled",
    });
  };

  const isFormComplete = cvFile.file && (jobDescription.file || (jobDescription.content && jobDescription.content.trim() !== ""));
  const hasJobText = !!jobDescription.content && jobDescription.content.trim() !== "";

  return (
    <div className="min-h-screen bg-[#F8F6FE] flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3F2A51] mb-2">Your personal CV tailor</h1>
          <p className="text-lg text-[#AF93C8]">Let's optimize your CV for specific job descriptions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="border-[#E2DCF8] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3F2A51]">Upload Your CV</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploadArea 
                onFileUpload={handleCvUpload}
                onRemoveFile={handleRemoveCv}
                file={cvFile.file}
                acceptedTypes=".docx,.txt"
                uploadText="Drag and drop your CV file"
                acceptedTypesText="Accepted file types: DOCX, TXT"
                icon={<Upload className="h-12 w-12 text-[#AF93C8]" />}
                height="h-[350px]"
                isProcessing={isProcessing || isUploading}
              />
            </CardContent>
          </Card>

          <Card className="border-[#E2DCF8] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3F2A51]">Upload Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              {jobDescription.file ? (
                <FileUploadArea 
                  onFileUpload={handleJobFileUpload}
                  onRemoveFile={handleRemoveJobFile}
                  file={jobDescription.file}
                  acceptedTypes=".docx,.txt"
                  uploadText="Drag and drop a job description file"
                  acceptedTypesText="Accepted file types: DOCX, TXT"
                  icon={<Upload className="h-12 w-12 text-[#AF93C8]" />}
                  height="h-[350px]"
                  isProcessing={isProcessing || isUploading}
                />
              ) : hasJobText ? (
                <div className="flex flex-col h-[350px]">
                  <div className="p-4 bg-[#F8F6FE] rounded-md flex justify-between items-center mb-2">
                    <span className="text-[#3F2A51] font-medium">Pasted Text</span>
                    <Button
                      onClick={handleClearJobText}
                      variant="ghost"
                      size="sm"
                      className="text-[#AF93C8] hover:text-[#3F2A51] hover:bg-[#E2DCF8] p-1 h-auto"
                      aria-label="Clear text"
                      disabled={isProcessing || isUploading}
                    >
                      <X className="h-4 w-4 mr-1" /> Clear
                    </Button>
                  </div>
                  <div className="h-[316px] flex flex-col border-2 border-[#AF93C8] rounded-md overflow-hidden">
                    <Textarea 
                      placeholder="Paste job description here..."
                      className="w-full flex-grow border-0 focus-visible:ring-0 resize-none overflow-auto"
                      value={jobDescription.content || ""}
                      onChange={handleJobTextChange}
                      disabled={isProcessing || isUploading}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <FileUploadArea 
                    onFileUpload={handleJobFileUpload}
                    onRemoveFile={handleRemoveJobFile}
                    file={jobDescription.file}
                    acceptedTypes=".docx,.txt"
                    uploadText="Drag and drop a job description file"
                    acceptedTypesText="Accepted file types: DOCX, TXT"
                    icon={<Upload className="h-12 w-12 text-[#AF93C8]" />}
                    height="h-[150px]"
                    isProcessing={isUploading}
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
                        value={jobDescription.content || ""}
                        onChange={handleJobTextChange}
                        disabled={isProcessing}
                      />
                      {jobDescription.content && (
                        <button
                          onClick={handleClearJobText}
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
        </div>

        <div className="flex flex-col items-center">
          {isProcessing ? (
            <div className="flex flex-col items-center">
              <div className="bg-[#AF93C8] bg-opacity-30 text-[#3F2A51] px-8 py-4 rounded-full mb-4 flex items-center min-w-[240px] justify-center">
                <Loader className="h-6 w-6 text-[#3F2A51] animate-spin mr-3" />
                <span className="text-lg font-medium">Tailoring your CV...</span>
              </div>
              
              <p className="text-[#AF93C8] mb-4">
                Please wait while we tailor your CV to the job description... (~{remainingTime} seconds remaining)
              </p>
              
              <Button 
                onClick={handleCancelProcessing}
                variant="outline"
                className="border-[#E2DCF8] text-[#3F2A51] hover:bg-[#F8F6FE] transition-colors rounded-full px-6"
              >
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            </div>
          ) : (
            <>
              <Button 
                onClick={handleTailorCv}
                disabled={!isFormComplete || isUploading}
                className="bg-[#3F2A51] hover:bg-[#2A1C36] text-white transition-colors px-8 py-6 rounded-full text-lg min-w-[240px]"
              >
                {isUploading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    Tailor CV <ArrowRight className="ml-2" />
                  </>
                )}
              </Button>
              
              <p className="text-[#AF93C8] mt-4 text-center">
                {!user && isFormComplete ? 
                  "Sign in to save your CV and job descriptions" : 
                  "Please upload your CV and provide a job description to continue"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
