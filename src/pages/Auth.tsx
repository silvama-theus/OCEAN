import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, Mail, Lock, User } from "lucide-react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "js-cookie";
import api from "../services/api";



const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = Cookies.get("x-token");
    if (token) {
      navigate("/my-library");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {

      try {
        const response = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password
        });
        Cookies.set("x-token", response.data.token, { expires: 1 });
        toast.success("Login bem sucedido", {
          description: "Bem vindo ao O.C.E.A.N",
        });
        navigate("/my-library");
      } catch (error: unknown) {
        console.error("erro!", error);
        toast.error("Falha no login!", {
          description: "Por favor, cheque suas informações e tente novamente.",
        });
      }
    } else {
      try {
        const response = await api.post('/user', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }).then(async () => {
          await api.post('/auth/login', {
            email: formData.email,
            password: formData.password
          }).then(async (loginResponse) => {
            Cookies.set("x-token", loginResponse.data.token, { expires: 1 });
            toast.success("Login concluído", {
              description: "Welcome back to O.C.E.A.N",
            });
            navigate("/my-library");
          });


        });
      } catch (error: unknown) {
        console.error("Houve um erro!", error);
        toast.error("Login falhado!", {
          description: "Por favor, verifique suas informações e tente novamente.",
        });
        return;
      }
      toast.success("Conta criada!", {
        description: "Welcome to O.C.E.A.N",
      });
    }
  };
  const signUp = () => {
    setIsLogin(!isLogin);
  }


  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <Card className="glass-card border-primary/20 max-w-md w-full z-10 animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Waves className="h-12 w-12 text-primary" />
               </div>
            </div>
          <div>
            <CardTitle className="text-2xl">
              {isLogin ? "Bem-vindo" : "Se junte ao O.C.E.A.N!"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Coloque sua conta para acessar sua biblioteca"
                : "Crie sua conta para começar a documentar"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    required={!isLogin}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome"
                    className="pl-10 bg-background/50 border-primary/20"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="instituição@gmail.com"
                  className="pl-10 bg-background/50 border-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="pl-10 bg-background/50 border-primary/20"
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            )}

            <Button type="submit" variant="hero" className="w-full" size="lg">
              Login
            </Button>

          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>{" "}
            <button
              type="button"
              onClick={() => signUp()}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Retorne para a página inicial
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
