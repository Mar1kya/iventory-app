import { type Product } from "@/lib/types"

type TableInventoryProps = {
    totalProducts: Product[]
}

export default function TableInventory({ totalProducts }: TableInventoryProps) {
    return <section className="space-y">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Low Stock At</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {totalProducts.map((product, key) => (
                        <tr key={key} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-left text-sm text-gray-500">{product.name}</td>
                            <td className="px-6 py-4 text-left text-sm text-gray-500">{product.sku || '-'}</td>
                            <td className="px-6 py-4 text-left text-sm text-gray-500">${Number(product.price).toFixed(2)}</td>
                            <td className="px-6 py-4 text-left text-sm text-gray-500">{product.quantity}</td>
                            <td className="px-6 py-4 text-left text-sm text-gray-500">{product.lowStockAt || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
}