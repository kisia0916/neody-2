import { auth } from "$/auth";
import { prisma } from "$/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";

const user_schema = z.object({
    name:string(),
    email:string(),
    image:string()
})

export interface api_user_account_response {
    account_status:"signup"|"signin"
}
interface api_error_response {
    data:string
}

type user_type =z.infer<typeof user_schema>

export async function GET(req:NextRequest):Promise<NextResponse<api_user_account_response|api_error_response>>{
    try{
        const session = await auth()
        if (session){
            const user_data:user_type = user_schema.parse(session.user)
            const target_user = await prisma.user.findMany({
                where:{
                    email:user_data.email
                }
            })
            if (target_user){
                return NextResponse.json({account_status:"signin"})
            }else{
                return NextResponse.json({account_status:"signup"})
            }
        }else{
            return NextResponse.json({data:"session is not found"},{status:401})
        }
    }catch(error){
        if (error instanceof z.ZodError){
            return NextResponse.json({data:"validation error"},{status:500})
        }
        return NextResponse.json({data:"server error"},{status:500})
    }
}

//signin
const new_user_schema = z.object({
    display_name:string(),
    user_id:string()
})
type new_user_type = z.infer<typeof new_user_schema>
export async function POST(req:NextRequest):Promise<NextResponse<{data:string}|api_error_response>>{
    try{
        const session = await auth()
        if (session){
            const new_user_session:user_type = user_schema.parse(session.user)
            const body = await req.json()
            const new_user_data:new_user_type = new_user_schema.parse(body)
            await prisma.user.create({
                data:{
                    userId:new_user_data.user_id,
                    userName:new_user_data.display_name,
                    email:new_user_session.email,
                    userIcon:new_user_session.image,
                }
            })
            return NextResponse.json({data:"user has been created"})
        }else{
            return NextResponse.json({data:"session is not found"},{status:401})
        }
    }catch(error){
        if (error instanceof z.ZodError){
            return NextResponse.json({data:"validation error"},{status:500})
        }
        return NextResponse.json({data:"server error"},{status:500})
    }
}