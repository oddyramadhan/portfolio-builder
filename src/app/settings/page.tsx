"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DropzoneField } from "@/components/dropzone-field";
import ProfileForm from "@/components/profile-form";
import PortfolioForm from "@/components/portfolio-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { formSchema, FormSchema } from "@/schema/form.schema";
import PortfolioPreview from "@/components/portfolio-preview";
import { getLatestSettings, saveSettings, updateSettings } from "@/lib/api";
import { toast } from "sonner";

export default function SettingsPage() {
  const [preview, setPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleScreenChange = () => {
      if (mediaQuery.matches) {
        setPreview(false);
      }
    };
    mediaQuery.addEventListener("change", handleScreenChange);
    handleScreenChange();
    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      backgroundImage: null,
      profileImage: null,
      profile: {
        name: "",
        position: "",
        description: "",
      },
      portfolios: [
        {
          name: "",
          position: "",
          description: "",
          company: "",
          startDate: new Date(),
          endDate: new Date(),
        },
      ],
    },
  });

  useEffect(() => {
    getLatestSettings()
      .then((data) => {
        if (data) {
          form.reset({
            profile: data.profile,
            portfolios: data.portfolios.map(
              (item: { [key: string]: string }) => ({
                ...item,
                startDate: new Date(item.startDate),
                endDate: new Date(item.endDate),
              })
            ),
            backgroundImage: data.backgroundImage,
            profileImage: data.profileImage,
            id: data.id || "",
          });
        }
      })
      .catch((err) => {
        console.error("Error fetching latest settings:", err);
        toast.error(
          "Unable to load your portfolio. Please check your server connection."
        );
      });
  }, [form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "portfolios",
  });

  const onSubmit = async (data: FormSchema) => {
    setIsSaving(true);
    try {
      const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });

      const backgroundImage =
        typeof data.backgroundImage === "string"
          ? data.backgroundImage
          : await toBase64(data.backgroundImage);

      const profileImage =
        typeof data.profileImage === "string"
          ? data.profileImage
          : await toBase64(data.profileImage);

      const payload = {
        profile: data.profile,
        portfolios: data.portfolios,
        backgroundImage,
        profileImage,
      };

      if (data.id) {
        await updateSettings(data.id, payload);
      } else {
        await saveSettings(payload);
      }
      toast.success("Portfolio saved successfully!");
    } catch (err) {
      console.error("Error saving portfolio:", err);
      toast.error("Failed to save portfolio. Please try again later.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto">
      <div className="flex space-x-2 lg:hidden p-4">
        <Switch
          id="airplane-mode"
          checked={preview}
          onCheckedChange={setPreview}
        />
        <Label htmlFor="airplane-mode">Preview Mode</Label>
      </div>
      {!preview ? (
        <div className="flex flex-col justify-start min-h-screen p-4 md:p-8 gap-8 basis-full lg:basis-1/2 lg:border-r-1">
          <Controller
            name="backgroundImage"
            control={form.control}
            render={({ field }) => (
              <DropzoneField title="Background Image" field={field} />
            )}
          />

          <Controller
            name="profileImage"
            control={form.control}
            render={({ field }) => (
              <DropzoneField title="Profile Image" field={field} />
            )}
          />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <ProfileForm control={form.control} namePrefix="profile" />

              {fields.map((field, index) => (
                <PortfolioForm
                  key={field.id}
                  control={form.control}
                  namePrefix={`portfolios.${index}`}
                  index={index}
                  remove={() => remove(index)}
                />
              ))}

              <div className="flex justify-between items-center">
                {fields.length < 10 && (
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        name: "",
                        position: "",
                        description: "",
                        company: "",
                        startDate: new Date(),
                        endDate: new Date(),
                      })
                    }
                  >
                    + Tambah Portfolio
                  </Button>
                )}

                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="flex p-8 lg:hidden">
          <PortfolioPreview
            backgroundImage={form.watch("backgroundImage")}
            profileImage={form.watch("profileImage")}
            profile={form.watch("profile")}
            portfolios={form.watch("portfolios").map((item) => ({
              ...item,
              startDate: item.startDate.toISOString(),
              endDate: item.endDate.toISOString(),
            }))}
          />
        </div>
      )}
      <div className="hidden lg:block lg:basis-1/2 lg:p-8 lg:px-16">
        <PortfolioPreview
          backgroundImage={form.watch("backgroundImage")}
          profileImage={form.watch("profileImage")}
          profile={form.watch("profile")}
          portfolios={form.watch("portfolios").map((item) => ({
            ...item,
            startDate: item.startDate.toISOString(),
            endDate: item.endDate.toISOString(),
          }))}
        />
      </div>
    </div>
  );
}
