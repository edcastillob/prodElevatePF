export default function validate(
    username
) {
    let errors = {};
    let emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let passwordRegEx = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/;


    if (!username) {
        errors.username = "Email is required";
    } else if (!emailRegEx.test(username)) {
        errors.username = "Numbers or special characters are not allowed";
    };


    if(!passwordRegEx.test(userData.password)){
        errors.password = "Requires uppercase, lowercase and number"
        
    }
     //EMAIL
     if(!emailRegEx.test(userData.email)){
        errors.email = "This Email is not valid"
    }
    

    //PASSWORD
    if(!passwordRegEx.test(userData.password)){
        errors.password = "Requires uppercase, lowercase and number"
        
    }

    // CONFIRM PASSWORD
     if (!userData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
    } else if (userData.password !== userData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    }

    return errors
}