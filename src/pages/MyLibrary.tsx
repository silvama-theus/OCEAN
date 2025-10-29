import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Save, Trash2, Eye, FileDown } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { MultiSelect } from "@/components/multi-select";
import api from "../services/api"
import { set } from "date-fns";

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
  myInstitutes: string[];
  inviteInstitutes: string[];
  Institutes: { id: string; name: string }[];
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
  const [selectedMyInstitutes, setSelectedMyInstitutes] = useState<string[]>([]);
  const [selectedInstitutes, setSelectedInstitutes] = useState<string[]>([]);
  const [selectedInstitutesOptions, setSelectedInstitutesOptions] = useState<{ value: string; label: string }[]>([]);
  const [institutesMyOptions, setInstitutesMyOptions] = useState<{ value: string; label: string }[]>([]);
  const [selectedInviteInstitutes, setSelectedInviteInstitutes] = useState<string[]>([]);
  const [institutesInviteOptions, setInstitutesInviteOptions] = useState<{ value: string; label: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormLOpen, setIsFormLOpen] = useState(false);
  const [isFormAOpen, setIsFormAOpen] = useState(false);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [isUpdateAData, setIsUpdateAData] = useState(false);
  const [selectedLibraryId, setSelectedLibraryId] = useState<string | null>(null);
  const [formLData, setFormLData] = useState({
    id: "",
    vid: "",
    name: "",
    description: "",
    city: "",
    state: "",
    country: "",
    private: false,
    imagePath: "",
    createdAt: "",
    myInstitutes: [],
    inviteInstitutes: []

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
    const fetchData = async () => {
      try {
        const response = await api.get('/library/myLibraries', { withCredentials: true });
        console.log(response.data)
        setLibraries(response.data.libraries);
        (() => {
          interface Institute {
            id: string;
            name: string;
          }
          const myInstitutesOptions = response.data.myInstitutes.map((institute: Institute) => ({
            value: institute.id,
            label: institute.name,
          }));
          setInstitutesMyOptions(myInstitutesOptions);

          const inviteInstitutesOptions = response.data.inviteInstitutes.map((institute: { id: string; name: string }) => ({
            value: institute.id,
            label: institute.name,
          }));
          setInstitutesInviteOptions(inviteInstitutesOptions);
        })();
      } catch (error) {
        console.error("Erro ao buscar bibliotecas:", error);
        toast.error("Erro ao carregar suas bibliotecas.");
      } finally {
        setIsLoading(false);
      }
    };



    fetchData();
  }, []);
  const formRef = useRef<HTMLDivElement>(null);
  const parseDate = (data: string) => {
    const parts = data.split("-");
    return parts[2].split("T")[0] + "/" + parts[1] + "/" + parts[0];
  };
  const newLibrary = (() => {
    setIsFormLOpen(true); // abre o formulário
    setIsUpdateData(false); // modo criação

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100); // pequeno delay para garantir que a div já esteja montada

  });

  const newArtifact = ((idLibrary) => {
    setSelectedLibraryId(idLibrary);
    setIsFormAOpen(true); // abre o formulário
    setIsUpdateAData(false); // modo criação
    console.log("Selected Library ID:", idLibrary);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100); // pequeno delay para garantir que a div já esteja montada

  });


  const changeLibrary = ((id) => {
    const library = libraries.find(library => library.id === id);
    const myInstitutes = library?.myInstitutes || [];
    const inviteInstitutes = library?.inviteInstitutes || [];
    const selectedInstitutes = library?.Institutes.map((library => {
      return {
        value: library.id,
        label: library.name,
      }
    })
    );
    setSelectedInstitutesOptions(selectedInstitutes || []);

    const selectedInstituteString = selectedInstitutes?.map((institute) => institute.value) || [];
    setSelectedInstitutes(selectedInstituteString);

    setFormLData({
      id: id,
      vid: library.vid,
      name: library.name,
      description: library.description,
      city: library.city,
      state: library.state,
      country: library.country,
      private: library.private,
      imagePath: library.imagePath,
      createdAt: library.createdAt,
      myInstitutes: myInstitutes,
      inviteInstitutes: inviteInstitutes
    });
    setIsUpdateData(true)
    setIsFormLOpen(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100); // pequeno delay para garantir que a div já esteja montada
  });

  const updateLibrary = (async () => {
    const updatedLibrary: Library = {
      ...formLData,
      myInstitutes: selectedMyInstitutes,
      inviteInstitutes: selectedInviteInstitutes,
      Institutes: selectedInstitutes.map(id => {
        const institute = selectedInstitutesOptions.find(opt => opt.value === id);
        return { id, name: institute ? institute.label : "" };
      })
    }

    // const updatedLibraries = libraries.map((library) =>
    //   library.vid === formLData.vid ? {
    //     ...library, ...formLData,
    //     myInstitutes: selectedMyInstitutes,
    //     inviteInstitutes: selectedInviteInstitutes
    //   } : library
    // );
    console.log(updatedLibrary)
    //setLibraries(updatedLibraries);
    setIsFormLOpen(false);
    setIsUpdateData(false);
    await api.put(`/library/${formLData.id}`, updatedLibrary, { withCredentials: true }).then((response) => {
      if (response.code === 200) {
        toast.success("Library updated successfully!", {
          description: `${formLData.name} has been updated.`,
        }
        );
      } else if (response.code === 400) {
        toast.error("Failed to update library!", {
          description: "Please check your data and try again.",
        });
      } else if (response.code === 500) {
        toast.error("Server error!", {
          description: "Please try again later.",
        });
      } else if (response.code === 403) {
        toast.error("Unauthorized!", {
          description: "You don't have permission to update this library.",
        });
      }
    });

    setFormLData({
      id: "",
      vid: "",
      name: "",
      description: "",
      city: "",
      state: "",
      country: "",
      private: false,
      imagePath: "",
      createdAt: "",
      myInstitutes: [],
      inviteInstitutes: []
    });
  })

  const updateArtifact = (() => {
    const updatedArtifacts = artifacts.map((artifact) =>
      artifact.vid === formAData.vid ? { ...artifact, ...formAData } : artifact
    );

    setArtifacts(updatedArtifacts);
    setIsFormLOpen(false);
    setIsUpdateData(false);
    toast.success("Artifact updated successfully!");

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
  });
  const handleLSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    const newLibrary: Library = {
      id: "",
      ...formLData,
      myInstitutes: selectedMyInstitutes,
      inviteInstitutes: selectedInviteInstitutes,
      Institutes: []
    };
    await api.post('/library', newLibrary, { withCredentials: true }).then((response) => {
      if (response.code === 200) {
        // Optionally handle success here if needed
      }
      setFormLData({
        id: "",
        vid: "",
        name: "",
        description: "",
        city: "",
        state: "",
        country: "",
        private: false,
        imagePath: "",
        createdAt: "",
        myInstitutes: [],
        inviteInstitutes: [],
      });
      setIsFormLOpen(false);
      toast.success("Library saved successfully!", {
        description: `${formLData.name} has been added to your libraries.`,
      });
    }).catch((error) => {
      console.error("There was an error!", error);
      toast.error("Failed to save library!", {
        description: "Please check your data and try again.",
      });
    });



  };
  const handleASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newArtifact: Artifact = {
      id:selectedLibraryId,
      ...formAData
    };
    await api.post('/artifact', newArtifact, { withCredentials: true }).then((response) => {
      if (response.code === 201) {
        toast.success("Artifact saved successfully!", {
          description: `${formLData.name} has been added to your library.`,
        });
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
        setIsFormLOpen(false);
      }
    }).catch((error) => {
      console.error("There was an error!", error);
      toast.error("Failed to save artifact!", {
        description: "Please check your data and try again.",
      });
    });
  };

  const handleDelete = (id: string) => {
    setLibraries(libraries.filter((a) => a.id !== id));
    toast.success("Library deleted");
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
              Minha <span className="text-primary">Biblioteca</span>
            </h1>
            <p className="text-muted-foreground">
              Gerencie e documente seus artefatos arqueológicos
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExport}>
              <FileDown className="h-4 w-4" />
              Export
            </Button>
            <Button variant="hero" onClick={newLibrary}>
              <Plus className="h-4 w-4" />
              {isFormLOpen ? "Close Form" : "New Library"}
            </Button>
    </div>
      </div>

        {/* Add Library Form */}
        {isFormLOpen && (
          <Card ref={formRef} className="glass-card border-primary/20 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle>Adicionar nova biblioteca</CardTitle>
              <CardDescription>
                Fill in the details below to document a new library artifact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Identification Number */}
                  <div className="space-y-2">
                  <Label htmlFor="id-number">
                  Número de identificação <span className="text-destructive">*</span>
                  </Label>
  <Input
    id="id-number"
    required
    value={formLData.vid}
    onChange={(e) =>
      setFormLData({ ...formLData, vid: e.target.value })
    }
    placeholder="e.g., AR-2024-001"
    className="bg-background/50 border-primary/20"
  />
</div>

  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Nome da biblioteca <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formLData.name}
                      onChange={(e) => setFormLData({ ...formLData, name: e.target.value })}
                      className="bg-background/50 border-primary/20"
                   />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Descrição <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    required
                    value={formLData.description}
                    onChange={(e) => setFormLData({ ...formLData, description: e.target.value })}
                    placeholder="Escreva sua tag"
                    rows={4}
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* City */}
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      Cidade <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      required
                      value={formLData.city}
                      onChange={(e) => setFormLData({ ...formLData, city: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  {/* State */}
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      Estado <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="state"
                      required
                      value={formLData.state}
                      onChange={(e) => setFormLData({ ...formLData, state: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  {/* Country */}
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      País <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="country"
                      required
                      value={formLData.country}
                      onChange={(e) => setFormLData({ ...formLData, country: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 content-center">

                  {/* Image */}
                  <div className="space-y-2 flex items-center justify-center col-span-2">
                    <Label htmlFor="image" className="pt-2 pr-3">Imagem</Label>
                    <Input
                      id="image"
                      value={formLData.imagePath}
                      onChange={(e) => setFormLData({ ...formLData, imagePath: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  {/* Private */}
                  <div className="space-y-2 flex items-center justify-center">
                    <Label className="pr-3 pt-2" htmlFor="private">
                      Privado
                    </Label>
                    <Switch
                      id="private"
                      checked={formLData.private}
                      onCheckedChange={(checked) => setFormLData({ ...formLData, private: checked })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                </div>
                <div className="grid md:grid-cols-3 gap-6 content-center">
                  {/*Selected Institutes */}
                  <div className="space-y-2 flex items-center justify-center col-span-2">
                    <Label htmlFor="institutes" className="pt-2 pr-3">Selected Institutes</Label>


                    <MultiSelect
                      options={selectedInstitutesOptions}
                      onValueChange={setSelectedMyInstitutes}
                      defaultValue={selectedInstitutes}
                      //disabled={true}
                      unselectable="off"
                      hideSelectAll={true}
                      searchable={false}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 content-center">

                  {/*My Institutes */}
                  <div className="space-y-2 flex items-center justify-center col-span-2">
                    <Label htmlFor="institutes" className="pt-2 pr-3">Minhas instituições</Label>


                    <MultiSelect
                      options={institutesMyOptions}
                      onValueChange={setSelectedMyInstitutes}
                      defaultValue={selectedMyInstitutes}
                    />
                  </div>
                  {/*Invite Institutes */}
                  <div className="space-y-2 flex items-center justify-center col-span-2">
                    <Label htmlFor="institutes" className="pt-2 pr-3">Convidar instituições</Label>


                    <MultiSelect
                      options={institutesInviteOptions}
                      onValueChange={setSelectedInviteInstitutes}
                      defaultValue={selectedInviteInstitutes}
                    />
                  </div>


                </div>
                <div className="flex gap-3 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsFormLOpen(false)}>
                    Cancelar
                  </Button>
                  {!isUpdateData ? (
                    <Button type="submit" variant="hero">
                      <Save className="h-4 w-4" />
                      Criar Biblioteca
                    </Button>
                  ) : null}
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Add Artifact Form */}
        {isFormAOpen && (
          <Card ref={formRef} className="glass-card border-primary/20 mb-8 animate-fade-in">
            <CardHeader>
              <CardTitle>Adicionar novo artefato</CardTitle>
              <CardDescription>
                Fill in the details below to document a new artifact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleASubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Identification Number */}
                  <div className="space-y-2">
                    <Label htmlFor="id-number">
                      Número de indentificação <span className="text-destructive">*</span>
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
                      Nome do artefato <span className="text-destructive">*</span>
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
                    Descrição <span className="text-destructive">*</span>
                  </Label>
                  <Textarea id="description" required value={formAData.description} onChange={(e) => setFormAData({ ...formAData, description: e.target.value })}
                    placeholder="Size, shape, material, state of conservation..."
                    rows={4}
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <div className ="grid md:grid-cols-3 gap-6 content-center">
                  {/* Found Place */}
                  <div className="space-y-2">
                    <Label htmlFor="foundPlace">
                      Onde foi encontrado <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="foundPlace"
                      required
                      value={formAData.foundPlace}
                      onChange={(e) => setFormAData({ ...formAData, foundPlace: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 content-center">
                  {/* Historical context */}
                  <div className="space-y-2">
                    <Label htmlFor="historicalContext">
                      Associação Cultural<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="historicalContext"
                      required
                      value={formAData.historicalContext}
                      onChange={(e) => setFormAData({ ...formAData, historicalContext: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  {/* Origin or Utility */}
                  <div className="space-y-2">
                    <Label htmlFor="origin_or_utility">
                      Utilidade <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="origin_or_utility"
                      required
                      value={formAData.origin_or_utility}
                      onChange={(e) => setFormAData({ ...formAData, origin_or_utility: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  {/* Social Relevance */}
                  <div className="space-y-2">
                    <Label htmlFor="socialRelevance">
                      Relevância social <span className="text-destructive">*</span>
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
               
                <div className ="grid md:grid-cols-3 gap-6 content-center">
                  {/* Weight */}
                  <div className="space-y-2">
                    <Label htmlFor="weight">
                      Peso <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="weight"
                      required
                      value={formAData.weight}
                      onChange={(e) => setFormAData({ ...formAData, weight: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  {/* Dimensions */}
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">
                      Dimensões <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="dimensions"
                      required
                      value={formAData.dimensions}
                      onChange={(e) => setFormAData({ ...formAData, dimensions: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 content-center">
                  {/* Composition */}
                  <div className="space-y-2">
                    <Label htmlFor="materialComposition">
                      Composição<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="materialComposition"
                      required
                      value={formAData.materialComposition}
                      onChange={(e) => setFormAData({ ...formAData, materialComposition: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>

                  {/* Texture */}
                  <div className="space-y-2">
                    <Label htmlFor="texture">
                      Textura <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="texture"
                      required
                      value={formAData.texture}
                      onChange={(e) => setFormAData({ ...formAData, texture: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  {/* Who found */}
                  <div className="space-y-2">
                    <Label htmlFor="whoFound">
                      Quem encontrou <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="whoFound"
                      required
                      value={formAData.whoFound}
                      onChange={(e) => setFormAData({ ...formAData, whoFound: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 content-center">
                  
                  {/* Tags */}
                  <div className="space-y-2">
                    <Label htmlFor="materialComposition">
                      Tags<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="materialComposition"
                      required
                      value={formAData.materialComposition}
                      onChange={(e) => setFormAData({ ...formAData, materialComposition: e.target.value })}
                      placeholder="Coloque as palavras chaves aqui"
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  
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
          <Card className="glass-card border-primary/20 animate-fade-in">
            <CardContent className="py-20 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold"> Sem bibliotecas ainda</h3>
                <p className="text-muted-foreground">
                  Comece documentando sua coleção criando sua primeira biblioteca
                </p>
                <Button variant="hero" onClick={() => setIsFormLOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Adicionar primeira biblioteca
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-muted-foreground">
                {libraries.length} {libraries.length === 1 ? "library" : "libraries"} in your account
              </p>
            </div>

            {libraries.map((library, index) => (
              <Card
                key={library.id}
                className="glass-card border-primary/20 hover:border-primary/40 transition-all group animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {library.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        ID: {library.vid} • Added {parseDate(library.createdAt)}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(library.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-center items-center mb-4 pt-4"><img className="max-w-full h-auto" src={library.imagePath} /></div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Descrição</p>
                    <p className="text-sm">{library.description}</p>
                  </div>
                  <div className="grid md:grid-cols-4 gap-3">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Cidade</p>
                      <p className="text-sm">{library.city}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Estado</p>
                      <p className="text-sm">{library.state}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">País</p>
                      <p className="text-sm">{library.country}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Privado</p>
                      <p className="text-sm">{library.private ? "Sim" : "Não"}</p>
                    </div>
                  </div>

                  <div className="cols-span-2">
                    <Link to={`/library/${library.id}`}><Button variant="default" className="m-4">Mostre artefatos</Button></Link>
                    <Button variant="default" className="m-4" onClick={() => changeLibrary(library.vid)}>Mudar biblioteca</Button>
                    <Button variant="default" className="m-4" onClick={() => newArtifact(library.id)}>Adicionar artefato</Button>
                  </div>


                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div >
  );
};

export default MyLibrary;
