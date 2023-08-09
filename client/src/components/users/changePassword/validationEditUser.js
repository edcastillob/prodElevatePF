
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
    
    //IDENTIFICATION
    if (
        !changeUser.identification ||
        typeof changeUser.identification !== "string" ||
        changeUser.identification.length < 7 ||
        changeUser.identification.length > 10 ||
        !/^\d+$/.test(changeUser.identification)
      ) {
        errors.identification = "Document ID must contain 7-10 digits";
      }
      
    //PHONE NUMBER
    if (
        !changeUser.numPhone ||
        typeof changeUser.numPhone !== "string" ||
        changeUser.numPhone.length < 7 ||
        changeUser.numPhone.length > 15
      ) {
        errors.numPhone = "Phone Number must be between 7 and 15 digits";
      }
    
    if (changeUser.image.length === 0) {
        errors.image = "Images is required";
    };

    return errors;
}