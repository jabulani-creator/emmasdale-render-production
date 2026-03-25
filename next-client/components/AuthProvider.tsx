"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { getCurrentUser } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
