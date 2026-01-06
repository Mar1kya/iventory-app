type EfficiencyProps = {
    inStockPercentage: number,
    lowStockPercentage: number,
    outOfStockPercentage: number
}
export default function Efficiency({ inStockPercentage, lowStockPercentage, outOfStockPercentage }: EfficiencyProps) {
    return <section className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Efficiency</h2>
        </div>
        <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                <div
                    className="absolute inset-0 rounded-full border-8 border-gray-800"
                    style={{
                        clipPath:
                            "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                    }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                            {inStockPercentage}%
                        </div>
                        <div className="text-sm text-gray-600">In Stock</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-800" />
                    <span>In Stock ({inStockPercentage}%)</span>
                </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500" />
                    <span>Low Stock ({lowStockPercentage}%)</span>
                </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                    <span>Out of Stock ({outOfStockPercentage}%)</span>
                </div>
            </div>
        </div>
    </section>
}