"use client";
import { usePathname } from "next/navigation";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const HeaderRoutes = ["/signin", "/signup", "/forgot-password"];
  return (
    <>
      <div className="relative flex flex-col landingpage !bg-[red] md:w-1/2 justify-center items-center min-h-screen mr-0 md:ml-[50%] ">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
