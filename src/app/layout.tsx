"use client";
import React from "react";
import { Ubuntu } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["cyrillic"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${ubuntu.className}`}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
