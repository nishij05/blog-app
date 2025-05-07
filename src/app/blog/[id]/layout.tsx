

import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Optional wrapper UI */}
      {children}
    </section>
  );
}
