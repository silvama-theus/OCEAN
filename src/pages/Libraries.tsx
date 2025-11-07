import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Package } from "lucide-react";
import { Link } from "react-router-dom";
import '../App.css';
import '../index.css';
import api from "../services/api";

// Mock data - will be replaced with real data later



const Libraries = () => {


  const [libraries, setLibraries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const countries = ["all", ...new Set(libraries.map(lib => lib.country))];
  const filteredLibraries = libraries.filter(library => {
    const matchesSearch = library.name.toLowerCase().includes(searchQuery.toLowerCase()) || library.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCountry = selectedCountry === "all" || library.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const getLibraries = async () => {
    try {
      const response = await api.get("/library");
      console.log(response.data);
      setLibraries(response.data); // Assuming response.data is the array of libraries
    } catch (error) {
      console.error("Error fetching libraries:", error);
    }
  }

  useEffect(() => {
    getLibraries();
  }, []);
  return <div className="min-h-screen py-20">
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore <span className="text-primary">Acervos</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Descubra coleções arqueológicas de instituições e pesquisadores ao redor do mundo
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-6 rounded-2xl mb-12 animate-fade-in">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="ib pesquise acervos e instituições..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-background/50 border-primary/20" />
          </div>

          {/* Country Filter */}
          <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)} className="px-4 py-2 rounded-lg bg-background/50 border border-primary/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            {countries.map(country => <option key={country} value={country}>
              {country === "all" ? "Todos os países" : country}
            </option>)}
          </select>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          <span>{filteredLibraries.length} Acervos encontrados</span>
        </div>
      </div>

      {/* Libraries Grid */}


      {filteredLibraries.length === 0 && <div className="text-center py-20 animate-fade-in">
        <p className="text-lg text-muted-foreground">Acervo não encontrado.</p>
      </div>}

      <div className="grid auto-cols-max grid-flow-row-dense lg:grid-cols-4 sm:grid-cols-2 gap-4">
        {filteredLibraries.length != 0 &&
          filteredLibraries.map((library, index) =>
            <Link to={`/library/${library.id}`} key={library.id} className="w-full">
              <Card className="max-w-sm p-8 hover:bg-sky-700 cursor-pointer" >
                <CardTitle className="mb-6 ">{library.name}</CardTitle>
                <div className="flex justify-center items-center mb-4"><img className="max-w-full h-auto" src={library.imagePath} /></div>
                <CardContent>
                  <div className="items-center gap-2 mb-4">
                    <p className="text-sm font-semibold text-muted-foreground">Instituição</p>
                    <p className="text-sm">{library.Institutes.map((institute) => institute.name)}</p>
                  </div>

                  <div className="items-center gap-2 mb-4">
                    <p className="text-sm font-semibold text-muted-foreground">País</p>
                    <p className="text-sm">{library.country}</p>
                  </div>

                  <div className="items-center gap-2 mb-4">
                    <p className="text-sm font-semibold text-muted-foreground">Quantidade de artefatos:</p>
                    <p className="text-sm">{library.artifactsCount}</p>
                  </div>
                </CardContent>

              </Card>
            </Link>
          )}
      </div>
    </div>
  </div>;
};
export default Libraries;