
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import AuthPage from '@/pages/AuthPage';
import HomePage from '@/pages/HomePage';
import BlogPage from '@/pages/BlogPage';
import BlogDetailPage from '@/pages/BlogDetailPage';
import ContactPage from '@/pages/ContactPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import NotFound from '@/pages/NotFound';

import BlogPostsPage from '@/pages/admin/blog/BlogPostsPage';
import CreateBlogPostPage from '@/pages/admin/blog/CreateBlogPostPage';
import EditBlogPostPage from '@/pages/admin/blog/EditBlogPostPage';
import TagsPage from '@/pages/admin/blog/TagsPage';

import './App.css';
import { ThemeProvider } from './providers/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog/posts" element={
              <ProtectedRoute>
                <BlogPostsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog/posts/create" element={
              <ProtectedRoute>
                <CreateBlogPostPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog/posts/edit/:id" element={
              <ProtectedRoute>
                <EditBlogPostPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog/tags" element={
              <ProtectedRoute>
                <TagsPage />
              </ProtectedRoute>
            } />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
