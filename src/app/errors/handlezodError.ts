import { ZodError } from "zod"
import httpStatus from "http-status";

const handleZodError=(err:ZodError)=>{
    const errorSources=err.issues.map((issue:any)=>{
        return {
            path:issue?.path[issue.path.length-1],
            message:issue.message
        }
    })

    return {
        statusCode:httpStatus.BAD_REQUEST,
        message:"Validation Error",
        errorSources,
    }
}

export default handleZodError