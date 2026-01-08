import FormProduct from "@/components/form-product";
import { getCurrentUser } from "@/lib/auth";
export default async function AddProductPage() {
    const { } = await getCurrentUser()
    return <>
        <header className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
                    <p className="text-sm text-gray-500">Add a new product to your inventory</p>
                </div>
            </div>
        </header>
        <div className="max-w-2xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <FormProduct />
            </div>
        </div>
    </>
} 