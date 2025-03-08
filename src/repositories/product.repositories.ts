import prisma from "../config/prismadb";
import type {
	CreateProductDto,
	IProductRepository,
	PaginationOptions,
	Product,
	ProductQueryFiltersDto,
	UpdateProductDto,
} from "../types/product";

export class ProductRepository implements IProductRepository {
	async create(data: CreateProductDto): Promise<Product> {
		const product = await prisma.product.create({
			data,
		});

		return product;
	}

	async findAll(
		options: PaginationOptions,
		filters?: ProductQueryFiltersDto,
	): Promise<{ items: Product[]; total: number }> {
		const [items, total] = await prisma.$transaction([
			prisma.product.findMany({
				skip: (options.page - 1) * options.limit,
				take: options.limit,
			}),
			prisma.product.count(),
		]);

		return { items, total };
	}

	async findById(id: number): Promise<Product | null> {
		return await prisma.product.findUnique({
			where: {
				id,
			},
		});
	}

	update(id: number, data: UpdateProductDto): Promise<Product | null> {
		return prisma.product.update({
			where: {
				id,
			},
			data,
		});
	}

	async delete(id: number): Promise<boolean> {
		const product = await prisma.product.delete({
			where: {
				id,
			},
		});

		if (product) {
			return true;
		}

		return false;
	}
}
