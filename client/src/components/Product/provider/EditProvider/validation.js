export default function validateForm(
    name, 
    email,
    identification,
    address,
    isActive,
    numPhone,
) {
    let errors = {};
    let RegExpression = /^[a-zA-Z\s]*$/;
    let emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!name) {
        errors.name = "Name is required";
    } else if (!RegExpression.test(name)) {
        errors.name = "Numbers or special characters are not allowed";
    } else if (name.length > 15) {
        errors.name = "The name can't be longer than 40 characters";
    }; 

    if (!email) {
        errors.email = "Email is required";
    } else if (!emailRegEx.test(email)) {
        errors.email = "This Email is not valid"
    };

    if (!address) {
        errors.address = "Address is required";
    }

    if (
        !numPhone ||
        typeof numPhone !== "string" ||
        numPhone.length < 7 ||
        numPhone.length > 15
      ) {
        errors.numPhone = "Phone Number must be between 7 and 15 digits";
      }

      if (
        !identification ||
        typeof identification !== "string" ||
        identification.length < 7 ||
        identification.length > 10 ||
        !/^\d+$/.test(identification)
      ) {
        errors.identification = "Document ID must contain 7-10 digits";
      }

    if (!isActive) {
        errors.isActive = "Status of Provider is required"
    }

    return errors
}