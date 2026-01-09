import ProductsChart from "@/components/dashboard/products-chart";
import KeyMetrics from "@/components/dashboard/key-metrics";
import StockLevels from "@/components/dashboard/stock-levels";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Efficiency from "@/components/dashboard/efficiency";

export const metadata = {
    title: 'Dashboard',
    description: 'Comprehensive overview of your warehouse. Track key metrics, control inventory costs, and analyze performance in real time.'
}

export default async function DashBoardPage() {
    const { id } = await getCurrentUser();

    const [allProducts, recent] = await Promise.all([
        prisma.product.findMany({
            where: { userId: id },
            select: {
                price: true,
                quantity: true,
                createdAt: true
            }
        }),
        prisma.product.findMany({
            where: { userId: id },
            orderBy: { createdAt: 'desc' },
            take: 5,
        })
    ]);

    const stats = allProducts.reduce((acc, product) => {
        const qty = Number(product.quantity);
        const price = Number(product.price);

        acc.totalValue += price * qty;

        if (qty === 0) {
            acc.outOfStock++;
        } else if (qty <= 5) {
            acc.lowStock++;
        } else {
            acc.inStock++;
        }

        return acc;
    }, { totalValue: 0, lowStock: 0, outOfStock: 0, inStock: 0 });

    const totalProducts = allProducts.length;

    const inStockPercentage = totalProducts > 0 ? Math.round((stats.inStock / totalProducts) * 100) : 0;
    const lowStockPercentage = totalProducts > 0 ? Math.round((stats.lowStock / totalProducts) * 100) : 0;
    const outStockPercentage = totalProducts > 0 ? Math.round((stats.outOfStock / totalProducts) * 100) : 0;

    const now = new Date();
    const weeklyProductsData = [];

    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - i * 7);
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);

        const day = String(weekStart.getDate()).padStart(2, '0');
        const month = String(weekStart.getMonth() + 1).padStart(2, '0');
        const weekLabel = `${day}/${month}`;

        const count = allProducts.filter((product) => {
            const productDate = new Date(product.createdAt);
            return productDate >= weekStart && productDate <= weekEnd;
        }).length;

        weeklyProductsData.push({
            week: weekLabel,
            products: count
        });
    }

    return (
        <>
            <header className="py-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-500">Welcome back! Here is an overview of your inventory.</p>
                    </div>
                </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <KeyMetrics
                    totalProducts={totalProducts}
                    totalValue={stats.totalValue}
                    lowStock={stats.lowStock}
                />
                <ProductsChart data={weeklyProductsData} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <StockLevels recent={recent} />
                <Efficiency
                    inStockPercentage={inStockPercentage}
                    lowStockPercentage={lowStockPercentage}
                    outOfStockPercentage={outStockPercentage}
                />
            </div>
        </>
    );
}