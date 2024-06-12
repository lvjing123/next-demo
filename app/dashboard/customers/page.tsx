import Link from 'next/link'
import { fetchFilteredCustomers } from '@/app/lib/data'
import { use } from "react";
//use 是为了防止 浏览器报【Warning: A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework.】
import CustomersTable from '@/app/ui/customers/customerTable';

export default function Page() {
    const customers = use(fetchFilteredCustomers(''))
    return (
        <>
            <Link
                href="/dashboard/customers/create"
                className="flex h-10 w-40 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
                create customer
            </Link>
            <CustomersTable customers={customers} />
        </>
    )
}