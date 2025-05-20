
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

// Service Pages
import VisaProcessingPage from "@/pages/VisaProcessingPage";
import FlightServicePage from "@/pages/FlightServicePage";
import GalapagosServicePage from "@/pages/GalapagosServicePage";

// Language-specific service pages
import EnglishVisaProcessingPage from "@/pages/en/VisaProcessingPage";
import EnglishFlightServicePage from "@/pages/en/FlightServicePage";
import EnglishGalapagosServicePage from "@/pages/en/GalapagosServicePage";
import SpanishVisaProcessingPage from "@/pages/es/VisaProcessingPage";
import SpanishFlightServicePage from "@/pages/es/FlightServicePage";
import SpanishGalapagosServicePage from "@/pages/es/GalapagosServicePage";

// Language-specific main pages
import EnglishHomePage from "@/pages/en/HomePage";
import EnglishContactPage from "@/pages/en/ContactPage";
import EnglishBlogPage from "@/pages/en/BlogPage";
import EnglishBlogDetailPage from "@/pages/en/BlogDetailPage";
import EnglishDestinationsPage from "@/pages/en/DestinationsPage";
import EnglishTourDetailPage from "@/pages/en/TourDetailPage";

import SpanishHomePage from "@/pages/es/HomePage";
import SpanishContactPage from "@/pages/es/ContactPage";
import SpanishBlogPage from "@/pages/es/BlogPage";
import SpanishBlogDetailPage from "@/pages/es/BlogDetailPage";
import SpanishDestinationsPage from "@/pages/es/DestinationsPage";
import SpanishTourDetailPage from "@/pages/es/TourDetailPage";

// Sitemap and Robots
import SitemapXML from "@/pages/sitemap.xml";
import RobotsTXT from "@/pages/robots.txt";

// Admin Tour Pages
import ToursPage from "@/pages/admin/tours/ToursPage";
import CreateTourPage from "@/pages/admin/tours/CreateTourPage";
import EditTourPage from "@/pages/admin/tours/EditTourPage";

// Admin Blog Pages
import BlogPostsPage from "@/pages/admin/blog/BlogPostsPage";
import CreateBlogPostPage from "@/pages/admin/blog/CreateBlogPostPage";
import EditBlogPostPage from "@/pages/admin/blog/EditBlogPostPage";
import TagsPage from "@/pages/admin/blog/TagsPage";

// Admin Settings Pages
import DestinosPage from "@/pages/admin/settings/DestinosPage";
import RegalosPage from "@/pages/admin/settings/RegalosPage";
import AerolineasPage from "@/pages/admin/settings/AerolineasPage";
import TerminosPage from "@/pages/admin/settings/TerminosPage";
import ItemsPage from "@/pages/admin/settings/ItemsPage";

function App() {
  return (
    <Routes>
      {/* Default routes (will be redirected to language-specific in production) */}
      <Route path="/" element={<DestinationsPage />} />
      <Route path="/about-us" element={<HomePage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogDetailPage />} />
      <Route path="/destinations" element={<DestinationsPage />} />
      <Route path="/destinations/:slug" element={<TourDetailPage slug="" />} />
      
      {/* Legacy service routes (redirect to language-specific in production) */}
      <Route path="/services/visa-processing" element={<VisaProcessingPage />} />
      <Route path="/services/flights" element={<FlightServicePage />} />
      <Route path="/services/galapagos" element={<GalapagosServicePage />} />
      
      {/* English language routes */}
      <Route path="/en/about-us" element={<EnglishHomePage />} />
      <Route path="/en/contact" element={<EnglishContactPage />} />
      <Route path="/en/blog" element={<EnglishBlogPage />} />
      <Route path="/en/blog/:slug" element={<EnglishBlogDetailPage />} />
      <Route path="/en/destinations" element={<EnglishDestinationsPage />} />
      <Route path="/en/destinations/:slug" element={<EnglishTourDetailPage />} />
      
      {/* English language service routes */}
      <Route path="/en/services/visa-processing" element={<EnglishVisaProcessingPage />} />
      <Route path="/en/services/flights" element={<EnglishFlightServicePage />} />
      <Route path="/en/services/galapagos" element={<EnglishGalapagosServicePage />} />
      
      {/* Spanish language routes */}
      <Route path="/es/sobre-nosotros" element={<SpanishHomePage />} />
      <Route path="/es/contacto" element={<SpanishContactPage />} />
      <Route path="/es/blog" element={<SpanishBlogPage />} />
      <Route path="/es/blog/:slug" element={<SpanishBlogDetailPage />} />
      <Route path="/es/destinos" element={<SpanishDestinationsPage />} />
      <Route path="/es/destinos/:slug" element={<SpanishTourDetailPage />} />
      
      {/* Spanish language service routes */}
      <Route path="/es/servicios/tramite-de-visas" element={<SpanishVisaProcessingPage />} />
      <Route path="/es/servicios/vuelos" element={<SpanishFlightServicePage />} />
      <Route path="/es/servicios/galapagos" element={<SpanishGalapagosServicePage />} />
      
      {/* SEO routes */}
      <Route path="/sitemap.xml" element={<SitemapXML />} />
      <Route path="/robots.txt" element={<RobotsTXT />} />
      
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
