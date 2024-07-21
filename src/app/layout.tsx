
import { Inter, Recursive } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/reutilizable/ReactQueryProvider";
import constructMetadata from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive ? recursive.className : inter.className}>
        <NavBar />
        <div className="flex grainy-light flex-col min-h-[calc(100vh-3.5rem-1px)]"> {/* 3.5 rem is height of the navbar component */}
          <main className="flex-1 flex flex-col h-full ">
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
