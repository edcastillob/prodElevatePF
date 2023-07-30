export default function validateForm(
    category,
    name, 
    description,
    purchasePrice,
    salePrice,
    minimunStock,
    provider,
    images
) {
    let errors = {};

    if (!category) {
        errors.category = "Category is required";
    };

    if (!name) {
        errors.name = "Name is required";
    } else if (name.length > 20) {
        errors.name = "The name can't be longer than 20 characters";
    }; 

    if (!description) {
        errors.description = "Description is required";
    } 

    let purchase = parseFloat(purchasePrice)
    if (!purchasePrice) {
        errors.purchasePrice = "Purchase Price is required";
    } else if (typeof purchase !== "number") {
        errors.purchasePrice = "Purchase Price must be a number";
    };

    let sale = parseFloat(salePrice)
    if (!salePrice) {
        errors.salePrice = "Sale Price is required";
    } else if (typeof sale !== "number") {
        errors.salePrice = "Sale Price must be a number";
    };

    let minStock = parseInt(minimunStock); 
    if (minimunStock) {
        if (typeof minStock !== "number") {
            errors.minimunStock = "Minimun stock must be a number";
        }
    };

    if (provider.length === 0) {
        errors.provider = "Provider is required";
    };

    if (images.length === 0) {
        errors.images = "Images is required";
    };

    return errors
}