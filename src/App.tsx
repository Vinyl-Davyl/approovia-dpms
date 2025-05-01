import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

// Lazy load pages for better performance
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="h-14 w-14 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse"></div>
      <p className="mt-4 text-gray-600 animate-pulse">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route
            path="/"
            element={
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
