
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <header className="w-full py-3 px-4 absolute top-0 z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-[#3F2A51]">CV Tailor</Link>
        
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm hidden md:block text-[#3F2A51]">
                <User className="inline h-4 w-4 mr-1" />
                {user.email}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={signOut}
                className="text-[#3F2A51] border-[#3F2A51] hover:bg-[#3F2A51]/10"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          ) : (
            !isAuthPage && (
              <Button 
                variant="outline" 
                size="sm"
                asChild
                className="text-[#3F2A51] border-[#3F2A51] hover:bg-[#3F2A51]/10"
              >
                <Link to="/auth">
                  <LogIn className="h-4 w-4 mr-1" />
                  Sign In
                </Link>
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
