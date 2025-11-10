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

interface Institute {
  id: string;
  vid: string;
  name: string;
  country: string;
  state: string;
  city: string;
  address: string;
  number: string;
  createdAt: string;
  InstituteUsers: [];
}




const ManageInstitutes = () => {
  const [user, setUser] = useState<User>();
  const [institutes, setInstitutes] = useState<Institute[]>([]);
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
      const response = await api.get("/institute/byuser", { withCredentials: true });
      setInstitutes(response.data)

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
              Painel de controle | <span className="text-primary">Institutos</span>
            </h1>
            <p className="text-muted-foreground">
              Gerencie usuários e instituições
            </p>
          </div>

        </div>

        <div className="grid grid-cols-3">

          {institutes.length !== 0 && institutes.map((institute, index) =>
            <Link to={`/dashboard/institute/${institute.id}`}>

              <Card onClick={() => { setOpenForm(!openForm) }} className="glass-card border-primary/20 animate-fade-in">
                <CardContent className="py-20 text-center">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-primary"></User>
                    </div>
                    <h3 className="text-xl font-semibold"> {institute.name}</h3>
                    <p className="text-muted-foreground">
                      {institute.city} | {institute.state} | {institute.country}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
          }


        </div>
      </div>
    </div >
  );
};

export default ManageInstitutes;
