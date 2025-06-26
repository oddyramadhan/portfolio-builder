import { useEffect, useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { DatePickerField } from "./datepicker-field";
import { Card } from "./ui/card";
import { Collapsible, CollapsibleContent } from "./ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { CircleX, Maximize2, Minimize2 } from "lucide-react";
import { getNestedError } from "@/lib/utils";

interface PortfolioFormProps<T extends FieldValues> {
  control: Control<T>;
  namePrefix: FieldPath<T>;
  remove?: (index: number) => void;
  index?: number;
}

export default function PortfolioForm<T extends FieldValues>({
  control,
  namePrefix,
  remove,
  index,
}: PortfolioFormProps<T>) {
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
          <h3 className="text-base font-semibold text-gray-700">
            Portfolio {(index ?? 0) + 1}
          </h3>
          <div className="flex items-center gap-4">
            <CollapsibleTrigger className="text-gray-500 hover:text-gray-700">
              {!open ? (
                <Maximize2 className="w-5 h-5" onClick={() => setOpen(false)} />
              ) : (
                <Minimize2 className="w-5 h-5" onClick={() => setOpen(true)} />
              )}
            </CollapsibleTrigger>
            {remove && index !== undefined && (
              <CircleX
                className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => remove(index)}
              />
            )}
          </div>
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
              name={`${namePrefix}.company` as FieldPath<T>}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Perusahaan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name={`${namePrefix}.startDate` as FieldPath<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePickerField
                        placeholder="Tanggal Mulai"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`${namePrefix}.endDate` as FieldPath<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePickerField
                        placeholder="Tanggal Selesai"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
