import { getUser } from "@/lib/auth";
import Link from "next/link";

export const metadata = {
  title: 'Home',
  description: 'A convenient inventory management system for your business. Track products, control stock levels, and get real-time analytics.'
}

export default async function Home() {
  const user = await getUser();
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-purple-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Inventory Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Streamline your inventory tracking with our powerful, easy-to-use
            management system. Track products, monitor stock levels, and gain
            valuable insights.
          </p>
          <div className="flex justify-center">
            <Link
              href={user ? '/dashboard' : '/sign-in'}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              {user ? 'Dashboard' : 'Sign In'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
