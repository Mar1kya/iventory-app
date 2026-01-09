import EditProductForm from "@/components/edit-form";
import { getProductById } from "@/lib/actions/products";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getCurrentUser();
    const userId = user.id;

    const product = await getProductById(id, userId);

    if (!product) {
        return notFound();
    }
    const plainProduct = {
        ...product,
        price: product.price.toNumber(), 
    };
    return <>
        <header className="mb-8 my-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Edit Product</h1>
                    <p className="text-sm text-gray-500">Edit an existing product in your inventory</p>
                </div>
            </div>
        </header>
        <div className="max-w-2xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <EditProductForm product={plainProduct}/>
            </div>
        </div>
    </>
}