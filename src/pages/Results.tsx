
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SuccessBanner from "@/components/results/SuccessBanner";
import JobDescriptionPanel from "@/components/results/JobDescriptionPanel";
import TailoredCVPanel from "@/components/results/TailoredCVPanel";
import ImprovementsPanel from "@/components/results/ImprovementsPanel";
import ScrollbarStyles from "@/components/results/ScrollbarStyles";

// Mock data - would come from the context or API in a real app
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
    // Create a Blob from the CV text
    const blob = new Blob([mockTailoredCV], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Tailored_CV.docx'; // Set the filename
    
    // Append to the document, click to trigger download, then remove
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F6FE] flex flex-col items-center px-4 py-4">
      <ScrollbarStyles />
      
      <div className="w-full max-w-6xl">
        <SuccessBanner visible={showBanner} onClose={handleCloseBanner} />
        
        <div className="mb-4 flex items-center">
          <Button 
            onClick={handleGoBack} 
            variant="ghost" 
            className="mr-4 text-[#3F2A51] hover:bg-[#E2DCF8] hover:text-[#3F2A51]"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-[#3F2A51]">Your Tailored CV</h1>
        </div>

        {/* Main content - job description and tailored CV side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <JobDescriptionPanel content={mockJobDescription} />
          <TailoredCVPanel content={mockTailoredCV} onDownload={handleDownload} />
        </div>

        {/* Improvements section at the bottom */}
        <div className="w-full">
          <ImprovementsPanel improvements={mockImprovements} />
        </div>
      </div>
    </div>
  );
};

export default Results;
