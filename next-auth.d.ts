import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession{
        app_data:{
            user_id:string
        }
    }
}