import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from "react-router-dom";


interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AdminLayout = ({ children, title, subtitle }: AdminLayoutProps) => {

  const navigate = useNavigate();

  if (!localStorage.getItem("auth_token")) {
    navigate("/admin/login");
  } 

  

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">{title}</h1>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        {children}
      </main>
    </div>
  );
};


export default AdminLayout;
