"use client";

import * as React from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";

export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <MobileNav open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenu={() => setOpen(true)} />
        <main
          className="flex-1 px-4 sm:px-5 lg:px-8 py-5 sm:py-6 lg:py-8 max-w-[1400px] w-full mx-auto"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
