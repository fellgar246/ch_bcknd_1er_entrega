import * as fs from 'fs';
const path = './src/db/carts.json';

const getCarts = async() => {
    if(fs.existsSync(path)){
        const data = await fs.promises.readFile(path,'utf-8');
        const carts = JSON.parse(data);
        return carts
    }
    return [];
}

export const getCartById = async(id) => {
        const carts = await getCarts();
        const cart = carts.find( cart => cart.id  === Number(id) )
        if(!cart) throw new Error("Cart not found");
        return cart.products
}

export const postCart = async (productsArray) => {
    if (!Array.isArray(productsArray) || productsArray.length === 0) {
        throw new Error("Invalid or empty products array");
    }

    for (const productData of productsArray) {
        if (
            typeof productData.product !== 'number' ||
            typeof productData.quantity !== 'number'
        ) {
            throw new Error("Invalid data types in products array");
        }
    }

    const carts = await getCarts();

    const cart = {
        products: productsArray,
    };

    if (carts.length === 0) {
        cart.id = 1;
    } else {
        cart.id = carts[carts.length - 1].id + 1;
    }

    carts.push(cart);
    await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'));
    return cart;
};

export const postCartProduct = async(cid, pid, quantity) => {
    if( parseInt(cid) <= 0 || parseInt(pid) <= 0 || quantity <= 0 ) throw new Error ("It must be a digit above cero");

    const carts = await getCarts();     
    const findCart = carts.find(element => element.id === parseInt(cid) )
    if(!findCart) throw new Error("Cart not found");

    const findProduct = findCart.products.find(element => element.product === parseInt(pid))
    if(!findProduct) {
        const product = {
            product: parseInt(pid),
            quantity: quantity
        };
        findCart.products.push(product);
    } else {
        findProduct.quantity += quantity
    }

    await fs.promises.writeFile(path, JSON.stringify(carts,null,'\t'));
    return findCart
}