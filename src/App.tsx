import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import { ContactPage } from "@/modules/contact";
import BlogPage from "@/pages/BlogPage";
import BlogDetailPage from "@/pages/BlogDetailPage";
import NotFound from "@/pages/NotFound";
import AuthPage from "@/pages/AuthPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import { DestinationsPage, TourDetailPage } from "@/modules/tours";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DestinationsPage />} />
      <Route path="/about-us" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogDetailPage />} />
      <Route path="/destinations" element={<DestinationsPage />} />
      <Route path="/destinations/:slug" element={<TourDetailPage />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Tour Routes */}
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

      {/* Admin Blog Routes */}
      <Route
        path="/admin/blog"
        element={
          <ProtectedRoute>
            <BlogPostsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blog/create"
        element={
          <ProtectedRoute>
            <CreateBlogPostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blog/edit/:id"
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

      {/* Admin Settings Routes */}
      <Route
        path="/admin/settings/destinos"
        element={
          <ProtectedRoute>
            <DestinosPage />
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
        path="/admin/settings/aerolineas"
        element={
          <ProtectedRoute>
            <AerolineasPage />
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
      <Route
        path="/admin/settings/items"
        element={
          <ProtectedRoute>
            <ItemsPage />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
