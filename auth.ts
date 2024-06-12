import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
// import { sql } from '@vercel/postgres'
import { sql } from './app/lib/sql-hack'; // 根据环境选择，是否使用线上的sql 还是连接本地数据库使用的的sql
import { z } from 'zod'
import type { User } from '@/app/lib/definitions'
import { authConfig } from './auth.config'

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
    // console.log(user, 'user')
    return user.rows[0]
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          // 从数据库查登录用户的信息。
          // 用户名和密码是初始化写入数据库的  user@nextmail.com 123456
          const user = await getUser(email);
          if (!user) return null;
          // 密码match
          const passwordsMatch = await bcrypt.compare(password, user.password);
          // console.log(passwordsMatch, 'passwordsMatch')
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials====================');
        return null;
      },
    }),
  ],
})
// 该文件一共返回3个变量， auth singIn signOut