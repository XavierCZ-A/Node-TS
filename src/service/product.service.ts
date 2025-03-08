import type {
	CreateProductDto,
	IProductRepository,
	IProductService,
	PaginatedResult,
	PaginationOptions,
	Product,
	ProductQueryFiltersDto,
	UpdateProductDto,
} from "../types/product";

export class ProductService implements IProductService {
	private productRepository: IProductRepository;
	constructor(productRepository: IProductRepository) {
		this.productRepository = productRepository;
	}

	async createProduct(product: CreateProductDto): Promise<Product> {
		return await this.productRepository.create(product);
	}

	async getAllProducts(
		options: PaginationOptions,
		filters?: ProductQueryFiltersDto,
	): Promise<PaginatedResult<Product>> {
		const { items, total } = await this.productRepository.findAll(
			options,
			filters,
		);

		const totalPages = Math.ceil(total / options.limit);

		return {
			items,
			total,
			page: options.page,
			limit: options.limit,
			totalPages,
		};
	}

	async getProductById(id: number): Promise<Product | null> {
		return await this.productRepository.findById(id);
	}

	async updateProduct(
		id: number,
		product: UpdateProductDto,
	): Promise<Product | null> {
		return await this.productRepository.update(id, product);
	}

	async deleteProduct(id: number): Promise<boolean> {
		return await this.productRepository.delete(id);
	}
}
