
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="w-full bg-[#3F2A51] text-white py-3 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">CV Tailor</Link>
        
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm hidden md:block">
                <User className="inline h-4 w-4 mr-1" />
                {user.email}
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={signOut}
                className="text-white hover:bg-white/20"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="sm"
              asChild
              className="text-white hover:bg-white/20"
            >
              <Link to="/auth">
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
