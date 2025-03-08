import type { Request, Response } from "express";

export interface Product {
	id: number;
	name: string;
	description: string | null;
	price: number;
	categoryId: number;
}

export type CreateProductDto = Omit<Product, "id">;

export type UpdateProductDto = Partial<Omit<Product, "id">>;

export type ProductResponseDto = Product;

export interface ProductQueryFiltersDto {
	category?: string;
	minPrice?: number;
	maxPrice?: number;
	search?: string;
}

export interface PaginationOptions {
	page: number;
	limit: number;
	sortBy?: keyof Product;
	sortDirection?: "asc" | "desc";
}

export interface PaginatedResult<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface IProductService {
	createProduct(product: CreateProductDto): Promise<Product>;
	getProductById(id: number): Promise<Product | null>;
	getAllProducts(
		options: PaginationOptions,
		filters?: ProductQueryFiltersDto,
	): Promise<PaginatedResult<Product>>;
	updateProduct(id: number, product: UpdateProductDto): Promise<Product | null>;
	deleteProduct(id: number): Promise<boolean>;
}

export interface IProductRepository {
	create(data: CreateProductDto): Promise<Product>;
	findById(id: number): Promise<Product | null>;
	findAll(
		options: PaginationOptions,
		filters?: ProductQueryFiltersDto,
	): Promise<{
		items: Product[];
		total: number;
	}>;
	update(id: number, data: UpdateProductDto): Promise<Product | null>;
	delete(id: number): Promise<boolean>;
}

export interface IProductController {
	create(req: Request, res: Response): Promise<void>;
	getById(req: Request, res: Response): Promise<void>;
	getAll(req: Request, res: Response): Promise<void>;
	update(req: Request, res: Response): Promise<void>;
	delete(req: Request, res: Response): Promise<void>;
}
