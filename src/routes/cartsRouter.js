import { Router } from 'express';
import { postCart, getCartById, postCartProduct } from '../controllers/cartsController.js';

const cartsRouter = Router();

cartsRouter.post("/", async(req, res) => {
    const { products } = req.body;
    try {
        const addCart = await postCart( products )
        res.status(201).json(addCart);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
})

cartsRouter.get("/:cid", async(req, res) => {
    const {cid} = req.params;
    
    try {
        const cartById = await getCartById(cid);
        res.status(200).json(cartById);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

cartsRouter.post("/:cid/product/:pid", async(req,res) => {
    const {cid, pid} = req.params;
    const { quantity } = req.body
    
    try {
        const cartById = await postCartProduct(cid, pid, quantity);
        res.status(201).json(cartById);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

export default cartsRouter;