"use client";

import Sidebar from "@/app/(components)/Sidebar";
import Navbar from "@/app/(components)/Navbar";
import DarkModeProvider from "./darkModeProvider";
import StoreProvider, { useAppSelector } from "./redux";
import AuthProvider from "./authProvider";
import { cn } from "@/lib/utils";

const LayoutDashboard = ({ children }: any) => {
  return (
    <StoreProvider>
      <AuthProvider>
        <DarkModeProvider>
          <DashboardWrapper>{children}</DashboardWrapper>
        </DarkModeProvider>
      </AuthProvider>
    </StoreProvider>
  );
};

const DashboardWrapper = ({ children }: any) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  return (
    <div className="flex min-h-dvh w-full text-gray-900">
      <Sidebar />
      <div
        className={cn(
          "flex min-h-dvh w-full flex-col",
          !isSidebarCollapsed && "md:pl-64",
        )}
      >
        <Navbar />
        <main className="dark:bg-dark-bg flex-1 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default LayoutDashboard;
