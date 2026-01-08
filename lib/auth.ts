import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export async function getUser() {
  return await stackServerApp.getUser();
}

export async function getCurrentUser() {
  const user = await getUser(); 
  if (!user) {
    redirect("/sign-in");
  }
  return user;
}