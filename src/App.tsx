import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/components/Layout/MainLayout";
import LoginForm from "@/components/Auth/LoginForm";
import Dashboard from "@/pages/Dashboard";
import Users from "@/pages/Users";
import Orders from "@/pages/Orders";
import Materials from "@/pages/Materials";
import Machines from "@/pages/Machines";
import Production from "@/pages/Production";
import Invoices from "@/pages/Invoices";
import Payments from "@/pages/Payments";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";
import Customers from "@/pages/Customers";
import Tasks from "@/pages/Tasks";
import Dispatch from "@/pages/Dispatch";
import DispatchNotes from "@/pages/DispatchNotes";
import MyTasks from "@/pages/MyTasks";
import MyOrders from "@/pages/MyOrders";
import MyInvoices from "@/pages/MyInvoices";
import MyPayments from "@/pages/MyPayments";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

// Create QueryClient outside of component to avoid recreating on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/machines" element={<Machines />} />
        <Route path="/production" element={<Production />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/dispatch" element={<Dispatch />} />
        <Route path="/dispatch-notes" element={<DispatchNotes />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-invoices" element={<MyInvoices />} />
        <Route path="/my-payments" element={<MyPayments />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </MainLayout>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
            <Toaster />
            <Sonner />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
