
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Mock data for demonstration purposes
const mockJobDescription = `Sign in

Find Jobs

What Job title, keywords, or company

Where Scarborough, ON

Vice President, Investment Product & Advancement

IG Wealth Management · 3.6

Toronto, ON Hybrid work

IG Wealth Management

499 reviews

Read what people are saying about working here.

You must create an Indeed account before continuing to the company website to apply

Apply now

Job Company

Location`;

const mockTailoredCV = `ASHISH DEBRAY

+1 (437) ________ @gmail.com
Toronto, ON linkedin.com/in/ashishdebray

PROFESSIONAL SUMMARY

Strategic investment product leader with 9+ years of financial services experience, specializing in product development, innovation, and strategic planning. Proven track record of driving investment product advancement, managing cross-functional teams, and delivering innovative technology solutions aligned with market demands and client needs.

EMPLOYMENT HISTORY

DELOITTE - STRATEGY, RISK & TRANSACTIONS                 Toronto, ON
Head of Efficiency Innovation
Apr 2021 – Present

Investment Product Strategy & Innovation:
- Led development of 2 AI/ML product concepts with comprehensive business`;

const mockImprovements = [
  {
    category: "Key Changes:",
    items: [
      "Professional Summary: Refined to emphasize investment product strategy, innovation, and strategic planning, directly aligning with the IG Wealth Management VP role requirements."
    ]
  },
  {
    category: "Employment History:",
    items: [
      "Restructured bullet points to highlight investment product development, strategic planning, and market analysis skills",
      "Emphasized product innovation, stakeholder management, and cross-functional collaboration",
      "Added more quantifiable achievements related to product strategy and market insights"
    ]
  },
  {
    category: "Areas of Expertise:",
    items: [
      "Updated professional skills to mirror job description keywords",
      "Added \"Investment Product Structuring\" and related competencies to match role requirements"
    ]
  }
];

const Results = () => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);

  const handleDownload = () => {
    // This would be connected to actual download logic in a real implementation
    toast({
      title: "Download started",
      description: "Your tailored CV is being downloaded as a DOCX file.",
    });
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F6FE] flex flex-col items-center px-4 py-8">
      <style jsx global>{`
        /* Custom scrollbar styles */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #E2DCF8;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #9b87f5;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #7E69AB;
        }
        
        /* Firefox scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #9b87f5 #E2DCF8;
        }
      `}</style>
      <div className="w-full max-w-6xl">
        {/* Success Message */}
        {showBanner && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8 rounded flex items-start justify-between">
            <div className="flex items-start">
              <span className="flex-shrink-0 mr-2">✓</span>
              <p>
                <span className="font-bold">Success!</span>
                <br />
                Your CV has been tailored to match the job description. You can now copy it into your own CV format for editing or start over.
              </p>
            </div>
            <button 
              className="text-green-500 hover:text-green-700" 
              aria-label="Close"
              onClick={handleCloseBanner}
            >
              <span className="text-xl">×</span>
            </button>
          </div>
        )}
        
        {/* Header with back button */}
        <div className="mb-8 flex items-center">
          <Button 
            onClick={handleGoBack} 
            variant="ghost" 
            className="mr-4 text-[#3F2A51] hover:bg-[#E2DCF8] hover:text-[#3F2A51]"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold text-[#3F2A51]">Your Tailored CV</h1>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Job Description */}
          <Card className="border-[#E2DCF8] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3F2A51]">Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-md h-[500px] overflow-y-auto whitespace-pre-line text-left text-sm">
                {mockJobDescription}
              </div>
            </CardContent>
          </Card>

          {/* Tailored CV */}
          <Card className="border-[#E2DCF8] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#3F2A51]">Tailored CV</CardTitle>
              <Button 
                onClick={handleDownload}
                className="bg-[#3F2A51] hover:bg-[#2A1C36] text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-md h-[500px] overflow-y-auto whitespace-pre-line text-left text-sm">
                {mockTailoredCV}
              </div>
            </CardContent>
          </Card>

          {/* Improvements */}
          <Card className="border-[#E2DCF8] shadow-sm">
            <CardHeader>
              <CardTitle className="text-[#3F2A51]">Improvements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-md h-[500px] overflow-y-auto text-left">
                {mockImprovements.map((improvement, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="flex items-center text-[#3F2A51] font-semibold mb-2">
                      <Star className="h-5 w-5 mr-2 text-[#AF93C8]" />
                      {improvement.category}
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      {improvement.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-sm text-gray-700">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
