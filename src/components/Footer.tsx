import { Waves, Mail, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return <footer className="border-t border-primary/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Waves className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                O.C.E.A.N
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Preservando a história com a tecnologia moderna junto da equipe Sharks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Acesso rápido</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/libraries" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Libraries
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="mx-0 px-0">
            <h3 className="font-semibold mb-4 text-primary">  Contato</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>equipetaubatesharks@gmail.com 
                  sharksfll_12476
              </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="px-[15px]">
            <h3 className="font-semibold mb-4 text-primary">Nos acompanhe</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} O.C.E.A.N - Equipe Sharks. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>;
};