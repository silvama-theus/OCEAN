import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Waves } from "lucide-react";
import { useEffect, useState } from "react";
import Cookie from "js-cookie";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [token, setToken] = useState<string | undefined>();


  const isActive = (path: string) => location.pathname === path;
  const logout = () => {
    Cookie.remove("x-token");
    window.location.href = "/"; // Redirect to home or login page after logout
  };
  useEffect(() => {
    setToken(Cookie.get("x-token"));
  }, []);
  const navLinks = [
    { path: "/", label: "Página inicial" },
    { path: "/libraries", label: "Acervos" },
    { path: "/artifacts", label: "Artefatos" },
    { path: "/my-library", label: "Minha biblioteca" },
    { path: "/about", label: "Sobre" },
    { path: "/dashboard", label: "Painel de controle" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Waves className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 blur-lg bg-primary/30 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                O.C.E.A.N
              </span>
              <span className="text-[8px] text-muted-foreground -mt-1 hidden sm:block">
                Organized Collection of Exploration and Artifact Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(link.path) ? "text-primary" : "text-foreground/80"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            {
              token ? (
               
                  <Button variant="hero" type="button" onClick={logout} size="sm">
                    Logout
                  </Button>
              ) : (
                <Button variant="hero" size="sm" asChild>
                  <Link to="/auth">Faça seu login</Link>
                </Button>
              )
            }

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-colors ${isActive(link.path)
                  ? "bg-primary/20 text-primary"
                  : "text-foreground/80 hover:bg-card/50"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4">
              {
                token ? (
                  <Button variant="hero" type="button" onClick={logout} size="sm">
                    Logout
                  </Button>
                ) : (
                  <Button variant="hero" size="sm" asChild>
                    <Link to="/auth">Get Started</Link>
                  </Button>
                )
              }
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
