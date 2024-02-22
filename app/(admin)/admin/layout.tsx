import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import AdminSidebar from "@components/UI/adminSidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();
  const user = session?.user;
  const isAdmin = user?.role == "admin";
  if (!isAdmin) return redirect("/auth/login");
  return (
    <div className="w-full min-h-[calc(100vh-80px)] relative p-0 lg:pl-[220px]">
      <AdminSidebar />
      <div className="px-4 py-8 pt-16 lg:pt-8">{children}</div>
    </div>
  );
}
