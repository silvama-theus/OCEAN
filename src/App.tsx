import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Artifacts from "./pages/Artifacts";
import Artifact from "./pages/Artifact";
import Libraries from "./pages/Libraries";
import MyLibrary from "./pages/MyLibrary";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ManageInstitutes from "./pages/manageInstitutes";
import ManageInstitute from "./pages/ManageInstitute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/libraries" element={<Libraries />} />
              <Route path="/artifacts" element={<Artifacts />} />
              <Route path="/artifact/:id" element={<Artifact />} />
              <Route path="/library/:id" element={<Library />} />
              <Route path="/my-library" element={<PrivateRoute><MyLibrary /></PrivateRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/institutes" element={<ManageInstitutes />} />
              <Route path="/dashboard/institute/:id" element={<ManageInstitute />} />
              <Route path="/dashboard/libraries" element={<Dashboard />} />
              <Route path="/dashboard/library/:id" element={<Dashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
