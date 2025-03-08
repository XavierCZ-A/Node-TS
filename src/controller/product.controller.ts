import type { Request, Response } from "express";
import type {
	CreateProductDto,
	IProductController,
	IProductService,
	PaginationOptions,
	UpdateProductDto,
} from "../types/product";
import { ProductService } from "../service/product.service";

export class ProducController implements IProductController {
	private productService: IProductService;
	constructor(productService: IProductService) {
		this.productService = productService;
	}

	create = async (req: Request, res: Response): Promise<void> => {
		try {
			const productData: CreateProductDto = req.body;
			const product = await this.productService.createProduct(productData);
			res.status(201).json({
				success: true,
				data: product,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				error: "Internal Server Error",
			});
		}
	};

	getAll = async (req: Request, res: Response): Promise<void> => {
		const { page = 1, limit = 5 } = req.query;

		const options: PaginationOptions = {
			page: Number(page),
			limit: Number(limit),
		};

		try {
			const products = await this.productService.getAllProducts(options);
			res.status(200).json({
				success: true,
				data: products,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				error: "Internal Server Error",
			});
		}
	};

	getById = async (req: Request, res: Response): Promise<void> => {
		const id = Number(req.params.id);
		try {
			const product = await this.productService.getProductById(id);

			if (!product) {
				res.status(404).json({
					success: false,
					error: "Product not found",
				});
			}

			res.status(200).json({
				success: true,
				data: product,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				error: "Internal Server Error",
			});
		}
	};

	update = async (req: Request, res: Response): Promise<void> => {
		const id = Number(req.params.id);
		const productData: UpdateProductDto = req.body;

		try {
			const product = await this.productService.updateProduct(id, productData);

			if (!product) {
				res.status(404).json({
					success: false,
					error: "Product not found",
				});
			}

			res.status(200).json({
				success: true,
				data: product,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				error: "Internal Server Error",
			});
		}
	};

	delete = async (req: Request, res: Response): Promise<void> => {
		const id = Number(req.params.id);

		try {
			const product = await this.productService.deleteProduct(id);

			if (!product) {
				res.status(404).json({
					success: false,
					error: "Product not found",
				});
			}

			res.status(200).json({
				success: true,
				data: {},
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({
				success: false,
				error: "Internal Server Error",
			});
		}
	};
}
