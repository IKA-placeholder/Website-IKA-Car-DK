import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./components/LanguageProvider";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bilvurdering - Find din bils værdi",
  description: "Få en øjeblikkelig vurdering af din bils værdi ved at indtaste dit nummerpladenummer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          <div className="pt-20">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
