
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import BlogPostsPage from "./pages/admin/blog/BlogPostsPage";
import CreateBlogPostPage from "./pages/admin/blog/CreateBlogPostPage";
import EditBlogPostPage from "./pages/admin/blog/EditBlogPostPage";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { ThemeProvider } from "./providers/ThemeProvider";
import { setupBlogStorage } from "./integrations/supabase/setupStorage";
import React from 'react';

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Setup storage bucket for blog images
    setupBlogStorage().catch(error => {
      console.error("Failed to setup blog storage:", error);
    });
  }, []);
  
  return (
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin={true} />}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="blog/posts" element={<BlogPostsPage />} />
              <Route path="blog/posts/create" element={<CreateBlogPostPage />} />
              <Route path="blog/posts/edit/:id" element={<EditBlogPostPage />} />
              {/* Add more admin routes here */}
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
