import { NextFireAuthContext } from "@/context/NextFireAuthContext";
import { NextFireAuthContextType } from "@/types/NextFireAuthContextType";
import React from "react";

/**
 * Easy to use hook for accessing the Next Fire Auth Context
 * @returns {NextFireAuthContextType} user and setLoading
 */
export const useAuthContext = (): NextFireAuthContextType =>
  React.useContext(NextFireAuthContext);
