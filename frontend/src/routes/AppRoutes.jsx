import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProtectedRoute from "./ProtectedRoute";
import MembershipPage from "../pages/Membership/MembershipPage";
import EventsPage from "../pages/Events/EventsPage";
import TicketsPage from "../pages/Tickets/TicketsPage";
import FoundersPage from "../pages/Founders/FoundersPage";
import PaymentsPage from "../pages/Payments/PaymentsPage";
import BlogPage from "../pages/Blog/BlogPage";
import GalleryPage from "../pages/Gallery/GalleryPage";
import ReportsPage from "../pages/Reports/ReportsPage";
import UserPage from "../pages/Users/UserPage";
import EventRegistrationsPage from "../pages/Registrations/EventRegistrationsPage";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />

        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />

        <Route
          path="/signup"
          element={
            <AuthLayout>
              <SignupPage />
            </AuthLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/membership"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MembershipPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EventsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <MainLayout>
                <TicketsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/founders"
          element={
            <ProtectedRoute>
              <MainLayout>
                <FoundersPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PaymentsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <MainLayout>
                <BlogPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <MainLayout>
                <GalleryPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <MainLayout>
                <UserPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/registrations"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EventRegistrationsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ReportsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;