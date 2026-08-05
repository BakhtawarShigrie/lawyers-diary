import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// --- Providers ---
import AuthProvider from "./providers/SessionProvider";
import { AppProvider } from "./context/AppContext";

// --- Components ---
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lawyer's Diary | Legal Practice Management",
  description: "Advanced AI-powered SaaS for law firms and independent lawyers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100`}>
        <AuthProvider>
          <AppProvider>
            <div className="flex h-screen overflow-hidden">
              
              {/* Animated Sidebar */}
              <Sidebar />

              {/* Main Content Wrapper */}
              <div className="flex-1 flex flex-col lg:pl-72 w-full h-full">
                {/* Top Navigation */}
                <Navbar />
                
                {/* Main Page Content */}
                <main className="flex-1 overflow-y-auto scrollbar-hide">
                  {children}
                </main>
              </div>
              
            </div>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}