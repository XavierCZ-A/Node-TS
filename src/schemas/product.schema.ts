import { z } from "zod";

export const productSchema = z
	.object({
		name: z
			.string({
				invalid_type_error: "Product name must be a string",
				required_error: "Product name is required",
			})
			.min(2, "Product name must be at least 2 characters long"),
		description: z.string({
			invalid_type_error: "Product description must be a string",
			required_error: "Product description is required",
		}),
		price: z
			.number({
				invalid_type_error: "Product price must be a number",
				required_error: "Product price is required",
			})
			.int()
			.min(0),
		categoryId: z
			.number({
				required_error: "Category is required",
			})
			.int(),
	})
	.strict({ message: "Invalid product" });
