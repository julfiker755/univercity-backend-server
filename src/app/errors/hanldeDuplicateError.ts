import httpStatus from "http-status";

const hanldeDuplicateError=(err:any)=>{
    const match=err.message.match(/"([^"]*)"/)
    const extracted_msg=match && match[1]
    const errorSources=[{
        path:'',
        message:`${extracted_msg} is already exists`
    }]
    return {
        statusCode:httpStatus.BAD_REQUEST,
        message:"Invaild ID",
        errorSources,
    }
}

export default hanldeDuplicateError