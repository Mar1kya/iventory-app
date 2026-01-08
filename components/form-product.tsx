"use client"
import Link from "next/link"
import { createProduct } from "@/lib/actions/products"
import { useActionState } from "react"

export default function FormProduct() {
    const [state, actionFn, isPeding] = useActionState(createProduct, null)
    return <form action={actionFn} className="space-y-6">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" placeholder="Enter Product Name" />
            {state?.errors.name && <p className="text-sm text-red-500">{state.errors.name[0]}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                <input type="number" id="price" name="price" step="0.01" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" placeholder="0.0" />
                {state?.errors.price && <p className="text-sm text-red-500">{state.errors.price[0]}</p>}
            </div>
            <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                <input type="number" id="quantity" name="quantity" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" placeholder="0" />
                {state?.errors.quantity && <p className="text-sm text-red-500">{state.errors.quantity[0]}</p>}
            </div>
        </div>
        <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">SKU (optional)</label>
            <input type="text" id="sku" name="sku" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" placeholder="Enter SKU" />
        </div>
        <div>
            <label htmlFor="lowStockAt" className="block text-sm font-medium text-gray-700 mb-2">Low Stock At (optional)</label>
            <input type="number" id="lowStockAt" name="lowStockAt" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent" placeholder="Enter low stock threshold" />
        </div>
        <div className="flex gap-5">
            <button type="submit" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900" disabled={isPeding}>{isPeding ? 'Adding...': 'Add Product'}</button>
            <Link href="/inventory" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                Cancel
            </Link>
        </div>
        {state?.message && <p className="text-sm text-red-500">{state.message}</p>}
    </form>
}