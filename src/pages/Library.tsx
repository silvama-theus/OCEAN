import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Package, Eye, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import '../App.css';
import '../index.css';
import api from "../services/api";

// Mock data - will be replaced with real data later

const Library = () => {
  const { id } = useParams();
  const [library, setLibrary] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtifacts = library.Artifacts?.filter(artifact => {
    const matchesSearch = artifact.name.toLowerCase().includes(searchQuery.toLowerCase()) || artifact.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  }) || [];
  const handleDelete = async (id: string) => {
    try {
      //await api.delete(`/library/${id}`);
      // Optionally, you can add code to update the UI after deletion
      console.log("Biblioteca deletada com sucesso");
    } catch (error) {
      console.error("Error deleting library:", error);
    }
  }

  const parseDate = (data) => {
    data = data.split("-")
    return data[2].split("T")[0] + "/" + data[1] + "/" + data[0];
  };

  const getLibrary = async (id: string) => {
    try {
      const response = await api.get(`/library/${id}`);
      console.log(response.data);
      setLibrary(response.data);

    } catch (error) {
      console.error("Error fetching artifact:", error);
    }
  }
  useEffect(() => {
    if (id) getLibrary(id);
  }, [id]);
  return <div className="min-h-screen py-20">
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in backdrop-blur-xl p-6 rounded-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {library.name}
        </h1>
        <hr></hr>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto pt-3">
          {library.city} - {library.state} | {library.country}
        </p>
        <div className="flex justify-center items-center mb-4 pt-4"><img className="max-w-full h-auto" src={library.imagePath} /></div>
      </div>

      {library.Institutes && library.Institutes.map((institute) => {
        return <Card className="p-8 mb-12" key={institute.id}>
          <CardTitle className="mb-6 ">{institute.name}</CardTitle>
          <div className="flex justify-center items-center mb-4"><img className="max-w-full h-auto" src={institute.image} /></div>
          <CardContent>
            <p>País: {institute.country}</p>
            <p>Cidade: {institute.city} - {institute.state}</p>
            <p>Endereço: {institute.address}, {institute.number}</p>
            {institute.Contacts && institute.Contacts.map((contact) => {
              return <p key={contact.id}>{contact.name} | {contact.info}</p>
            }
            )}
          </CardContent>

        </Card>
      })}
      {/* Filters */}
      <div className="glass-card p-6 rounded-2xl mb-12 animate-fade-in">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search libraries or institutions..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-background/50 border-primary/20" />
          </div>

        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          <span>{filteredArtifacts.length} Artifacts found</span>
        </div>
      </div>
      <div className="grid grid-flow-row-dense sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredArtifacts.length != 0 && filteredArtifacts.map((artifact: any, index) => {
          return <Link to={`/artifact/${artifact.id}`} key={artifact.id} className="w-full">
            <Card
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
                      ID: {artifact.identificationNumber} • Added {parseDate(artifact.createdAt)}
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
                <div className="flex justify-center items-center mb-4"><img className="max-w-full h-auto" src={`http://lorempixel.com.br/300/300/${index}`} /></div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">Description</p>
                  <p className="text-sm">{artifact.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Provenance</p>
                    <p className="text-sm">{artifact.coordinates} | {artifact.foundPlace}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Dating</p>
                    <p className="text-sm">{parseDate(artifact.foundDate)}</p>
                  </div>
                </div>
                {library.observations && (
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Observations</p>
                    <p className="text-sm">{library.observations}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>;
        })}
      </div>
    </div>
  </div>;
};
export default Library;