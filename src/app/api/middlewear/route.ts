import { auth } from "$/auth";
import { prisma } from "$/lib/db";
import { user_schema} from "$/lib/validate_schema";
import { NextRequest, NextResponse } from "next/server";

export interface api_user_middleware_response {
    data:"signup"|"signin"|"no_session"
}

export async function GET(req:NextRequest){
    const data = await auth()
    console.log(data)
    return NextResponse.json({test:"data"})
}