import AppSideBar from "@/components/AppSideBar";
import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSideBar />
      <main className="flex-1 p-6 w-full">{children}</main>
    </div>
  );
}

export default Layout;
