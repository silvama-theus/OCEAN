import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Package } from "lucide-react";
import { Link } from "react-router-dom";
import '../App.css';
import '../index.css';
import api from "../services/api";
import { get } from "http";

// Mock data - will be replaced with real data later
const artifacts = []
const openArtifact = (artifactId: number) => {
  // Implement navigation to artifact detail page
  console.log("Open artifact with ID:", artifactId);
}
const Artifacts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [artifacts, setArtifacts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("all");
  const countries = ["all", ...new Set(artifacts.map(lib => lib.country))];
  const filteredArtifacts = artifacts.filter(artifact => {
    const matchesSearch = artifact.name.toLowerCase().includes(searchQuery.toLowerCase()) || artifact.description.toLowerCase().includes(searchQuery.toLowerCase()) || (artifact.tags != null ? artifact.tags.toLowerCase().includes(searchQuery.toLowerCase() ): artifact.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCountry = selectedCountry === "all" || artifact.country === selectedCountry;
    return matchesSearch && matchesCountry

  });
  const getArtifacts = async () => {
    try {
      const response = await api.get("/artifact");
      console.log(response.data);
      setArtifacts(response.data);

    } catch (error) {
      console.error("Error fetching artifacts:", error);
    }
  };
  useEffect(() => {
    getArtifacts();

  }, []);
  return <div className="min-h-screen py-20">
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore <span className="text-primary">Artefatos</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Descubra coleções arqueológicas de instituições e pesquisadores ao redor do mundo.
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 rounded-4x4 mb-30 animate-fade-in">
        <div className="grid md:grid-cols-1 gap-95">

          {/* Search */}
          <div className="search-wrap mb-9">
            <Search className="absolute left-25 top-1/4 -translate-y-2/3 h-10 w-5 text-muted-foreground" />
            <Input placeholder=" Pesquise os artefatos por tags (ex:'pré-homérico', 'colonial') ou pelo nome" aria-label="Pesquisar por tag" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-background/50 border-primary/20" />
          </div>
          <div className="Artifacs" id="Artifact.tags"> </div>
          
          {/* Country Filter */}
          <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className="px-2 py-2 rounded-lg bg-background/50 border border-primary/10 text-foreground focus:outline-none focus:ring-9 focus:ring-primary">
            {countries.map(country => <option key={country} value={country}>
              {country === "all" ? "Todos os países" : country}
            </option>)}
          </select>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          <span>{filteredArtifacts.length} Artefatos encontrados</span>
        </div>
      </div>

      {/* Libraries Grid */}


      {filteredArtifacts.length === 0 && <div className="text-center py-20 animate-fade-in">
        <p className="text-lg text-muted-foreground">Artefatos não encontrados</p>
      </div>}

      <div className="grid auto-cols-max grid-flow-row-dense lg:grid-cols-4 sm:grid-cols-2 gap-4">
        {filteredArtifacts.length != 0 &&
          filteredArtifacts.map((artifact, index) => <Link to={`/artifact/${artifact.id}`} key={artifact.id} className="no-underline">
            <Card className="max-w-sm p-8 hover:bg-sky-700 cursor-pointer">
              <CardTitle className="mb-6 ">{artifact.name}</CardTitle>
              <div className="flex justify-center items-center mb-4"><img className="max-w-full h-auto" src={artifact.imagePath} /></div>
              <CardContent>Era: {artifact.age}</CardContent>
              <CardContent>Onde foi encontrado: {artifact.coordinates} | {artifact.foundPlace}</CardContent>
              <CardContent>Tags: {artifact.Tags}</CardContent>
              <CardContent> Utilidade: {artifact.origin_or_utility}</CardContent>
              <CardContent>Encontrado por: {artifact.whoFound}</CardContent>
            </Card>
          </Link>
          )}
      </div>
    </div>
  </div>;
}
export default Artifacts;