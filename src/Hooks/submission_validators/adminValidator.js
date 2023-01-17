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
        console.log("missing field")
        console.log("OBJECT:::::", object)
        return ({error: {fields: "Please fill out all non-optional fields"}, valid: false})
    }
    else if ( object.password !== object.confirmPassword){
        console.log("Passwords do not match")
        return ({error: {passwords: "Make sure your passwords macth"}, valid: false})
    }
    else{
        console.log("Valid")
        return ({error: false, valid: true})
    }
}

export default adminValidator