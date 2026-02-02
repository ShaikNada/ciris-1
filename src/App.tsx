import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import FIRManagement from "./pages/FIRManagement";
import CrimeAnalytics from "./pages/CrimeAnalytics";
import Monitoring from "./pages/Monitoring";
import EvidenceManagement from "./pages/EvidenceManagement";
import ImageEnhancement from "./pages/ImageEnhancement";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/fir" element={<FIRManagement />} />
            <Route path="/analytics" element={<CrimeAnalytics />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/evidence" element={<EvidenceManagement />} />
            <Route path="/enhancement" element={<ImageEnhancement />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
