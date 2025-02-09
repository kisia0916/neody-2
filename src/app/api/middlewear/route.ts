import { auth } from "$/auth";
import { prisma } from "$/lib/db";
import { user_schema} from "$/lib/validate_schema";
import { NextRequest, NextResponse } from "next/server";

export interface api_user_middleware_response {
    data:"signup"|"signin"|"no_session"
}

export async function GET(req:NextRequest):Promise<NextResponse<{data:"signup"|"signin"|"no_session"}|{data:string}>>{
    try{
        const session = await auth()
        if (session){
            const user_data = user_schema.parse(session.user)
            const target_user = await prisma.user.findMany({
                where:{
                    email:user_data.email
                }
            })
            if (target_user.length > 0){
                return NextResponse.json({data:"signin"})
            }else{
                return NextResponse.json({data:"signup"})
            }
        }else{
            return NextResponse.json({data:"no_session"})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json({data:"server error"},{status:200})
    }
}