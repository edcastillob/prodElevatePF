export default function validateForm(
    name, 
    description,
) {
    let errors = {};
    let RegExpression = /^[a-zA-Z\s]*$/;

    if (!name) {
        errors.name = "Name is required";
    } else if (!RegExpression.test(name)) {
        errors.name = "Numbers or special characters are not allowed";
    } else if (name.length > 15) {
        errors.name = "The name can't be longer than 40 characters";
    }; 

    if (!description) {
        errors.description = "Description is required";
    } else if (description.length > 40) {
        errors.description = "The name can't be longer than 40 characters";
    };

    return errors
}