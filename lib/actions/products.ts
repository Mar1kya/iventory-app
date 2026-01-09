"use server";
import z from "zod";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

export async function getProductById(productId: string, userId: string) {
  const product = await prisma.product.findFirst({
    where: { id: productId, userId },
  });
  return product;
}

export async function deleteProduct(id: string) {
  const user = await getCurrentUser();
  await prisma.product.deleteMany({
    where: { id, userId: user.id },
  });
  revalidatePath("/inventory");
  revalidatePath("/dashboard");
}

export async function createProduct(_prevState: any, formData: FormData) {
  const user = await getCurrentUser();
  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || undefined,
  });
  if (!parsed.success) {
    const flattened = z.flattenError(parsed.error);

    return {
      errors: flattened.fieldErrors,
      message: "Please fix the errors below.",
    };
  }
  try {
    await prisma.product.create({
      data: { ...parsed.data, userId: user.id },
    });
  } catch (error) {
    throw new Error("Failed to create product.");
  }
  revalidatePath("/inventory");
  revalidatePath("/dashboard");
  redirect("/inventory");
}
