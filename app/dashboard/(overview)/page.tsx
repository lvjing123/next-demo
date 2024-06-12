import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/font'
import { fetchRevenue } from '@/app/lib/data'
import { Suspense } from 'react';
import { RevenueChartSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
    const totalPaidInvoices = 10
    const totalPendingInvoices = 20
    const revenue = await fetchRevenue()
    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                home
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<CardsSkeleton />}>
                    <Card title="Collected" value={totalPaidInvoices} type="collected" />
                </Suspense>
                <Card title="Pending" value={totalPendingInvoices} type="pending" />
                {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
                {/* <Card
                title="Total Customers"
                value={numberOfCustomers}
                type="customers"
                /> */}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* 注意 这里 加上 【@ts-expect-error】 的注释，是为了下面的组件 ts 报错*/}
                <LatestInvoices />
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
            </div>
        </main>
    );
}