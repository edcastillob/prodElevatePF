import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function validate(userData){
    let errors = {};
    let RegExpression = /^[a-zA-Z\s]*$/;  
    let emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let identificationRegEx = /^\d{7,10}$/;
    let passwordRegEx = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/;
    // let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    
    
    //NAME 
    if (!userData.name) {
        errors.name = "A name is required";
    } else if (!RegExpression.test(userData.name)) {
        errors.name = "Numbers or special characters are not allowed";
    } else if (userData.name.length > 28) {
        errors.name = "The name can't be longer than 18 characters";
    }
    
    //EMAIL
    if(!emailRegEx.test(userData.email)){
        errors.email = "This Email is not valid"
    }
    
    //IDENTIFICATION
    if (
        !userData.identification ||
        typeof userData.identification !== "string" ||
        userData.identification.length < 7 ||
        userData.identification.length > 10 ||
        !/^\d+$/.test(userData.identification)
      ) {
        errors.identification = "Document ID must contain 7-10 digits";
      }
      
    //PHONE NUMBER
    if (
        !userData.numPhone ||
        typeof userData.numPhone !== "string" ||
        userData.numPhone.length < 7 ||
        userData.numPhone.length > 15
      ) {
        errors.numPhone = "Phone Number must be between 7 and 15 digits";
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

    
    return errors;
}