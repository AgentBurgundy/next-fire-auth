"use client";

import { NextFireAuthContextProvider } from "next-fire-auth";

export default function ClientProviders({ children }: any) {
  return <NextFireAuthContextProvider>{children}</NextFireAuthContextProvider>;
}
