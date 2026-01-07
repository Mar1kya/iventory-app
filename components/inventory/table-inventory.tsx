import Form from 'next/form'
import { deleteProduct } from "@/lib/actions/products"
import { type Product } from "@/lib/types"

type TableInventoryProps = {
    totalProducts: Product[],
}

export default function TableInventory({ totalProducts}: TableInventoryProps) {
    return <main className="space-y-6">
        <section className="bg-white rounded-lg border border-gray-200 p-6">
            <Form className="flex gap-2" action="/inventory" >
                <input type='search' name="q" placeholder="Search products..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" />
                <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900">Search</button>
            </Form>
        </section>
        <section className="bg-white rounded-lg border border-gray-200 overflow-hidden">
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
                    {totalProducts.map((product) => {
                        const deleteProductById = deleteProduct.bind(null, product.id);
                        return <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-left text-sm text-gray-500">{product.name}</td>
                            <td className="px-6 py-4 text-left text-sm text-gray-500">{product.sku || '-'}</td>
                            <td className="px-6 py-4 text-left text-sm text-gray-500">${Number(product.price).toFixed(2)}</td>
                            <td className="px-6 py-4 text-left text-sm text-gray-500">{product.quantity}</td>
                            <td className="px-6 py-4 text-left text-sm text-gray-500">{product.lowStockAt || '-'}</td>
                            <td className="px-6 py-4 text-sm text-gray-50">
                                <form action={deleteProductById}>
                                    <button className="text-red-600 hover:text-red-900">Delete</button>
                                </form>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </section>
    </main>
}