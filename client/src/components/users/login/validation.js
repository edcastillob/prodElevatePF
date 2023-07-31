export default function validateForm(
    username
) {
    let errors = {};
    let emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!username) {
        errors.username = "Email is required";
    } else if (!emailRegEx.test(username)) {
        errors.username = "Numbers or special characters are not allowed";
    };

    return errors
}