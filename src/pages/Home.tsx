import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Waves, Database, Users, Globe, ArrowRight } from "lucide-react";
import oceanHero from "@/assets/ocean-hero.jpg";
const Home = () => {
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={oceanHero} alt="Ocean depths representing knowledge" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{
          animationDelay: "1s"
        }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30 mb-4">
              <Waves className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium">A Equipe SHARKS apresenta</span>
            </div>

            <h1 className="text-5xl leading-tight text-slate-300 text-center font-bold md:text-7xl">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                O.C.E.A.N
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-foreground/80 font-light max-w-3xl mx-auto">
              Organized Collection of Exploration and Artifact Network
            </p>

            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Uma biblioteca moderna e colaborativa para a documentação de artefatos arqueológicos.
              Mergulhe fundo na história com coleções apresentadas de uma maneira organizada, acessível e agradável por todo o mundo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button variant="hero" size="lg" asChild>
                <Link to="/libraries" className="group">
                  Explorar bibliotecas
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <Link to="/about">Conheça mais</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por que escolher <span className="text-primary">O.C.E.A.N?</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-100">
              Revolutionary features designed for modern archaeological documentation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
            icon: Database,
            title: "Organized Documentation",
            description: "Standardized forms and templates ensure consistent, professional artifact cataloging across all collections."
          }, {
            icon: Users,
            title: "Global Collaboration",
            description: "Connect with archaeologists and institutions worldwide. Share discoveries and build collective knowledge."
          }, {
            icon: Globe,
            title: "Accessible Anywhere",
            description: "Cloud-based platform accessible from any device. Your research, always at your fingertips."
          }].map((feature, index) => <div key={index} className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 group animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="mb-6 relative">
                  <feature.icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 blur-xl bg-primary/20 group-hover:bg-primary/30 transition-all" />
                </div>
                <h3 className="text-xl font-semibold mb-3 py-[3px]">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-3xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Dive In?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-200">
                Join archaeologists and institutions from around the world in preserving our shared cultural heritage.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/auth" className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;