import express from 'express';
import morgan from 'morgan';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';


const app = express();
const PORT = 8080 

app.use(express.json());
app.use(morgan("dev"))

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))



