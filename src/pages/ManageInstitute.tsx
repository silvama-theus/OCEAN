import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Save, Trash2, Eye, FileDown, User } from "lucide-react";
import { toast } from "sonner";
import { Form, Link, useParams } from "react-router-dom";
import { MultiSelect } from "@/components/multi-select";
import api from "../services/api";
import { Dialog, Select } from "radix-ui";
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
  InstitutesUsers: any[];
}



const ManageInstitute = () => {
  const { id } = useParams();
  //const [user, setUser] = useState<User>();
  
  const [selectedOption, setSelectedOption] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [institute, setInstitute] = useState<Institute>(
    {
      id: "",
      vid: "",
      name: "",
      country: "",
      state: "",
      city: "",
      address: "",
      number: "",
      createdAt: "",
      InstitutesUsers: []
    }
  );
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    vid: "",
    name: "",
    country: "",
    state: "",
    city: "",
    address: "",
    number: "",
    createdAt: "",
    InstitutesUsers: []
  });

  useEffect(() => {
    const fetchData = async (id: string) => {
      const response = await api.get(`institute/${id}`, { withCredentials: true });
      setInstitute({
        id: response.data.id,
        vid: response.data.vid,
        name: response.data.name,
        country: response.data.country,
        state: response.data.state,
        city: response.data.city,
        address: response.data.address,
        number: response.data.number,
        createdAt: response.data.createAt,
        InstitutesUsers: response.data.InstitutesUsers
      })
      setFormData({
        id: response.data.id,
        vid: response.data.vid,
        name: response.data.name,
        country: response.data.country,
        state: response.data.state,
        city: response.data.city,
        address: response.data.address,
        number: response.data.number,
        createdAt: response.data.createAt,
        InstitutesUsers: response.data.InstitutesUsers
      })
console.log(response.data)
    };

    fetchData(id);



  }, [id]);
  const formRef = useRef<HTMLDivElement>(null);
  const parseDate = (data: string) => {
    const parts = data.split("-");
    return parts[2].split("T")[0] + "/" + parts[1] + "/" + parts[1];
  };

  const handleSubmit = (async () => {

    const updatedInstitute: Institute = {
      ...formData,
      InstitutesUsers: []
    }
    // if (updatedUser.newPassword === updatedUser.confirmPassword) {
    //   const login = await api.put(`/user/${updatedUser.id}`, updatedUser, { withCredentials: true });
    //   console.log(login)
    //   if (login.code === 200 || login.code === 201) {
    //     toast.success("User updated successfully!");
    //   }
    // }



  });

 const handleChange = (event) => {
    setSelectedOption(event.target.value);
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

        <div>
          <Card className="glass-card border-primary/20 animate-fade-in hover:primary">
            <CardContent className="py-20 text-center">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Id */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="uid">
                      Id da instituição<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="id"
                      required
                      value={formData.id}
                      disabled={true}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vid">
                      Identificação visual<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="vid"
                      required
                      value={formData.vid}
                      onChange={(e) => setFormData({ ...formData, vid: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>
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

                  {/* País */}
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      País<span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="country"
                      type="country"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                </div>


                <div className="grid md:grid-cols-3 gap-6">
                  {/* Local */}
                  <div className="space-y-2">
                    <Label htmlFor="city">
                      Cidade <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">
                      Estado <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="state"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="bg-background/50 border-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number">
                      Número <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="number"
                      required
                      value={formData.number}
                      onChange={(e) => setFormData({ ...formData, number: e.target.value })}
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
        {institute.InstitutesUsers?.length > 0 ? (
          <ul role="list">
            {institute.InstitutesUsers?.length !== 0 && institute.InstitutesUsers.map((userInstitute, index) =>
              <Card className="grid grid-cols-2 items-center">
                <li className="flex py-4 first:pt-0 last:pb-0" key={index}>
                  {/* <img className="h-10 w-10 rounded-full" src={userInstitute.User.imageUrl} alt="" /> */}
                  <div className="h-10 w-10 rounded-full flex items-center justify-center ml-3">
                    <User className="self-center"></User>
                  </div>
                  <div className="ml-3 overflow-hidden">
                    <p className="text-sm font-medium text-white text-left">{userInstitute.User.name}</p>
                    <p className="truncate text-sm text-gray-400 text-left">{userInstitute.User.email}</p>
                  </div>
                </li>
                {/* <MultiSelect
                  options={manageOptions}
                  onValueChange={setUserManageOptions}
                  defaultValue={userManageOptions}
                  key={userInstitute.Userid}
                  disabled
                /> */}
                <form>
                  <p>Este usuário pode:</p>
                  <label>
                    <input
                      type="radio"
                      name="myOptions"
                      value="optionA"
                      checked={selectedOption[userInstitute.Userid] === 'optionA'}
                      onChange={handleChange}
                    />
                    Visualizar
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="myOptions"
                      value="optionB"
                      checked={selectedOption[userInstitute.Userid] === 'optionB'}
                      onChange={handleChange}
                    />
                    Visualizar e editar
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="myOptions"
                      value="optionC"
                      checked={selectedOption[userInstitute.Userid] === 'optionC'}
                      onChange={handleChange}
                    />
                    Visualizar, editar e gerênciar
                  </label>
                </form>
              </Card>
            )}
          </ul>
        ) : (<div></div>)
        }


      </div>
    </div >
  );
};

export default ManageInstitute;
