import "./globals.css";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

import { Inter } from "next/font/google";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="m-auto mx-auto my-8 max-w-screen-lg text-base leading-relaxed max-md:mx-8 md:my-32">
            <main className="md:grid md:grid-cols-5 md:gap-4">
              <NuqsAdapter>{children}</NuqsAdapter>
            </main>
            <Footer className="col-span-full" />
          </div>
        </ThemeProvider>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="77e291fe-0d5f-48f2-91a2-3126ce7b7cac"
        />
      </body>
    </html>
  );
}
