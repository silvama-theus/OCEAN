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
              <CardTitle className="text-2xl">What Does O.C.E.A.N Mean?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">O.C.E.A.N</strong> stands for{" "}
                <strong className="text-primary">
                  Organized Collection of Exploration and Artifact Network
                </strong>
                , which in Portuguese translates to{" "}
                <em>"Coleção Organizada de Exploração e Rede de Artefatos"</em>.
              </p>
              <p>
                The name was carefully chosen to reflect our connection with the{" "}
                <strong className="text-secondary">Sharks Team</strong>, symbolizing the depth and vast
                knowledge of the ocean. Just as the ocean holds countless mysteries waiting to be discovered,
                our platform serves as a gateway to the treasures of human history.
              </p>
              <p>
                Like sharks navigating the depths with precision and purpose, we help archaeologists and
                researchers navigate through vast collections of artifacts with organization and clarity.
              </p>
            </CardContent>
          </Card>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all animate-fade-in">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-8 w-8 text-accent" />
                  <CardTitle className="text-xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  To revolutionize archaeological documentation by providing a modern, accessible, and
                  collaborative platform that preserves our shared cultural heritage for future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Eye className="h-8 w-8 text-secondary" />
                  <CardTitle className="text-xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  To become the world's leading platform for archaeological artifact documentation, connecting
                  researchers globally and making history accessible to everyone.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Impact Section */}
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl">Global Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                O.C.E.A.N addresses a critical need in the archaeological community: the lack of standardized,
                modern tools for artifact documentation. Our platform enables:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>
                  <strong className="text-foreground">Standardization</strong>: Consistent documentation
                  practices across institutions and countries
                </li>
                <li>
                  <strong className="text-foreground">Accessibility</strong>: Cloud-based access to collections
                  from anywhere in the world
                </li>
                <li>
                  <strong className="text-foreground">Collaboration</strong>: Connecting researchers and
                  institutions to share knowledge
                </li>
                <li>
                  <strong className="text-foreground">Preservation</strong>: Digital records that protect
                  knowledge for future generations
                </li>
                <li>
                  <strong className="text-foreground">Education</strong>: Making archaeological discoveries
                  accessible to students and the public
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-8 w-8 text-primary" />
                <CardTitle className="text-2xl">The Sharks Team</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                O.C.E.A.N is proudly developed by the <strong className="text-secondary">Sharks Team</strong>,
                a group of passionate developers, designers, and archaeology enthusiasts committed to using
                technology to preserve and share human history.
              </p>
              <p>
                Our diverse team brings together expertise in software development, user experience design,
                and archaeological sciences to create a platform that truly serves the needs of the global
                research community.
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
              "By connecting science, innovation, and culture in one ocean of knowledge, we're not just
              documenting the past — we're preserving it for the future."
            </p>
            <p className="text-sm text-primary mt-4 font-semibold">— The Sharks Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
