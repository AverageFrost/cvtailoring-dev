
import React from "react";
import { Check } from "lucide-react";

interface SuccessBannerProps {
  visible: boolean;
  onClose: () => void;
}

const SuccessBanner = ({ visible, onClose }: SuccessBannerProps) => {
  if (!visible) return null;
  
  return (
    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 py-2 px-4 mb-3 rounded flex items-center justify-between">
      <div className="flex items-center">
        <Check className="h-4 w-4 mr-2 flex-shrink-0 text-green-500" />
        <p className="text-sm">
          <span className="font-bold">Success!</span> Your CV has been tailored to match the job description. You can now copy it into your own CV format for editing or start over.
        </p>
      </div>
      <button 
        className="text-green-500 hover:text-green-700 ml-2 flex-shrink-0" 
        aria-label="Close"
        onClick={onClose}
      >
        <span className="text-xl">×</span>
      </button>
    </div>
  );
};

export default SuccessBanner;
