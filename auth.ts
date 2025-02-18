import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "./lib/db"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks:{
    async session({session}){
      if (session.user){
        const target_user = await prisma.user.findMany({
          where:{
            email:session.user.email
          }
        })
        if (target_user.length === 0){
          return session
        }
        return {
          ...session,
          app_data:{
            user_id:target_user[0].userId
          }
        }
      }else{
        return session
      }
    }
  }
})