import { Router } from "express";
import type {
	IProductController,
	IProductRepository,
	IProductService,
} from "../types/product";
import { ProducController } from "../controller/product.controller";
import { ProductService } from "../service/product.service";
import { ProductRepository } from "../repositories/product.repositories";

const router = Router();

const productRepository: IProductRepository = new ProductRepository();
const productService: IProductService = new ProductService(productRepository);
const productController: IProductController = new ProducController(
	productService,
);

router.post("/product", productController.create);
router.get("/product/:id", productController.getById);
router.get("/product", productController.getAll);
router.delete("/product/:id", productController.delete);
router.put("/product/:id", productController.update);

export default router;
