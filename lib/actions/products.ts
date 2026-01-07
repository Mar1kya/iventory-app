"use server";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";

export async function deleteProduct(id: string) {
  const user = await getCurrentUser();
  await prisma.product.deleteMany({
    where: { id, userId: user.id },
  });
  revalidatePath("/inventory");
  revalidatePath("/dashboard");
}
