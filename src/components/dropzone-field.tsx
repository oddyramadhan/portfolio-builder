"use client";

import { useCallback, useState, useEffect } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Minimize2, Maximize2, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";

interface DropzoneFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
> {
  title: string;
  field: ControllerRenderProps<TFieldValues, TName>;
}

export function DropzoneField<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>({ title, field }: DropzoneFieldProps<TFieldValues, TName>) {
  const [open, setOpen] = useState(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        const reason = rejection.errors[0]?.message || "File not accepted";
        toast.error(`File upload failed: ${reason}`);
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setPreviewUrl(URL.createObjectURL(file));
        field.onChange(file);
      }
    },
    [field]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
    },
    maxSize: 1024 * 1024 * 10, // 10MB
    multiple: false,
  });

  useEffect(() => {
    const value = field.value as File | string;

    if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreviewUrl(objectUrl);
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }

    if (typeof value === "string") {
      setPreviewUrl(value);
      return;
    }

    setPreviewUrl(null);
  }, [field.value]);

  return (
    <Card className="w-full p-4">
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between p-2">
          <h3 className="text-base font-semibold text-gray-700">{title}</h3>
          <CollapsibleTrigger className="text-gray-500 cursor-pointer hover:text-gray-700">
            {!open ? (
              <Maximize2 className="w-5 h-5" onClick={() => setOpen(false)} />
            ) : (
              <Minimize2 className="w-5 h-5" onClick={() => setOpen(true)} />
            )}
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <div
            {...getRootProps()}
            className={cn(
              "bg-gray-100 border-0 rounded-xl px-6 py-10 text-center transition-colors duration-200 mt-4 cursor-pointer",
              isDragActive ? "bg-gray-200" : ""
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-2 text-sm text-gray-500">
              <Paperclip className="w-5 h-5 mb-1" />
              <p className="underline">
                Drag and drop files, or{" "}
                <span className="text-blue-400 cursor-pointer">Browse</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported: .png, .jpg, .jpeg
              </p>
              <p className="text-xs text-gray-400">Max size: 10MB</p>
            </div>
            {field.value && (
              <p className="text-xs text-gray-600 mt-2">
                Selected: {field.value.name}
              </p>
            )}
            {previewUrl && (
              <div className="mt-4">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  className="w-auto max-h-28 mx-auto rounded shadow"
                  width={100}
                  height={100}
                />
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
