const therapistValidator = (object) => {
    if (
        !object.email ||
        !object.password ||
        !object.confirmPassword ||
        !object.firstName ||
        !object.lastName 
    ){
        return ({error: "Please fill out all non-optional fields", valid: false})
    }
    else if( object.password !== object.confirmPassword){
        return ({error: "Make sure your passwords macth", valid: false})
    }
    else{
        return ({error: false, valid: true})
    }
} 

export default therapistValidator