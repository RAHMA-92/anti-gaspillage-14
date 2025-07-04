
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { MessageProvider } from "@/contexts/MessageContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { AppSidebar } from "@/components/AppSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import NotificationSystem from "@/components/NotificationSystem";

// Pages
import Welcome from "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ReservedProducts from "./pages/ReservedProducts";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AppContent = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* Hide Lovable watermark */}
      <style>{`
        [data-lovable-watermark],
        .lovable-watermark,
        a[href*="lovable.dev"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `}</style>
      
      <AppSidebar />
      <main className="flex-1 flex flex-col">
        <div className="lg:hidden p-2 sm:p-3 border-b border-eco-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <SidebarTrigger className="text-eco-700 hover:bg-eco-50" />
            <NotificationSystem />
          </div>
        </div>
        <div className="hidden lg:block absolute top-4 right-4 z-50">
          <NotificationSystem />
        </div>
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reserved" element={<ReservedProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <ProductProvider>
          <MessageProvider>
            <ProfileProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <SidebarProvider>
                  <AppContent />
                </SidebarProvider>
              </BrowserRouter>
            </ProfileProvider>
          </MessageProvider>
        </ProductProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
