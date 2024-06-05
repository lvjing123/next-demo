import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { sql } from '@vercel/postgres'
import { z } from 'zod'
import type { User } from '@/app/lib/definitions'
import { authConfig } from './auth.config'

// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User>`SELECT * FROM users WHERE email=${email}`
//     return user.rows[0]
//   } catch (error) {
//     console.error('Failed to fetch user:', error)
//     throw new Error('Failed to fetch user.')
//   }
// }
function getUser(email: string){
  try {
    const user = [{
      email: 'user@nextmail.com',
      password: '123456',
      id: '1',
      name: 'jajja'
    }]
    return user[0]
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
          const user = await getUser(email);
          if (!user) return null;
          // 密码match
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log(passwordsMatch, 'passwordsMatch')
          // todo
          if (!passwordsMatch) return user;
        }

        console.log('Invalid credentials11====================');
        return null;
      },
    }),
  ],
})
// 该文件一共返回3个变量， auth singIn signOut