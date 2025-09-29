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
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "../../lib/form";
import { Type } from "lucide-react";
import {Input} from "../../components/ui/input.jsx"
import { useForm } from "react-hook-form"; 
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

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create new Account</DrawerTitle>
        </DrawerHeader>

        <div>
            <form >
                <div>
                    <label htmlFor="name"> Account Name</label>
                    <Input
                        id="name"
                        placeholder="e.g., Main Checking"
                        {...register("name")}
                        />

                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                </div>
            </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateAccountDrower;
