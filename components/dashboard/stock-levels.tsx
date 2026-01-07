import { Product } from "@/lib/types";
type stockLevelsProps = {
    recent: Product[]
}
export default function StockLevels({ recent }: stockLevelsProps) {
    return <section className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Stock Levels</h2>
        </div>
        <div className="space-y-3">
            {recent.map((product, key) => {
                const stockLevel = product.quantity === 0 ? 0 : product.quantity <= (product.lowStockAt || 5) ? 1 : 2;
                const bgColors = ["bg-red-600", "bg-yellow-600", "bg-green-600"]
                const textColors = ["text-red-600", "text-yellow-600", "text-green-600"]
                return <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`} />
                        <span className="text-sm font-medium text-gray-900">{product.name}</span>
                    </div>
                    <div className={`text-sm font-medium ${textColors[stockLevel]}`}>
                        {product.quantity} units
                    </div>
                </div>
            })}
        </div>
    </section>
}