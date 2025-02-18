import { auth } from "$/auth"

interface token_interface {
    counter:number,
    timestamp:number,
    user_id:string,
    timer_id:string
}
export const get_timer_checkpoint = async(token:token_interface|undefined)=>{
    if (token){
        
    }else{
        // const session = await auth()
        // if (session){
        //     const first_token:token_interface = {
        //         counter:0,
        //         timestamp:Date.now(),
        //         user_id:session.user?.i
        //     }
        // }else{

        // }
    }
}