import type { Request, Response } from "express";

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	createdAt: Date;
	updatedAt: Date;
}

export type CreateProductDto = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type UpdateProductDto = Partial<
	Omit<Product, "id" | "createdAt" | "updatedAt">
>;

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
	getProductById(id: string): Promise<Product | null>;
	getAllProducts(
		options: PaginationOptions,
		filters?: ProductQueryFiltersDto,
	): Promise<PaginatedResult<Product>>;
	updateProduct(id: string, product: UpdateProductDto): Promise<Product | null>;
	deleteProduct(id: string): Promise<boolean>;
}

export interface IProductRepository {
	create(data: CreateProductDto): Promise<Product>;
	findById(id: string): Promise<Product | null>;
	findAll(
		options: PaginationOptions,
		filters?: ProductQueryFiltersDto,
	): Promise<{
		items: Product[];
		total: number;
	}>;
	update(id: string, data: UpdateProductDto): Promise<Product | null>;
	delete(id: string): Promise<boolean>;
}

export interface IProductController {
	create(req: Request, res: Response): Promise<void>;
	getById(req: Request, res: Response): Promise<void>;
	getAll(req: Request, res: Response): Promise<void>;
	update(req: Request, res: Response): Promise<void>;
	delete(req: Request, res: Response): Promise<void>;
}
