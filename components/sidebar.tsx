"use client"
import { useStackApp, useUser } from '@stackframe/stack'; 
import { BarChart3, Package, Plus, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

export default function SideBar() {
    const user = useUser();
    const app = useStackApp(); 
    const pathname = usePathname();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
        { name: 'Inventory', href: '/inventory', icon: Package },
        { name: 'Add Product', href: '/add-product', icon: Plus },
        { name: 'Settings', href: '/settings', icon: Settings },
    ]

    return (
        <div className="fixed left-0 top-0 bg-black text-white w-64 min-h-screen p-6 z-10 flex flex-col">
            <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                    <BarChart3 className='w-7 h-7' />
                    <span className='text-lg font-semibold'>Inventory App</span>
                </div>
            </div>
            <nav className='space-y-1 flex-1'>
                <div className='text-sm font-semibold text-gray-400 uppercase mb-2'>
                    Inventory
                </div>
                {navigation.map((item, key) => {
                    const IconComponent = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link 
                            href={item.href} 
                            key={key} 
                            className={`flex items-center space-x-3 py-2 px-3 rounded-lg transition-colors ${isActive ? 'bg-gray-800 text-white' : 'hover:bg-gray-900 text-gray-400'}`}
                        >
                            <IconComponent className='w-5 h-5' />
                            <span className='text-sm'>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
            <div className='border-t border-gray-800 pt-4 mt-auto'>
                {user ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 overflow-hidden">
                            {user.profileImageUrl && (
                                <img 
                                    src={user.profileImageUrl} 
                                    alt={user.displayName || 'User'} 
                                    className="w-8 h-8 rounded-full bg-gray-700 object-cover"
                                />
                            )}
                            <div className="flex flex-col truncate">
                                <span className="text-sm font-medium truncate text-white">
                                    {user.displayName || 'User'}
                                </span>
                                <span className="text-xs text-gray-500 truncate">
                                    {user.primaryEmail}
                                </span>
                            </div>
                        </div>
                        <button 
                            onClick={() => app.signOut()} 
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            title="Sign out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <div className="animate-pulse flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                        <div className="h-4 bg-gray-800 rounded w-20"></div>
                    </div>
                )}
            </div>
        </div>
    )
}