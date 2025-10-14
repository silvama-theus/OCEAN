import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Package } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import '../App.css';
import '../index.css';
import api from "../services/api";

// Mock data - will be replaced with real data later

const Artifact = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState<any>({});


  const getArtifact = async (id: string) => {
    try {
      const response = await api.get(`/artifact/${id}`);
      setArtifact(response.data);

    } catch (error) {
      console.error("Error fetching artifact:", error);
    }
  }
  useEffect(() => {
    if (id) getArtifact(id);
  }, [id]);
  return <div className="min-h-screen py-20">
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {artifact.name}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {artifact.description}
        </p>
      </div>

      <div className="grid grid-flow-col-dense grid-flow-row-dense sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">

        <Card className="p-8" key={artifact.id}>
          <div className="flex justify-center items-center mb-4"><img className="max-w-full h-auto" src={'http://lorempixel.com.br/300/300'} /></div>
          <CardDescription>Era: {artifact.age}</CardDescription>
          <CardDescription>Onde foi encontrado: {artifact.coordinates} | {artifact.foundPlace}</CardDescription>
          <CardDescription>Contexto histórico: {artifact.historicalContext}</CardDescription>
          <CardDescription>Origem ou utilidade: {artifact.origin_or_utility}</CardDescription>
          <CardDescription>Relevância social: {artifact.socialRelevance}</CardDescription>
          <CardDescription>Grupo social: {artifact.historicalPeople}</CardDescription>
          <CardDescription>Peso: {artifact.weight}</CardDescription>
          <CardDescription>Dimensões: {artifact.dimensions}</CardDescription>
          <CardDescription>Composição: {artifact.materiaComposition}</CardDescription>
          <CardDescription>Textura: {artifact.texture}</CardDescription>
          <CardFooter className="pt-4">Créditos: {artifact.whoFound}</CardFooter>
          <hr></hr>
          <div className="pt-6">
            {artifact.Libraries && artifact.Libraries.map((library: any) => {
              return <Link to={`/library/${library.id}`} key={library.id}>
                <Card >
                  <div className="hover:bg-sky-700 hover:cursor-pointer rounded-t-md" >
                    <CardTitle className="p-4">Disponível em: {library.name} - {library.country}</CardTitle>


                    <CardContent>{library.city} | {library.state}</CardContent>
                  </div>
                  {library.Institutes.map((institute: any) => {
                    return <div className="rounded-b-md" key={institute.id}>
                      <hr></hr>
                      {
                        <div key={institute.id}>
                          <CardContent className="pt-4">Instituição: {institute.name}</CardContent>
                          {
                            institute.Contacts && institute.Contacts.map((contact: any, index: number) => {
                              return <CardContent key={contact.id}>{contact.name}:{contact.info}</CardContent>
                            })
                          }
                        </div>

                      }



                      <CardContent>{institute.address}, {institute.number}, {institute.city} - {institute.state} | {institute.country}</CardContent>

                    </div>
                  })}
                </Card>

              </Link>
            }
            )}

          </div>
        </Card>

      </div>
    </div>
  </div>;
};
export default Artifact;