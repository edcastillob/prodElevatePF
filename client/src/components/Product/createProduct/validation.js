export default function validateForm(
    category,
    name, 
    brand,
    condition,
    description,
    purchasePrice,
    salePrice,
    minimumStock,
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

    if (!brand) {
        errors.brand = "Brand is required";
    }; 

    if (!condition) {
        errors.condition = "Condition is required";
    }; 

    if (!description) {
        errors.description = "Description is required";
    } 

    if (!purchasePrice) {
        errors.purchasePrice = "Purchase Price is required";
    } else if (!parseFloat(purchasePrice)) {
        errors.purchasePrice = "Purchase Price must be a number";
    };

    if (!salePrice) {
        errors.salePrice = "Sale Price is required";
    } else if (!parseFloat(salePrice)) {
        errors.salePrice = "Sale Price must be a number";
    };

    if (!minimumStock) {
        errors.minimumStock = "Minimun stock is required";
    } else if (!parseInt(minimumStock)) {
        errors.minimumStock = "Minimun stock must be a number";
    }

    if (provider.length === 0) {
        errors.provider = "Provider is required";
    };

    if (images.length === 0) {
        errors.images = "Images is required";
    };

    return errors
}