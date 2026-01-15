import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "../components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { GeofenceProvider } from "@/providers/geofence-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Indus ERP | Thermoforming Management",
  description: "End-to-end ERP for Thermoforming Industry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <AuthProvider>
          <GeofenceProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider>
                <div className="flex w-full min-h-screen">
                  <AppSidebar />
                  <main className="flex-1 overflow-auto">
                    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 py-2">
                      <SidebarTrigger />
                    </div>
                    <div className="p-4 md:p-8">
                      {children}
                    </div>
                  </main>
                </div>
                <Toaster />
              </SidebarProvider>
            </ThemeProvider>
          </GeofenceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
