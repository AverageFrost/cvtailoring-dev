import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export interface FileData {
  file: File | null;
  content?: string;
  filePath?: string;
  isExistingFile?: boolean;
}

export const useCvTailor = (user: User | null) => {
  const [cvFile, setCvFile] = useState<FileData>({ file: null });
  const [jobDescription, setJobDescription] = useState<FileData>({ file: null, content: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCvUploading, setIsCvUploading] = useState(false);
  const [isJobUploading, setIsJobUploading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(29);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const isUploading = isCvUploading || isJobUploading;
  const isFormComplete = cvFile.file && (jobDescription.file || (jobDescription.content && jobDescription.content.trim() !== ""));

  useEffect(() => {
    const loadPreviousCV = async () => {
      if (user) {
        try {
          const { data, error } = await supabase.storage
            .from('user_files')
            .list(`${user.id}/cv`, {
              limit: 1,
              sortBy: { column: 'created_at', order: 'desc' }
            });
            
          if (error) {
            throw error;
          }
          
          if (data && data.length > 0) {
            const latestFile = data[0];
            const filePath = `${user.id}/cv/${latestFile.name}`;
            
            const { data: fileData, error: fileError } = await supabase.storage
              .from('user_files')
              .download(filePath);
              
            if (fileError) {
              throw fileError;
            }
            
            const file = new File(
              [fileData], 
              latestFile.name, 
              { type: fileData.type }
            );
            
            setCvFile({ file, filePath, isExistingFile: true });
          }
        } catch (error: any) {
          console.error("Error loading previous CV:", error.message);
        }
      }
    };
    
    loadPreviousCV();
  }, [user]);

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
      setIsCvUploading(true);
      try {
        const filePath = `${user.id}/cv/${Date.now()}_${file.name}`;
        const { error } = await supabase.storage
          .from('user_files')
          .upload(filePath, file);
          
        if (error) {
          throw error;
        }
        
        setCvFile({ file, filePath, isExistingFile: false });
      } catch (error: any) {
        toast({
          title: "Upload failed",
          description: error.message || "Failed to upload your CV",
          variant: "destructive",
        });
      } finally {
        setIsCvUploading(false);
      }
    } else {
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
      setIsJobUploading(true);
      try {
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
        setIsJobUploading(false);
      }
    } else {
      setJobDescription({ file, content: "" });
    }
  };

  const handleJobTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription({ file: null, content: e.target.value });
  };

  const handleRemoveCv = async () => {
    if (!isProcessing && !isCvUploading) {
      if (user && cvFile.filePath && !cvFile.isExistingFile) {
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
    if (!isProcessing && !isJobUploading) {
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
    if (!isProcessing && !isJobUploading) {
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

  return {
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
  };
};
