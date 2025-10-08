import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Save, Trash2, Eye, FileDown } from "lucide-react";
import { toast } from "sonner";

interface Artifact {
  id: string;
  identificationNumber: string;
  name: string;
  description: string;
  provenance: string;
  dating: string;
  observations: string;
  createdAt: string;
}

const MyLibrary = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    identificationNumber: "",
    name: "",
    description: "",
    provenance: "",
    dating: "",
    observations: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newArtifact: Artifact = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toLocaleDateString(),
    };

    setArtifacts([newArtifact, ...artifacts]);
    setFormData({
      identificationNumber: "",
      name: "",
      description: "",
      provenance: "",
      dating: "",
      observations: "",
    });
    setIsFormOpen(false);
    
    toast.success("Artifact saved successfully!", {
      description: `${formData.name} has been added to your library.`,
    });
  };

  const handleDelete = (id: string) => {
    setArtifacts(artifacts.filter((a) => a.id !== id));
    toast.success("Artifact deleted");
  };

  const handleExport = () => {
    toast.info("Export feature coming soon!");
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              My <span className="text-primary">Library</span>
            </h1>
            <p className="text-muted-foreground">
              Manage and document your archaeological artifacts
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExport}>
              <FileDown className="h-4 w-4" />
              Export
            </Button>
            <Button variant="hero" onClick={() => setIsFormOpen(!isFormOpen)}>
              <Plus className="h-4 w-4" />
              {isFormOpen ? "Close Form" : "New Artifact"}
            </Button>
          </div>
        </div>

        {/* Add Artifact Form */}
        {isFormOpen && (
          <Card className="glass-card border-primary/20 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle>Add New Artifact</CardTitle>
              <CardDescription>
                Fill in the details below to document a new artifact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Identification Number */}
                  <div className="space-y-2">
                    <Label htmlFor="id-number">
                      Identification Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="id-number"
                      required
                      value={formData.identificationNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, identificationNumber: e.target.value })
                      }
                      placeholder="e.g., AR-2024-001"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Artifact Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Size, shape, material, state of conservation..."
                    rows={4}
                    className="bg-background/50 border-primary/20"
                  />
                </div>

                {/* Provenance */}
                <div className="space-y-2">
                  <Label htmlFor="provenance">
                    Provenance <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="provenance"
                    required
                    value={formData.provenance}
                    onChange={(e) => setFormData({ ...formData, provenance: e.target.value })}
                    placeholder="Excavation site, coordinates, archaeological context..."
                    rows={3}
                    className="bg-background/50 border-primary/20"
                  />
                </div>

                {/* Dating */}
                <div className="space-y-2">
                  <Label htmlFor="dating">
                    Dating <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="dating"
                    required
                    value={formData.dating}
                    onChange={(e) => setFormData({ ...formData, dating: e.target.value })}
                    placeholder="Method used and estimated period"
                    className="bg-background/50 border-primary/20"
                  />
                </div>

                {/* Observations */}
                <div className="space-y-2">
                  <Label htmlFor="observations">Additional Observations</Label>
                  <Textarea
                    id="observations"
                    value={formData.observations}
                    onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                    placeholder="Any additional notes or observations..."
                    rows={3}
                    className="bg-background/50 border-primary/20"
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="hero">
                    <Save className="h-4 w-4" />
                    Save Artifact
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Artifacts List */}
        {artifacts.length === 0 ? (
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardContent className="py-20 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">No artifacts yet</h3>
                <p className="text-muted-foreground">
                  Start documenting your collection by adding your first artifact
                </p>
                <Button variant="hero" onClick={() => setIsFormOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Add First Artifact
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground">
                {artifacts.length} {artifacts.length === 1 ? "artifact" : "artifacts"} in your library
              </p>
            </div>
            
            {artifacts.map((artifact, index) => (
              <Card
                key={artifact.id}
                className="glass-card border-primary/20 hover:border-primary/40 transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {artifact.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        ID: {artifact.identificationNumber} • Added {artifact.createdAt}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(artifact.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Description</p>
                    <p className="text-sm">{artifact.description}</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Provenance</p>
                      <p className="text-sm">{artifact.provenance}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Dating</p>
                      <p className="text-sm">{artifact.dating}</p>
                    </div>
                  </div>
                  {artifact.observations && (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Observations</p>
                      <p className="text-sm">{artifact.observations}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
