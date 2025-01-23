import { string, z } from "zod"

export const user_schema = z.object({
    name:string(),
    email:string(),
    image:string()
})

export type user_type =z.infer<typeof user_schema>
