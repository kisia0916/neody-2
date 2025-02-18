import { auth } from "$/auth";
import { prisma } from "$/lib/db";
import { user_schema, user_type } from "$/lib/validate_schema";
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";

export interface api_user_account_response {
    account_status:"signup"|"signin",
}
interface api_error_response {
    data:string
}


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
            if (target_user.length > 0){
                return NextResponse.json({account_status:"signin"})
            }else{
                return NextResponse.json({account_status:"signup"})
            }
        }else{
            console.log(session)
            return NextResponse.json({data:"session is not found"})
        }
    }catch(error){
        console.log(error)
        if (error instanceof z.ZodError){
            return NextResponse.json({data:"validation error"},{status:500})
        }
        return NextResponse.json({data:"server error"},{status:500})
    }
}

//signup
const new_user_schema = z.object({
    display_name:string(),
    user_id:string()
})
export type new_user_type = z.infer<typeof new_user_schema>
export async function POST(req:NextRequest):Promise<NextResponse<{data:string}|api_error_response>>{
    try{
        const session = await auth()
        if (session){
            const new_user_session:user_type = user_schema.parse(session.user)
            const body = await req.json()
            const new_user_data:new_user_type = new_user_schema.parse(body)
            const already_user = await prisma.user.findMany({
                where:{
                    email:new_user_session.email
                }
            })
            if (already_user.length > 0){
                return NextResponse.json({data:"account_api_error_001"})
            }
            const user_id_check = await prisma.user.findMany({
                where:{
                    userId:new_user_data.user_id
                }
            })
            if (user_id_check.length > 0){
                return NextResponse.json({data:"account_api_error_002"})
            }
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