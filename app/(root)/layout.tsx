import { Header } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Pizza ",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <main className="min-h-screen ">
      <Header />
      {children}
      {modal}
    </main>
  );
}
