import ProductsChart from "@/components/dashboard/products-chart";
import KeyMetrics from "@/components/dashboard/key-metrics";
import StockLevels from "@/components/dashboard/stock-levels";
import SideBar from "@/components/sidebar";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashBoardPage() {
    const { id } = await getCurrentUser();

    const [totalProducts, lowStock, allProducts] = await Promise.all([
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

    const totalValue = allProducts.reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0)

   const now = new Date()
    const weeklyProductsData = []

    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - i * 7) 
        weekStart.setHours(0, 0, 0, 0) 

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6) 
        weekEnd.setHours(23, 59, 59, 999) 

        const day = String(weekStart.getDate()).padStart(2, '0');
        const month = String(weekStart.getMonth() + 1).padStart(2, '0');
        const weekLabel = `${day}/${month}`; 

        const weekProducts = allProducts.filter((product) => {
            const productDate = new Date(product.createdAt) 
            return productDate >= weekStart && productDate <= weekEnd
        })

        weeklyProductsData.push({
            week: weekLabel,
            products: weekProducts.length
        })
    }

    const recent = await prisma.product.findMany({
        where: {
            userId: id,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
    })
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
                <ProductsChart data={weeklyProductsData} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <StockLevels recent={recent} />
            </div>
        </main>
    </div>
}