import SideNav from '@/app/ui/dashboard/sidenav'
import { signOut } from '../../auth'
import styles from '@/app/ui/css/home.module.css'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className={`flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${styles['header-conatiner']}` }>
              <div className="hidden md:block">Sign Out</div>
            </button>
      </form>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
      </div>
    </>
    
  )
}