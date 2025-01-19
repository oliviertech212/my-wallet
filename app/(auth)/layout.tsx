"use client";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  
  
  return (
    <div className="w-full flex flex-col md:flex-row ">
      <div className="landingpage flex flex-col md:w-1/2 justify-center items-center min-h-screen">
       
      </div>
      <div className="relative landingpage flex flex-col md:w-1/2 justify-center items-center min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;