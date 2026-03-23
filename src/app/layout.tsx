import "@/app/globals.css";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-4">{children}</main>
      </body>
    </html>
  );
}
