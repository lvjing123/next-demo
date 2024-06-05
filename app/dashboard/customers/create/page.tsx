import Form from '@/app/ui/customers/create-form'
import Breadcrumbs from '@/app/ui/customers/breadcrumbs'
import { fetchCustomers } from '@/app/lib/data'
import { use } from "react";

export default function Page() {
  const customers =  use(fetchCustomers())
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Customer',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}