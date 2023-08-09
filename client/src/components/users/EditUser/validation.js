export default function validate(changeUser){
    let errors = {};
    let RegExpression = /^[a-zA-Z\s]*$/;  
    let emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    
    //NAME 
    if (!changeUser.name) {
        errors.name = "A name is required";
    } else if (!RegExpression.test(changeUser.name)) {
        errors.name = "Numbers or special characters are not allowed";
    } else if (changeUser.name.length > 28) {
        errors.name = "The name can't be longer than 28 characters";
    }
    
    //EMAIL
    if(!emailRegEx.test(changeUser.email)){
        errors.email = "This Email is not valid"
    }

    return errors;
}