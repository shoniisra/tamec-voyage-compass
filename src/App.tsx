
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import AuthPage from "@/pages/AuthPage";
import HomePage from "@/pages/HomePage";
import BlogPage from "@/pages/BlogPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
import ContactPage from "@/pages/ContactPage";
import DestinationsPage from "@/pages/DestinationsPage";
import TourDetailPage from "@/pages/TourDetailPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import NotFound from "@/pages/NotFound";

import BlogPostsPage from "@/pages/admin/blog/BlogPostsPage";
import CreateBlogPostPage from "@/pages/admin/blog/CreateBlogPostPage";
import EditBlogPostPage from "@/pages/admin/blog/EditBlogPostPage";
import TagsPage from "@/pages/admin/blog/TagsPage";
import ToursPage from "@/pages/admin/tours/ToursPage";
import CreateTourPage from "@/pages/admin/tours/CreateTourPage";
import EditTourPage from "@/pages/admin/tours/EditTourPage";

// New admin settings pages
import AerolineasPage from "@/pages/admin/settings/AerolineasPage";
import DestinosPage from "@/pages/admin/settings/DestinosPage";
import ItemsPage from "@/pages/admin/settings/ItemsPage";
import RegalosPage from "@/pages/admin/settings/RegalosPage";
import TerminosPage from "@/pages/admin/settings/TerminosPage";

import "./App.css";
import { ThemeProvider } from "./providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<DestinationsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about-us" element={<HomePage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/:slug" element={<TourDetailPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/posts"
            element={
              <ProtectedRoute>
                <BlogPostsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/posts/create"
            element={
              <ProtectedRoute>
                <CreateBlogPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/posts/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlogPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blog/tags"
            element={
              <ProtectedRoute>
                <TagsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tours"
            element={
              <ProtectedRoute>
                <ToursPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tours/create"
            element={
              <ProtectedRoute>
                <CreateTourPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tours/edit/:id"
            element={
              <ProtectedRoute>
                <EditTourPage />
              </ProtectedRoute>
            }
          />

          {/* New Admin Settings Routes */}
          <Route
            path="/admin/settings/aerolineas"
            element={
              <ProtectedRoute>
                <AerolineasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/destinos"
            element={
              <ProtectedRoute>
                <DestinosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/items"
            element={
              <ProtectedRoute>
                <ItemsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/regalos"
            element={
              <ProtectedRoute>
                <RegalosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings/terminos"
            element={
              <ProtectedRoute>
                <TerminosPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
