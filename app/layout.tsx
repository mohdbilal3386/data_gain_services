import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fullcalendar/common/main.css";
// import "@fullcalendar/daygrid/main.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import SidbarLayoutProvider from "@/app/layout/SidbarLayoutProvider";
import { StoreProvider } from "@/app/StoreProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "LIMS | Index",
    template: `%s |  LIMS`,
  },
  description: "Data gain services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AppRouterCacheProvider>
            {" "}
            <SidbarLayoutProvider>{children}</SidbarLayoutProvider>{" "}
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
