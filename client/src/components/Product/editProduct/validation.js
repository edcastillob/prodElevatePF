export default function validateForm(
    category,
    name, 
    brand,
    condition,
    description,
    purchasePrice,
    salePrice,
    minStock,
    provider,
    stock,
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
        errors.brand = "Description is required";
    }; 

    if (!condition) {
        errors.condition = "Description is required";
    }; 

    if (!description) {
        errors.description = "Description is required";
    }; 

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

    let minimunStock = parseInt(minStock); 
    if (minStock) {
        if (typeof minimunStock !== "number") {
            errors.minStock = "Minimun stock must be a number";
        }
    };

    if (provider.length === 0) {
        errors.provider = "Provider is required";
    };

    if (images.length === 0) {
        errors.images = "Images is required";
    };

    let Stock = parseInt(stock);
    let hasDot = stock.toString().include(".");
    let hasComa = stock.toString().include(",");
    if (!stock) {
        errors.stock = "Stock is required";
    } else if (typeof Stock !== "number") {
        errors.stock = "Stock must be a number";
    } else if (hasDot || hasComa) {
        errors.stock = "Stock must be a integer number";
    };

    return errors
}