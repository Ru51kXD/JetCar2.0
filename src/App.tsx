import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from './components/ui/Loader';
import AdminLayout from './components/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import LoginPage from './pages/admin/LoginPage';
import CarsPage from './pages/admin/CarsPage';
import TestDriveRequestsPage from './pages/admin/TestDriveRequestsPage';
import ContactsPage from './pages/admin/ContactsPage';

// Lazy loading pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const CarDetailPage = lazy(() => import('./pages/CarDetailPage'));
const TestDrivePage = lazy(() => import('./pages/TestDrivePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App: React.FC = () => {
  return (
    <div className="app">
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Маршруты админ-панели - без хедера и футера */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/cars" element={<CarsPage />} />
          <Route path="/admin/test-drive" element={<TestDriveRequestsPage />} />
          <Route path="/admin/contacts" element={<ContactsPage />} />
          
          {/* Основные маршруты сайта - с хедером и футером */}
          <Route path="*" element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route path="/car/:id" element={<CarDetailPage />} />
                  <Route path="/test-drive" element={<TestDrivePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
