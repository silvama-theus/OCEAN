import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Save, Trash2, Eye, FileDown, User } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { MultiSelect } from "@/components/multi-select";
import api from "../services/api";
import { Dialog } from "radix-ui";
import { set } from "date-fns";
import Modal from '@mui/material/Modal';

interface User {
  id: string;
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}



const Dashboard = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    name: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get("/auth", { withCredentials: true });
      setFormData({
        id: response.data.uid,
        email: response.data.email,
        name: response.data.name,
        oldPassword:response.data.olPassword,
        newPassword:response.data.newPassword,
        confirmPassword:response.data.confirmPassword,
      })

    };

  fetchData();

  }, []);
  const formRef = useRef<HTMLDivElement>(null);
  const parseDate = (data: string) => {
    const parts = data.split("-");
    return parts[2].split("T")[0] + "/" + parts[1] + "/" + parts[1];
  };

  const handleSubmit = (async () => {

    const updatedUser: User = {
      ...formData,
    }
    if (updatedUser.newPassword === updatedUser.confirmPassword) {
      const login = await api.put(`/user/${updatedUser.id}`, updatedUser, { withCredentials: true });
      console.log(login)
      if (login.code === 200 || login.code === 201) {
        toast.success("User updated successfully!");
      }
    }



  });

  const handleExport = () => {
    toast.info("Export feature coming soon!");
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center gap-4 mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Painel de <span className="text-primary">controle</span>
            </h1>
            <p className="text-muted-foreground">
              Gerencie usuários e instituições
            </p>
          </div>

        </div>
        {openForm ? (
          <div>
            <Card className="glass-card border-primary/20 animate-fade-in hover:primary">
              <CardContent className="py-20 text-center">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="uid">
                    Id de usuário<span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="uid"
                    required
                    value={formData.id}
                    disabled={true}
                    className="bg-background/50 border-primary/20"
                  />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Nome<span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-background/50 border-primary/20"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email<span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-background/50 border-primary/20"
                      />
                    </div>
                  </div>


                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        Senha antiga <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="oldPassword"
                        type="password"
                        required
                        value={formData.oldPassword}
                        onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                        className="bg-background/50 border-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">
                        Nova senha <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        required
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        className="bg-background/50 border-primary/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirmação senha <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="bg-background/50 border-primary/20"
                      />
                    </div>
                  </div>
                  <div className="grid flex md:grid-cols-2 gap-6">
                    <Button className="secondary" type="button" onClick={() => { setOpenForm(!openForm) }}>Cancelar</Button>
                    <Button className="primary" type="submit">Atualizar dados</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

        ) : (<div>

        </div>
        )
        }
        <div className="grid grid-cols-3">


          <Card onClick={() => { setOpenForm(!openForm) }} className="glass-card border-primary/20 animate-fade-in ">
            <CardContent className="py-20 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary"></User>
                </div>
                <h3 className="text-xl font-semibold"> Minha conta de usuário</h3>
                <p className="text-muted-foreground">
                  Altere suas informações de usuário
                </p>
              </div>
            </CardContent>
          </Card>
          <Link to={"/dashboard/institutes"} key={"/dashboard/institutes"}>
            <Card className="glass-card border-primary/20 animate-fade-in hover:primary">
              <CardContent className="py-20 text-center">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary"></User>
                  </div>
                  <h3 className="text-xl font-semibold"> Gerenciar instituições</h3>
                  <p className="text-muted-foreground">
                    Gerencie as instutuições que você é participa
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Card className="glass-card border-primary/20 animate-fade-in hover:primary">
            <CardContent className="py-20 text-center">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary"></User>
                </div>
                <h3 className="text-xl font-semibold"> Gerenciar acervos</h3>
                <p className="text-muted-foreground">
                  Gerencie as acervos que você é colaborador
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div >
  );
};

export default Dashboard;
