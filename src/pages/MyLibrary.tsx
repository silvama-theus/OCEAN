<<<<<<< HEAD
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
=======
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
>>>>>>> 1f82535 (update 14-10-2025)
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Save, Trash2, Eye, FileDown } from "lucide-react";
import { toast } from "sonner";
<<<<<<< HEAD

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
=======
import { Link } from "react-router-dom";
import api from "../services/api"

interface Library {
  id: string;
  vid: string;
  name: string;
  description: string;
  city: string;
  state: string;
  country: string;
  private: boolean;
  imagePath: string;
  createdAt: string;
}
interface Artifact {
  id: string,
  vid: string,
  name: string,
  description: string,
  imagePath: string,
  foundPlace: string,
  age: string,
  historicalContext: string,
  whoFound: string,
  coordinates: string,
  dimensions: string,
  weight: string,
  texture: string,
  materialComposition: string,
  historicalPeople: string,
  origin_or_utility: string,
  socialRelevance: string,
  foundDate: string,
  createdAt: string,
}

const MyLibrary = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [libraries, setLibraries] = useState<Library[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isFormLOpen, setIsFormLOpen] = useState(false);
  const [isFormAOpen, setIsFormAOpen] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isUpdateAData, setIsUpdateAData] = useState(false);
  const [formLData, setFormLData] = useState({
    vid: "",
    name: "",
    description: "",
    city: "",
    state: "",
    country: "",
    private: false,
    imagePath: "",
    createdAt: "",
  });

  const [formAData, setFormAData] = useState({
    id: "",
    vid: "",
    name: "",
    description: "",
    imagePath: "",
    foundPlace: "",
    age: "",
    historicalContext: "",
    whoFound: "",
    coordinates: "",
    dimensions: "",
    weight: "",
    texture: "",
    materialComposition: "",
    historicalPeople: "",
    origin_or_utility: "",
    socialRelevance: "",
    foundDate: "",
    createdAt: "",
  });
  useEffect(() => {
  const fetchLibraries = async () => {
    try {
      const response = await api.get('/library/myLibraries', { withCredentials: true });
      console.log(response.data)
      setLibraries(response.data);
    } catch (error) {
      console.error("Erro ao buscar bibliotecas:", error);
      toast.error("Erro ao carregar suas bibliotecas.");
    } finally {
      setIsLoading(false);
    }
  };

  fetchLibraries();
}, []);
  const formRef = useRef<HTMLDivElement>(null);
  const parseDate = (data: any) => {
    data = data.split("-");
    return data[2].split("T")[0] + "/" + data[1] + "/" + data[0];
  };
  const newLibrary = (() => {
    setIsFormLOpen(true); // abre o formulário
    setIsUpdateData(false); // modo criação

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100); // pequeno delay para garantir que a div já esteja montada

  });

  const newArtifact = (() => {
    setIsFormAOpen(true); // abre o formulário
    setIsUpdateAData(false); // modo criação

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100); // pequeno delay para garantir que a div já esteja montada

  });

  const changeLibrary = ((id) => {
    const library = libraries.find(library => library.vid === id);
    setFormLData({
      vid: library.vid,
      name: library.name,
      description: library.description,
      city: library.city,
      state: library.state,
      country: library.country,
      private: library.private,
      imagePath: library.imagePath,
      createdAt: library.createdAt,
    });
    setIsUpdateData(true)
    setIsFormLOpen(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100); // pequeno delay para garantir que a div já esteja montada
  });

  const updateLibrary = (() => {
    const updatedLibraries = libraries.map((lib) =>
      lib.vid === formLData.vid ? { ...lib, ...formLData } : lib
    );

    setLibraries(updatedLibraries);
    setIsFormLOpen(false);
    setIsUpdateData(false);
    toast.success("Library updated successfully!");

    setFormLData({
      vid: "",
      name: "",
      description: "",
      city: "",
      state: "",
      country: "",
      private: false,
      imagePath: "",
      createdAt: "",
    });
  })

  const updateArtifact = (() => {
    const updatedArtifacts = artifacts.map((artifact) =>
      artifact.vid === formAData.vid ? { ...artifact, ...formAData } : artifact
    );

    setArtifacts(updatedArtifacts);
    setIsFormLOpen(false);
    setIsUpdateData(false);
    toast.success("Library updated successfully!");

    setFormAData({
      id: "",
      vid: "",
      name: "",
      description: "",
      imagePath: "",
      foundPlace: "",
      age: "",
      historicalContext: "",
      whoFound: "",
      coordinates: "",
      dimensions: "",
      weight: "",
      texture: "",
      materialComposition: "",
      historicalPeople: "",
      origin_or_utility: "",
      socialRelevance: "",
      foundDate: "",
      createdAt: "",
    });
  })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLibrary: Library = {
      id: Date.now().toString(),
      ...formLData,
      createdAt: "2025-10-13 04:47:16Tblablabla"
    };

    // const newArtifact: Artifact = {
    //   id: Date.now().toString(),
    //   ...formLData
    // };

    setLibraries([newLibrary, ...libraries]);
    setFormLData({
      vid: "",
      name: "",
      description: "",
      city: "",
      state: "",
      country: "",
      private: false,
      imagePath: "",
      createdAt: "",
    });
    setIsFormLOpen(false);

    toast.success("Artifact saved successfully!", {
      description: `${formLData.name} has been added to your library.`,
>>>>>>> 1f82535 (update 14-10-2025)
    });
  };

  const handleDelete = (id: string) => {
<<<<<<< HEAD
    setArtifacts(artifacts.filter((a) => a.id !== id));
    toast.success("Artifact deleted");
=======
    setLibraries(libraries.filter((a) => a.id !== id));
    toast.success("Library deleted");
>>>>>>> 1f82535 (update 14-10-2025)
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
<<<<<<< HEAD
            <Button variant="hero" onClick={() => setIsFormOpen(!isFormOpen)}>
              <Plus className="h-4 w-4" />
              {isFormOpen ? "Close Form" : "New Artifact"}
=======
            <Button variant="hero" onClick={newLibrary}>
              <Plus className="h-4 w-4" />
              {isFormLOpen ? "Close Form" : "New Library"}
>>>>>>> 1f82535 (update 14-10-2025)
            </Button>
          </div>
        </div>

<<<<<<< HEAD
        {/* Add Artifact Form */}
        {isFormOpen && (
          <Card className="glass-card border-primary/20 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle>Add New Artifact</CardTitle>
              <CardDescription>
                Fill in the details below to document a new artifact
=======
        {/* Add Library Form */}
        {isFormLOpen && (
          <Card ref={formRef} className="glass-card border-primary/20 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle>Add New Library</CardTitle>
              <CardDescription>
                Fill in the details below to document a new library artifact
>>>>>>> 1f82535 (update 14-10-2025)
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
<<<<<<< HEAD
                      value={formData.identificationNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, identificationNumber: e.target.value })
=======
                      value={formLData.vid}
                      onChange={(e) =>
                        setFormLData({ ...formLData, vid: e.target.value })
>>>>>>> 1f82535 (update 14-10-2025)
                      }
                      placeholder="e.g., AR-2024-001"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
<<<<<<< HEAD
                      Artifact Name <span className="text-destructive">*</span>
=======
                      Library Name <span className="text-destructive">*</span>
>>>>>>> 1f82535 (update 14-10-2025)
                    </Label>
                    <Input
                      id="name"
                      required
<<<<<<< HEAD
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
=======
                      value={formLData.name}
                      onChange={(e) => setFormLData({ ...formLData, name: e.target.value })}
>>>>>>> 1f82535 (update 14-10-2025)
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
<<<<<<< HEAD
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
=======
                    value={formLData.description}
                    onChange={(e) => setFormLData({ ...formLData, description: e.target.value })}
>>>>>>> 1f82535 (update 14-10-2025)
                    placeholder="Size, shape, material, state of conservation..."
                    rows={4}
                    className="bg-background/50 border-primary/20"
                  />
                </div>
<<<<<<< HEAD

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
=======
                <div className="grid md:grid-cols-3 gap-6">
                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      required
                      value={formLData.city}
                      onChange={(e) => setFormLData({ ...formLData, city: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  {/* State */}
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="state"
                      required
                      value={formLData.state}
                      onChange={(e) => setFormLData({ ...formLData, state: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      Country <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="country"
                      required
                      value={formLData.country}
                      onChange={(e) => setFormLData({ ...formLData, country: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 content-center">

                  {/* Image */}
                  <div className="space-y-2 flex items-center justify-center col-span-2">
                    <Label htmlFor="image" className="pt-2 pr-3">Image</Label>
                    <Input
                      id="image"
                      value={formLData.imagePath}
                      onChange={(e) => setFormLData({ ...formLData, imagePath: e.target.value })}
                      placeholder="Add image..."
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  {/* Private */}
                  <div className="space-y-2 flex items-center justify-center">
                    <Label className="pr-3 pt-2" htmlFor="private">
                      Private
                    </Label>
                    <Switch
                      id="private"
                      checked={formLData.private}
                      onCheckedChange={(checked) => setFormLData({ ...formLData, private: checked })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>


                </div>
                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsFormLOpen(false)}>
                    Cancel
                  </Button>
                  {!isUpdateData ?
                    <Button type="submit" variant="hero">
                      <Save className="h-4 w-4" />
                      Create Library
                    </Button>
                    :
                    <Button variant="hero" type="button" onClick={updateLibrary}>
                      <Save className="h-4 w-4" />
                      Update Library
                    </Button>
                  }
>>>>>>> 1f82535 (update 14-10-2025)
                </div>
              </form>
            </CardContent>
          </Card>
        )}

<<<<<<< HEAD
        {/* Artifacts List */}
        {artifacts.length === 0 ? (
=======
        {/* Add Artifact Form */}
        {isFormAOpen && (
          <Card ref={formRef} className="glass-card border-primary/20 mb-8 animate-fade-in">
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
                    <Input id="id-number" required value={formAData.vid} onChange={(e) =>
                      setFormAData({ ...formAData, vid: e.target.value })
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
                    <Input id="name" required value={formAData.name} onChange={(e) => setFormAData({
                      ...formAData, name:
                        e.target.value
                    })}
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
                  <Textarea id="description" required value={formAData.description} onChange={(e) => setFormAData({ ...formAData, description: e.target.value })}
                    placeholder="Size, shape, material, state of conservation..."
                    rows={4}
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="age">
                      Age <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="age"
                      required
                      value={formAData.age}
                      onChange={(e) => setFormAData({ ...formAData, age: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  {/* Found Place */}
                  <div className="space-y-2">
                    <Label htmlFor="foundPlace">
                      Where were found <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="foundPlace"
                      required
                      value={formAData.foundPlace}
                      onChange={(e) => setFormAData({ ...formAData, foundPlace: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  {/* Coordinates */}
                  <div className="space-y-2">
                    <Label htmlFor="coordinates">
                      Coordinates where were found <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="coordinates"
                      required
                      value={formAData.coordinates}
                      onChange={(e) => setFormAData({ ...formAData, coordinates: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>


                </div>
                <div className="grid md:grid-cols-3 gap-6 content-center">
                  {/* Historical context */}
                  <div className="space-y-2">
                    <Label htmlFor="historicalContext">
                      Historical context <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="historicalContext"
                      required
                      value={formAData.historicalContext}
                      onChange={(e) => setFormAData({ ...formAData, historicalContext: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  {/* Origin or Utility */}
                  <div className="space-y-2">
                    <Label htmlFor="origin_or_utility">
                      Origin or Utility <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="origin_or_utility"
                      required
                      value={formAData.origin_or_utility}
                      onChange={(e) => setFormAData({ ...formAData, origin_or_utility: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  {/* Social Relevance */}
                  <div className="space-y-2">
                    <Label htmlFor="socialRelevance">
                      Social relevance <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="socialRelevance"
                      required
                      value={formAData.socialRelevance}
                      onChange={(e) => setFormAData({ ...formAData, socialRelevance: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 content-center">
                  {/* Social group */}
                  <div className="space-y-2">
                    <Label htmlFor="historicalPeople">
                      Social group <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="historicalPeople"
                      required
                      value={formAData.historicalPeople}
                      onChange={(e) => setFormAData({ ...formAData, historicalPeople: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  {/* Weight */}
                  <div className="space-y-2">
                    <Label htmlFor="weight">
                      Weight <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="weight"
                      required
                      value={formAData.weight}
                      onChange={(e) => setFormAData({ ...formAData, weight: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  {/* Dimensions */}
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">
                      Dimensions <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="dimensions"
                      required
                      value={formAData.dimensions}
                      onChange={(e) => setFormAData({ ...formAData, dimensions: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 content-center">
                  {/* Composition */}
                  <div className="space-y-2">
                    <Label htmlFor="materialComposition">
                      Composition <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="materialComposition"
                      required
                      value={formAData.materialComposition}
                      onChange={(e) => setFormAData({ ...formAData, materialComposition: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  {/* Texture */}
                  <div className="space-y-2">
                    <Label htmlFor="texture">
                      Texture <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="texture"
                      required
                      value={formAData.texture}
                      onChange={(e) => setFormAData({ ...formAData, texture: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  {/* Who found */}
                  <div className="space-y-2">
                    <Label htmlFor="whoFound">
                      Who found <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="whoFound"
                      required
                      value={formAData.whoFound}
                      onChange={(e) => setFormAData({ ...formAData, whoFound: e.target.value })}
                      placeholder="e.g., Ceramic Bowl"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 content-center">

                  {/* Image */}
                  <div className="space-y-2 flex items-center justify-center col-span-2">
                    <Label htmlFor="image" className="pt-2 pr-3">Image</Label>
                    <Input
                      id="image"
                      value={formAData.imagePath}
                      onChange={(e) => setFormAData({ ...formAData, imagePath: e.target.value })}
                      placeholder="Add image..."
                      className="bg-background/50 border-primary/20"
                    />
                  </div>




                </div>
                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsFormAOpen(false)}>
                    Cancel
                  </Button>
                  {!isUpdateData ?
                    <Button type="submit" variant="hero">
                      <Save className="h-4 w-4" />
                      Create Artifact
                    </Button>
                    :
                    <Button variant="hero" type="button" onClick={updateArtifact}>
                      <Save className="h-4 w-4" />
                      Update Artifact
                    </Button>
                  }
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Library List */}
        {libraries.length === 0 ? (
>>>>>>> 1f82535 (update 14-10-2025)
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardContent className="py-20 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
<<<<<<< HEAD
                <h3 className="text-xl font-semibold">No artifacts yet</h3>
                <p className="text-muted-foreground">
                  Start documenting your collection by adding your first artifact
                </p>
                <Button variant="hero" onClick={() => setIsFormOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Add First Artifact
=======
                <h3 className="text-xl font-semibold">No libraries yet</h3>
                <p className="text-muted-foreground">
                  Start documenting your collection by adding your first library
                </p>
                <Button variant="hero" onClick={() => setIsFormLOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Add First Library
>>>>>>> 1f82535 (update 14-10-2025)
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground">
<<<<<<< HEAD
                {artifacts.length} {artifacts.length === 1 ? "artifact" : "artifacts"} in your library
              </p>
            </div>
            
            {artifacts.map((artifact, index) => (
              <Card
                key={artifact.id}
=======
                {libraries.length} {libraries.length === 1 ? "library" : "libraries"} in your account
              </p>
            </div>

            {libraries.map((library, index) => (
              <Card
                key={library.id}
>>>>>>> 1f82535 (update 14-10-2025)
                className="glass-card border-primary/20 hover:border-primary/40 transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
<<<<<<< HEAD
                        {artifact.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        ID: {artifact.identificationNumber} • Added {artifact.createdAt}
=======
                        {library.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        ID: {library.vid} • Added {parseDate(library.createdAt)}
>>>>>>> 1f82535 (update 14-10-2025)
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
<<<<<<< HEAD
                        onClick={() => handleDelete(artifact.id)}
=======
                        onClick={() => handleDelete(library.id)}
>>>>>>> 1f82535 (update 14-10-2025)
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
<<<<<<< HEAD
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
=======
                  <div className="flex justify-center items-center mb-4 pt-4"><img className="max-w-full h-auto" src={`http://lorempixel.com.br/600/320/${library.id}`} /></div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Description</p>
                    <p className="text-sm">{library.description}</p>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">City</p>
                      <p className="text-sm">{library.city}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">State</p>
                      <p className="text-sm">{library.state}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Country</p>
                      <p className="text-sm">{library.country}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Private</p>
                      <p className="text-sm">{library.private ? "Sim" : "Não"}</p>
                    </div>
                  </div>

                  <div className="cols-span-2">
                    <Link to={`/library/${library.id}`}><Button variant="default" className="m-4">Show artifacts</Button></Link>
                    <Button variant="default" className="m-4" onClick={() => changeLibrary(library.vid)}>Change library</Button>
                    <Button variant="default" className="m-4" onClick={newArtifact}>Add artifact</Button>
                  </div>


>>>>>>> 1f82535 (update 14-10-2025)
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
<<<<<<< HEAD
    </div>
=======
    </div >
>>>>>>> 1f82535 (update 14-10-2025)
  );
};

export default MyLibrary;
