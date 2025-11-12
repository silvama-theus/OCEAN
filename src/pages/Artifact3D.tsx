import { useEffect, useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Package, ArrowLeftIcon } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
  model3DPath?: string;
}

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const [gltf, setGltf] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setGltf(null);
    setError(false);

    const loader = new GLTFLoader();
    loader.load(
      url,
      (loaded) => setGltf(loaded),
      undefined,
      (err) => {
        setError(true);
      }
    );
  }, [url]);

  if (error) {
    // Fallback visual em vermelho se o modelo não carregar
    return (
      <Html center>
        <div style={{ color: "red", fontWeight: "bold" }}>Oops! tivemos um pequeno problema ao tentar encontrar o modelo.
          <br></br>Tente novamente em breve</div>
      </Html>
    );
  }

  if (!gltf) {
    // Enquanto carrega, não renderiza nada (Suspense vai mostrar loader)
    return null;
  }

  return <primitive object={gltf.scene} scale={1} />;
}

const Artifact = () => {
  const navigate = useNavigate();

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
        <div className="flex flex-row">
          <div className="flex-none">
            <div onClick={() => { navigate(-2) }} className="w-10 h-10 mx-auto bg-primary/20 rounded-full flex items-center justify-center hover:cursor-pointer">
              <ArrowLeftIcon></ArrowLeftIcon>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex-1 pr-10">
            {artifact.name}
          </h1>
        </div>
      </div>
      <div className="h-dvh border-4 bg-white bg-clip-content rounded-xl border-dashed p-3">
        <Suspense fallback={<div style={{ color: "#fff" }}>Carregando modelo...</div>}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Model url={artifact.model3DPath} />
            <OrbitControls />

          </Canvas>
        </Suspense>
      </div>
      <div className="grid grid-flow-col-dense grid-flow-row-dense sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">

        <Card className="p-8" key={artifact.id}>

          <p>{artifact.description}</p>
          <CardDescription className="space-y-2 p-8 text-justify">
            <p><span className="font-bold">Idade: </span>{artifact.age}</p>
            <p><span className="font-bold">Utilidade:</span> {artifact.origin_or_utility}</p>
            <p><span className="font-bold">Associação histórica:</span> {artifact.historicalPeople}</p>
            <p><span className="font-bold">Peso: </span> {artifact.weight}</p>
            <p><span className="font-bold">Dimensões:</span> {artifact.dimensions}</p>
            <p><span className="font-bold">Composição: </span> {artifact.materialComposition}</p>
            <p><span className="font-bold">Textura:</span> {artifact.texture}</p>
            <p><span className="font-bold">Tags:</span> {artifact.tags ? artifact.tags : "Sem tags definidas"}</p>
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
  </div >;
};
export default Artifact;