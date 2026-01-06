import SideBar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashBoardPage() {
    const { id } = await getCurrentUser();
    const totalProducts = await prisma.product.count({
        where: { userId: id }
    })
    console.log(totalProducts)
    return <div className="min-h-screen bg-gray-50">
        <SideBar currentPath="/dashboard" />
        <main className="ml-64 p-8">
            <header className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-500">Welcome back! Here is an overview of your inventory.</p>
                    </div>
                </div>
            </header>

        </main>
    </div>
}