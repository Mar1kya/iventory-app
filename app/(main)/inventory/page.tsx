import Pagination from "@/components/inventory/pagination";
import TableInventory from "@/components/inventory/table-inventory";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma"

export default async function InventoryPage({ searchParams }: { searchParams: Promise<{ q?: string, page?: string }> }) {
    const { id } = await getCurrentUser();
    const params = await searchParams;

    const q = (params.q ?? '').trim();

    const pageSize = 10;
    const page = Math.max(1, Number(params.page ?? 1))


    const where = {
        userId: id,
        ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {})
    }

    const [totalCount, items] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * pageSize,
            take: pageSize
        })
    ])

    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

    return <>
        <header className="py-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
                    <p className="text-sm text-gray-500">Manage your products and track inventory levels.</p>
                </div>
            </div>
        </header>
        <TableInventory totalProducts={items} />
        {totalPages > 1 && <div className='bg-white rounded-lg border border-gray-200 p-6 mt-4'>
            <Pagination currentPage={page} totalPages={totalPages} baseUrl="/inventory" searchParams={{ q, pageSize: String(pageSize) }} />
        </div>}
    </>
} 