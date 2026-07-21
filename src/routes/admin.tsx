import { createFileRoute, Outlet, useLocation, useRouter } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const location = useLocation();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoginPage = location.pathname === "/admin/login";
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!mounted) return;
      if (isLoginPage && user) {
        router.navigate({ to: "/admin", replace: true });
      } else if (!isLoginPage && !user) {
        router.navigate({ to: "/admin/login", replace: true });
      } else {
        setIsAuthChecked(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <Outlet />;
  }

  if (!isAuthChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-alabaster">
        <div className="text-xl text-ink/50">جاري التحقق...</div>
      </div>
    );
  }

  // Determine title from path
  let title = "لوحة القيادة";
  if (location.pathname.includes("/categories")) title = "الفئات";
  else if (location.pathname.includes("/products")) title = "المنتجات";
  else if (location.pathname.includes("/offers")) title = "العروض";
  else if (location.pathname.includes("/orders")) title = "الطلبات";
  else if (location.pathname.includes("/branches")) title = "الفروع";
  else if (location.pathname.includes("/settings")) title = "الإعدادات";

  return (
    <div className="flex min-h-screen bg-alabaster dir-rtl">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        <AdminSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 w-full">
        <AdminHeader title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
