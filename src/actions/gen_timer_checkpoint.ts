import { auth } from "$/auth"
import jwt from "jsonwebtoken";

interface token_interface {
    counter:number,
    timestamp:number,
    user_id:string,
    timer_id:string
}
export interface gen_timer_checkpoint_return_interface {
    token:string,
    state:"done"|"error"
}
export const get_timer_checkpoint = async(token:string|undefined):Promise<gen_timer_checkpoint_return_interface>=>{
    const session = await auth()
    if (session){
        if (token){
            const decoded_token:token_interface = jwt.verify(token,process.env.SECRET_KEY as string) as token_interface
            const next_checkpoint = {
                    counter:decoded_token.counter+1,
                    timestamp:Date.now(),
                    user_id:session.app_data.user_id,
                    timer_id:""
            }
            const new_token = jwt.sign(next_checkpoint,process.env.SECRET_KEY as string)
            return {token:new_token,state:"done"}
        }else{
            const first_token:token_interface = {
                counter:0,
                timestamp:Date.now(),
                user_id:session.app_data.user_id,
                timer_id:""
            }
            const new_token = jwt.sign(first_token,process.env.SECRET_KEY as string)
            return {token:new_token,state:"done"}
        }
    }else{
        return {token:"",state:"error"}
    }
}