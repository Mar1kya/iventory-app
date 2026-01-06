import KeyMetrics from "@/components/dashboard/key-metrics";
import SideBar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashBoardPage() {
    const { id } = await getCurrentUser();

    const [totalProducts, lowStock, allProducts ] = await Promise.all([
        await prisma.product.count({
            where: { userId: id }
        }),
        await prisma.product.count({
            where: {
                userId: id,
                lowStockAt: { not: null },
                quantity: { lte: 5 }
            }
        }),
        await prisma.product.findMany({
            where: {
                userId: id,
            },
            select: { price: true, quantity: true, createdAt: true }
        })
    ])
   
    const recent = await prisma.product.findMany({
        where: {
            userId: id,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
    })
    const totalValue = allProducts.reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0)
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <KeyMetrics totalProducts={totalProducts} totalValue={totalValue} lowStock={lowStock} />
            </div>
            
        </main>
    </div>
}