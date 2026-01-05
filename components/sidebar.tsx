import { BarChart3 } from 'lucide-react'
export default function SideBar({ currentPath = '/dashboard' }: { currentPath: string }) {
    return <div className="fix left-0 top-0 bg-black text-white w-64 min-h-screen p-6 z-10">
        <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className='w-7 h-7' />
                <span className='text-lg font-semibold'>Iventory App</span>
            </div>
        </div>
    </div>
}