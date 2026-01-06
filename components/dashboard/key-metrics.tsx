import { TrendingUp } from "lucide-react";

type keyMetricsProps = {
    totalProducts: number,
    totalValue: number,
    lowStock: number,
}
export default function KeyMetrics({ totalProducts, totalValue, lowStock }: keyMetricsProps) {
    return <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Key Metrics</h2>
        <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                    {totalProducts}
                </div>
                <div className="text-sm text-gray-600">Total Products</div>
                <div className="flex items-center justify-center mt-1">
                    <span className="text-xs text-green-600 ml-1">+{totalProducts}</span>
                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
            </div>
            <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                    {Number(totalValue).toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
                <div className="flex items-center justify-center mt-1">
                    <span className="text-xs text-green-600 ml-1">+{Number(totalValue).toFixed(0)}</span>
                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
            </div>
            <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                    {lowStock}
                </div>
                <div className="text-sm text-gray-600">Low Stock</div>
                <div className="flex items-center justify-center mt-1">
                    <span className="text-xs text-green-600 ml-1">+{lowStock}</span>
                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" />
                </div>
            </div>
        </div>
    </section>
}