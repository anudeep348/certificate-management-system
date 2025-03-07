import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      {children}
    </div>
  );
}

export default Layout;
