import SideBar from "@/components/sidebar";
export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="min-h-screen bg-gray-50">
        <SideBar />
        <main className="ml-64 p-8">{children}</main>
    </div>
}