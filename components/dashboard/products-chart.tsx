"use client"
import { AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Area, Tooltip } from "recharts";

type productsChartProps = {
    week: string;
    products: number,
}
export default function ProductsChart({ data }: { data: productsChartProps[] }) {
    console.log(data)
    return <section className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">New products per week</h2>
        </div>
        <div className="h-48 w-full">
            <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" stroke='#666' fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke='#666' fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Area type="monotone" dataKey="products" stroke="#000" fill="#000" fillOpacity={0.2} dot={{ fill: "#000", r: 2 }} activeDot={{ fill: "#000", r: 4 }} />
                    <Tooltip
                        cursor={{
                            stroke: '#9ca3af',  
                            strokeWidth: 1,     
                            strokeDasharray: '3 3' 
                        }}
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                        labelStyle={{ color: "#374151", fontWeight: "500" }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </section>
}