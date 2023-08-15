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
    let regexInteger = /^\d+$/

    if (!category) {
        errors.category = "Category is required";
    };

    if (!name) {
        errors.name = "Name is required";
    } else if (name.length > 25) {
        errors.name = "The name can't be longer than 25 characters";
    }; 

    if (!brand) {
        errors.brand = "Brand's name is required";
    }; 

    if (!condition) {
        errors.condition = "Condition is required";
    }; 

    if (!description) {
        errors.description = "Description is required";
    }; 

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

    if (!minStock) {
        errors.minStock = "Minimun stock is required";
    } else if (!parseInt(minStock)) {
        errors.minStock = "Minimun stock must be a number";
    } else if (!regexInteger.test(minStock)) {
        errors.minStock = "Minimun stock must be a integer number"
    }

    if (provider.length === 0) {
        errors.provider = "Provider is required";
    };

    if (images.length === 0) {
        errors.images = "Images is required";
    };

    if (!stock) {
        errors.stock = "Stock is required";
    } else if (!parseInt(stock)) {
        errors.stock = "Stock must be a number";
    } else if (!regexInteger.test(stock)) {
        errors.stock = "Stock must be a integer number";
    }
    // let Stock = parseInt(stock);
    // let hasDot = stock.toString().include(".");
    // let hasComa = stock.toString().include(",");
    // if (!stock) {
    //     errors.stock = "Stock is required";
    // } else if (typeof Stock !== "number") {
    //     errors.stock = "Stock must be a number";
    // } else if (hasDot || hasComa) {
    //     errors.stock = "Stock must be a integer number";
    // };

    return errors
}