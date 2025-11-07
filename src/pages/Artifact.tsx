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

type Contact = {
  id?: string;
  name?: string;
  info?: string;
};

type Institute = {
  id?: string;
  name?: string;
  Contacts?: Contact[];
  address?: string;
  number?: string;
  city?: string;
  state?: string;
  country?: string;
};

type Library = {
  id?: string;
  name?: string;
  country?: string;
  city?: string;
  state?: string;
  Institutes?: Institute[];
};

interface ArtifactType {
  id?: string;
  name?: string;
  description?: string;
  imagePath?: string;
  age?: string;
  historicalPeople?: string;
  origin_or_utility?: string;
  weight?: string;
  dimensions?: string;
  materialComposition?: string;
  texture?: string;
  whoFound?: string;
  Libraries?: Library[];
  tags?: string;
}

const Artifact = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState<ArtifactType>({} as ArtifactType);


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
      </div>

      <div className="grid grid-flow-col-dense grid-flow-row-dense sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">

        <Card className="p-8" key={artifact.id}>
          <div className="flex justify-center items-center mb-4"><img className="max-w-full h-auto" src={artifact.imagePath} /></div>
          <p>{artifact.description}</p>
          <CardDescription className="space-y-2 p-8 text-justify">
            <p><span className="font-bold">Idade: </span>{artifact.age}</p>
            <p><span className="font-bold">Utilidade:</span> {artifact.origin_or_utility}</p>
            <p><span className="font-bold">Associação histórica:</span> {artifact.historicalPeople}</p>
            <p><span className="font-bold">Peso: </span> {artifact.weight}</p>
            <p><span className="font-bold">Dimensões:</span> {artifact.dimensions}</p>
            <p><span className="font-bold">Composição: </span> {artifact.materialComposition}</p>
            <p><span className="font-bold">Textura:</span> {artifact.texture}</p>
            <p><span className="font-bold">Tags:</span> {artifact.tags? artifact.tags : "Sem tags definidas"}</p>
            <CardFooter className="pt-4">Créditos: {artifact.whoFound}</CardFooter>
          </CardDescription>
          <hr></hr>
          <div className="pt-6">
            {artifact.Libraries && artifact.Libraries.map((library: Library) => {
              return <Link to={`/library/${library.id}`} key={library.id}>
                <Card >
                  <div className="hover:bg-sky-700 hover:cursor-pointer rounded-t-md" >
                    <CardTitle className="p-4">Disponível em: {library.name} - {library.country}</CardTitle>


                    <CardContent>{library.city} | {library.state}</CardContent>
                  </div>
                  {library.Institutes?.map((institute: Institute) => {
                    return <div className="rounded-b-md" key={institute.id}>
                      <hr></hr>
                      {
                        <div key={institute.id}>
                          <CardContent className="pt-4">Instituição: {institute.name}</CardContent>
                          {
                            institute.Contacts?.map((contact: Contact, index: number) => {
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