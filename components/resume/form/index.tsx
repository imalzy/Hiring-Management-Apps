import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
  generateFieldConfigs,
  generateZodSchemaFromRules,
  isFieldRequired,
  SchemaRule,
} from "../schema/dynamic";
import type { FormConfig } from "@/components/dashboard/types";
import { useState } from "react";
import WebcamModal from "@/components/jobs/modals/camera-modal";
import Input from "@/components/ui/Input";
import z from "zod";
import Select from "@/components/ui/Select";
import RadioGroup from "@/components/ui/RadioButton";
import PhoneNumberInput from "@/components/ui/PhoneNumberInput";
import InputDatePicker from "@/components/ui/InputDatePicker";
import { INDO_REGION } from "@/libs/domicile";
import Button from "@/components/ui/Button";

type DynamicFormProps = {
  fields: FormConfig[];
};

export const getDefaultValues = (content: FormConfig[]) => {
  const defaultValues: Record<string, string | undefined> = {};

  content.map(({ fieldKey }: FormConfig) => {
    switch (fieldKey) {
      case "photo_profile":
        defaultValues["photo_profile"] =
          "/assets/images/profile-placeholder.svg";
        break;
      default:
        defaultValues[fieldKey || ""] = "";
        return;
    }
  });
  return defaultValues;
};

const DynamicForm = ({ fields }: DynamicFormProps) => {
  const [photoPreview, setPhotoPreview] = useState<string>(
    "/assets/images/profile-placeholder.svg",
  );
  const [open, setOpen] = useState(false);

  const formSchema = generateZodSchemaFromRules(fields as SchemaRule[]);
  type DynamicFormType = z.infer<typeof formSchema>;
  const fieldConfigs = generateFieldConfigs(fields as SchemaRule[]);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    getValues,
  } = useForm<DynamicFormType>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(fields),
  });

  return (
    <>
      <form
        className="px-10 pb-10 space-y-5"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        {fieldConfigs
          .filter((field): field is NonNullable<typeof field> => field !== null)
          .map(({ fieldKey, fieldOption, label, type, placeholder }) => {
            if (fieldKey === "photo_profile") {
              return (
                <div key={fieldKey}>
                  {isFieldRequired(formSchema, "photo_profile") && (
                    <p className="text-sm text-red-500 font-bold">* Required</p>
                  )}
                  <div className="flex flex-col justify-start">
                    <label className="block text-sm text-[var(--natural-90)] font-bold mb-2">
                      Photo Profile
                    </label>
                    <div className="flex flex-col items-start">
                      <div className="w-24 h-24 rounded-lg overflow-hidden mb-2">
                        <Image
                          src={photoPreview}
                          alt="Profile"
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <label
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 border border-[var(--natural-40)] rounded-md px-3 py-1 text-sm font-bold text-[var(--natural-100)] cursor-pointer hover:bg-[var(--primary-color)] hover:text-white transition"
                      >
                        <Image
                          src={"/assets/icons/leading-icon.svg"}
                          alt="Profile"
                          width={16}
                          height={16}
                          className="object-cover w-4 h-4"
                        />{" "}
                        Take a Picture
                      </label>

                      {/*<Controller
                        name={fieldKey}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            id={field.name}
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              field.onChange(file);

                              if (file) {
                                const previewUrl = URL.createObjectURL(file);
                                setPhotoPreview(previewUrl);
                              } else {
                                setPhotoPreview("");
                              }
                            }}
                          />
                        )}
                      />*/}
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={fieldKey}>
                  <Controller
                    name={fieldKey}
                    control={control}
                    render={({ field }) => {
                      if (type === "select") {
                        return (
                          <Select
                            {...field}
                            label={label}
                            required={isFieldRequired(formSchema, fieldKey)}
                            placeholder="Choose your domicile"
                            options={INDO_REGION}
                            error={errors?.[fieldKey]?.message as string}
                          />
                        );
                      }

                      if (type === "radio") {
                        return (
                          <Controller
                            name={fieldKey}
                            control={control}
                            render={({ field }) => (
                              <div>
                                <RadioGroup
                                  name={field.name}
                                  label={"Pronoun (gender)"}
                                  required={isFieldRequired(
                                    formSchema,
                                    fieldKey,
                                  )}
                                  options={[
                                    {
                                      label: "She/her (Female)",
                                      value: "female",
                                    },
                                    { label: "He/him (Male)", value: "male" },
                                  ]}
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                                {(errors?.[fieldKey]?.message as string) && (
                                  <p className="text-sm text-red-500 mt-1">
                                    {errors?.[fieldKey]?.message as string}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        );
                      }

                      if (type === "phone") {
                        return (
                          <Controller
                            name={fieldKey}
                            control={control}
                            render={({ field }) => (
                              <div>
                                <PhoneNumberInput
                                  required={isFieldRequired(
                                    formSchema,
                                    fieldKey,
                                  )}
                                  label={label}
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                                {(errors?.[fieldKey]?.message as string) && (
                                  <p className="text-sm text-red-500 mt-1">
                                    {errors?.[fieldKey]?.message as string}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        );
                      }

                      if (type === "date") {
                        return (
                          <Controller
                            name={fieldKey}
                            control={control}
                            render={({ field, fieldState }) => (
                              <InputDatePicker
                                label="Date of birth"
                                required
                                placeholder="Select your date of birth"
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error?.message}
                              />
                            )}
                          />
                        );
                      }
                      return (
                        <Controller
                          name={fieldKey}
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              label={label}
                              required={isFieldRequired(formSchema, fieldKey)}
                              placeholder={placeholder}
                              error={errors?.[fieldKey]?.message as string}
                            />
                          )}
                        />
                      );
                    }}
                  />
                </div>
              );
            }
          })}
        <Button
          label="Submit"
          variant="primary"
          className="w-full  hover:opacity-90 transition"
          type="submit"
        />
      </form>
      <WebcamModal
        open={open}
        onClose={() => setOpen(false)}
        onCapture={(image) => {
          setPhotoPreview(image);
          setOpen(false);
        }}
      />
    </>
  );
};

export default DynamicForm;
