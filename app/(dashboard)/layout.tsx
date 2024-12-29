export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      DASHBOARD HEADER
      <body>{children}</body>
    </main>
  );
}
