
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader, X } from "lucide-react";

interface TailorActionButtonProps {
  isProcessing: boolean;
  isUploading: boolean;
  isFormComplete: boolean;
  remainingTime: number;
  onTailorCv: () => void;
  onCancelProcessing: () => void;
  user: any;
}

const TailorActionButton: React.FC<TailorActionButtonProps> = ({
  isProcessing,
  isUploading,
  isFormComplete,
  remainingTime,
  onTailorCv,
  onCancelProcessing,
  user,
}) => {
  return (
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
            onClick={onCancelProcessing}
            variant="outline"
            className="border-[#E2DCF8] text-[#3F2A51] hover:bg-[#F8F6FE] transition-colors rounded-full px-6"
          >
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
        </div>
      ) : (
        <>
          <Button 
            onClick={onTailorCv}
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
              isFormComplete ? "Click to tailor your CV to this job description" :
              "Please upload your CV and provide a job description to continue"}
          </p>
        </>
      )}
    </div>
  );
};

export default TailorActionButton;
