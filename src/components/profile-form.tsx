import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getNestedError } from "@/lib/utils";

interface ProfileFormProps<T extends FieldValues> {
  control: Control<T>;
  namePrefix: FieldPath<T>;
}

export default function ProfileForm<T extends FieldValues>({
  control,
  namePrefix,
}: ProfileFormProps<T>) {
  const [open, setOpen] = useState(true);
  const { formState } = useFormContext<T>();

  useEffect(() => {
    const prefixError = getNestedError(formState.errors, namePrefix);
    if (prefixError && Object.keys(prefixError).length > 0) {
      setOpen(true);
    }
  }, [formState.errors, namePrefix]);

  return (
    <Card className="w-full p-4">
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between p-2">
          <h3 className="text-base font-semibold text-gray-700">Profile</h3>
          <CollapsibleTrigger className="text-gray-500 hover:text-gray-700">
            {open ? (
              <Minimize2 className="w-5 h-5 cursor-pointer" />
            ) : (
              <Maximize2 className="w-5 h-5 cursor-pointer" />
            )}
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div className="space-y-4 mt-4">
            <FormField
              control={control}
              name={`${namePrefix}.name` as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`${namePrefix}.position` as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title / Posisi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`${namePrefix}.description` as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsi"
                      {...field}
                      className="resize-none min-h-28"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
