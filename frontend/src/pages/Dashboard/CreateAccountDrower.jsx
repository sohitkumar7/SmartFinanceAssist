import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "../../lib/form";
import { Type } from "lucide-react";
import { Input } from "../../components/ui/input.jsx";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {Button} from "../../components/ui/button.jsx"
import { useDispatch, useSelector } from "react-redux";
import { createAccount, fetchallAccount } from "../../Store/Account-Slice/index.js";
import toast from "react-hot-toast";

function CreateAccountDrower({ children }) {
  const [open, setOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });
  
  const dispatch  = useDispatch();
  const {backendUser} = useSelector((state)=>state.auth);
  const {allAccount} = useSelector((state)=>state.Account)
  
  useEffect(()=>{
    dispatch(fetchallAccount({UserId : backendUser._id})).then((data)=>{
      if(data?.payload?.success){
        console.log(data);
      }
    })
    console.log(allAccount);
  },[])

  console.log(allAccount)


  const onSubmit = async(data)=>{

    console.log(backendUser._id);
    console.log(data);
    const formData = {
      ...data,
      userId : backendUser._id
    }
    dispatch(createAccount(formData)).then((data) => {
      if(data.payload?.success){
        toast.success("New Account Created");
      }else{
        toast.error(data)
      }
    })
    
    dispatch(fetchallAccount({UserId : backendUser._id})).then((data) =>{
      if(data?.payload?.success){
        console.log(data);
      }
      else{
        console.log(data?.payload?.message);
      }
    })

    setOpen(false);
    reset();

  }


  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        
        <DrawerHeader>
          <DrawerTitle>Create new Account</DrawerTitle>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            
            <div className="space-y-z mb-6">
              <label htmlFor="name" className="text-sm font-medium">
                {" "}
                Account Name
              </label>
              <Input
                id="name"
                placeholder="e.g., Main Checking"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-z mb-6">
              <label htmlFor="name" className="text-sm font-medium">
                {" "}
                Account Type
              </label>

              <Select
                onValueChange={(value) => setValue("type", value)}
                defaultValues={watch("type")}
              >
                <SelectTrigger id="type">
                  <SelectValue
                    placeholder="Account Type"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CURRENT">CURRENT</SelectItem>
                  <SelectItem value="SAVING">SAVING</SelectItem>
                </SelectContent>
              </Select>

              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message}</p>
              )}
            </div>
            <div className="space-y-z mb-6">
              <label htmlFor="name" className="text-sm font-medium">
                {" "}
                Initial Balance
              </label>
              <Input
                id="balance"
                type="number"
                step="0.01"
                placeholder="0"
                {...register("balance")}
              />

              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3 mb-6">
              <div className="space-y-0.5 ">
                <label htmlFor="isDefault" className=" cursor-pointer text-sm font-medium">
                  {" "}
                  Set as Default
                </label>

                <p className="text-sm text-muted-foreground">This Account will be selected as Default</p>
              </div>
              <Switch
                id="isDefault"
                onCheckedChange={(checked) => setValue("isDefault", checked)}
                checked={watch("isDefault")}
              />
            </div>

            <div className="flex gap-4 pt-4 mb-3">
              <DrawerClose asChild>
                <Button type="button" variant="outline" className="flex-1" > 
                  Cancel
                </Button>
              </DrawerClose>
 
                <Button type="submit" className="flex-1">
                Create Account
                </Button>

            </div>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateAccountDrower;
