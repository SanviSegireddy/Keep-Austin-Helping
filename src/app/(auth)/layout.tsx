import React from "react";

import Navbar from "@/components/navbar";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Navbar />
      {children}
    </div>
  );
};

export default AuthLayout;
