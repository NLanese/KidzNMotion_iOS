const adminValidator = (object) => {
    if (
        !object.email ||
        !object.password ||
        !object.confirmPassword ||
        !object.firstName ||
        !object.lastName ||
        !object.organizationName ||
        !object.organizationType 
    ){
        return ({error: {fields: "Please fill out all non-optional fields"}, valid: false})
    }
    else if ( object.password !== object.confirmPassword){
        return ({error: {passwords: "Make sure your passwords macth"}, valid: false})
    }
    else{
        return ({error: false, valid: true})
    }
}

export default adminValidator