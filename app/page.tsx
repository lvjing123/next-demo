// 可以从next 引入一些组件，例如 image link
import Image from "next/image"
import Link from 'next/link'
// 可以从其他地方引入一些样式
import styles from '@/app/ui/home.module.css'
// 引入 login
import Login from '@/app/dashboard/login/page'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div className={styles.shape}> */}
        {/* 引入css 中某个css 样式的例子 */}
      {/* </div> */}
      <Login />
    </main>
  )
}
