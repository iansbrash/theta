const constructError = (status : number, message : string) : {
    isError: string,
    status: number,
    message: string
} => {
    return {
        isError: "Error",
        status,
        message
    }
}

export const constructWarning = (status : number, message : string) : {
    isError: string,
    status: number,
    message: string
} => {
    return {
        isError: "Warning",
        status,
        message
    }
}




export default constructError