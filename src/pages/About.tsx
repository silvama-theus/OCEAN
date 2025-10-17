import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Users, Waves } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 mb-6">
            <Waves className="h-12 w-12 text-primary animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-primary">O.C.E.A.N</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Organized Collection of Exploration and Artifact Network
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Meaning Section */}
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">O que signfica O.C.E.A.N?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">O.C.E.A.N</strong> é uma sigla para{" "}
                <strong className="text-primary">
                  Organized Collection of Exploration and Artifact Network
                </strong>
                , que signfica em português{" "}
                <em>"Coleção Organizada de Exploração e Rede de Artefatos"</em>.
              </p>
              <p>
                O nome foi escolhido para refletir uma conexão com o nome da nossa equipe Sharks e com nosso projeto{" "}
                <strong className="text-secondary">Sharks Team</strong>, simbolizando a profundidade e o vasto conhecimento do oceano. 
                Assim como o oceano guarda inúmeros mistérios esperando para serem descobertos, 
                nossa plataforma serve como uma porta de entrada para os tesouros da história humana.
.
              </p>
              <p>
                Como tubarões navegando nas profundezas com precisão e propósito, 
                ajudamos arqueólogos e pesquisadores a navegar por vastas coleções de artefatos com organização e clareza.
              </p>
            </CardContent>
          </Card>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-8 w-8 text-accent" />
                  <CardTitle className="text-xl">Nossa missão</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                   Revolucionar a documentação arqueológica com uma plataforma moderna, acessível, e colaborativa que preserva nossa cultura para as nossas gerações futuras. 
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="h-8 w-8 text-secondary" />
                  <CardTitle className="text-xl">Nossa visão</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Tornar-se a plataforma líder mundial em documentação de artefatos arqueológicos, conectando pesquisadores globalmente e 
                  tornando a história acessível a todos.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Impact Section */}
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Impacto Global</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                O O.C.E.A.N atende a uma necessidade da comunidade arqueológica: 
                a falta de ferramentas padronizadas e modernas para documentação de artefatos. Nossa plataforma permite:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>
                  <strong className="text-foreground">Padronização</strong>: práticas de documentação consistentes entre instituições e países
                </li>
                <li>
                  <strong className="text-foreground">Acessibilidade</strong>: Você poderá acessar nossa plataforma 
                  e as coleções em qualquer lugar
                  
                </li>
                <li>
                  <strong className="text-foreground">Colaboração</strong>: Conectando pesquisadores e instituições para compartilhar conhecimento
                </li>
                <li>
                  <strong className="text-foreground">Preservação</strong>: Os dados do artefato serão preservados para futuras gerações
                </li>
                <li>
                  <strong className="text-foreground">Educação</strong>: Tornando descobertas arqueológicas
                  accessiveis para estudantes e para o público
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">A equipe Sharks</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                 O O.C.E.A.N foi desenvolvido pela nossa equipe <strong className="text-secondary">Sharks</strong>,
                um grupo de estudantes que competem na FLL, em busca de promover aos arqueológos uma documentação mais eficiente através da tecnologia, 
                com o intuito de ajuda-los nesse trabalho.
                
              </p>
              <p>
                Juntos, nossa equipe desenvolveu um software que cumpre nosso objetivo: 
                atender a necessidade dos arqueólogos em busca de simplificar seu trabalho.
              </p>
              <div className="pt-4 border-t border-primary/20">
                <p className="text-sm">
                  <strong className="text-foreground">Contact:</strong> sharks@ocean.team
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Closing Statement */}
          <div className="text-center py-12 glass-card rounded-2xl border border-primary/20 animate-fade-in">
            <p className="text-lg text-foreground max-w-2xl mx-auto px-6">
              "Conectando a ciência, inovação, e cultura em um oceano de conhecimento, nós não estamos apenas
              documentando o passado — nós estamos preservando nossa história para o futuro."
            </p>
            <p className="text-sm text-primary mt-4 font-semibold">— Equipe Sharks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
