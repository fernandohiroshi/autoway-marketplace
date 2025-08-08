"use client";
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function SplashProvider({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000); 
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) return <Loader />;
  return <>{children}</>;
}
