export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      DASHBOARD HEADER
      <body className="bg-background">{children}</body>
    </html>
  );
}
