import TableInventory from "@/components/inventory/table-inventory";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma"

export default async function InventoryPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { id } = await getCurrentUser();
    const params = await searchParams;
    const q = (params.q ?? '').trim();
    const totalProducts = await prisma.product.findMany({ where: { userId: id, name: { contains: q, mode: "insensitive" } } })

    return <>
        <header className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
                    <p className="text-sm text-gray-500">Manage your products and track inventory levels.</p>
                </div>
            </div>
        </header>
        <TableInventory totalProducts={totalProducts} />
    </>
} 