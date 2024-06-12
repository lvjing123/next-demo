'use client' // 主要是 usePathname 只能在 client 端使用，需要加上这一行

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
  } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import styles from '@/app/ui/css/home.module.css'

const links = [
    {
        icon: HomeIcon,
        name: 'home',
        href: '/dashboard'
    },
    {
        icon: DocumentDuplicateIcon,
        name: 'admin',
        href: '/dashboard/admin'
    },
    {
        icon: UserGroupIcon,
        name: 'customers',
        href: '/dashboard/customers'
    }
]
export default function SideNav() {
    const pathname = usePathname()
    return (
        <div className={`${styles['left-side-container']}`}>
        {links.map((link) => {
            const LinkIcon = link.icon;
            return (
                <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md marker:p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
                        {
                          ' text-blue-600': pathname === link.href,
                        },
                      )}
          
                >
                    <LinkIcon className="w-6" />
                    <p className="hidden md:block">{link.name}</p>
                </Link>
            )
            })
        }
    </div>
    )
}