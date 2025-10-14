import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
<<<<<<< HEAD
=======
import Artifacts from "./pages/Artifacts";
import Artifact from "./pages/Artifact";
>>>>>>> 1f82535 (update 14-10-2025)
import Libraries from "./pages/Libraries";
import MyLibrary from "./pages/MyLibrary";
import About from "./pages/About";
import Auth from "./pages/Auth";
<<<<<<< HEAD
import NotFound from "./pages/NotFound";
=======
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
>>>>>>> 1f82535 (update 14-10-2025)

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
<<<<<<< HEAD
              <Route path="/my-library" element={<MyLibrary />} />
=======
              <Route path="/artifacts" element={<Artifacts />} />
              <Route path="/artifact/:id" element={<Artifact />} />
              <Route path="/library/:id" element={<Library />} />
              <Route path="/my-library" element={<PrivateRoute><MyLibrary /></PrivateRoute>} />
>>>>>>> 1f82535 (update 14-10-2025)
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
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
