import z, { ZodObject, ZodType } from "zod";

export const baseResumeSchema = z.object({
  full_name: z.string().nonempty("Required").default(""),
  photo_profile: z.string().nonempty("Required").default(""),
  gender: z.string().default(""),
  domicile: z.string().optional().default(""),
  email: z
    .email("Please enter your email in the format: name@example.com")
    .nonempty("Required")
    .default(""),
  phone_number: z.string().default(""),
  linkedin_link: z
    .url({
      protocol: /^https?$/,
      hostname: z.regexes.domain,
      message:
        "Please copy paste your Linkedin URL, example: https://www.linkedin.com/in/username",
    })
    .default(""),
  date_of_birth: z.string().default(""),
});

export type BaseResumeType = z.infer<typeof baseResumeSchema>;

export type SchemaRule = {
  id: string;
  fieldKey: keyof BaseResumeType;
  fieldOption: "Mandatory" | "Optional" | "Off";
  jobId: string;
};

export const generateZodSchemaFromRules = (rules: SchemaRule[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schema: Partial<Record<keyof BaseResumeType, ZodType<any>>> = {};

  rules.forEach(({ fieldKey, fieldOption }) => {
    if (fieldOption === "Off") return;
    if (fieldKey === undefined) return;

    const isRequired = fieldOption === "Mandatory";

    switch (fieldKey) {
      case "email":
        schema[fieldKey] = isRequired
          ? z
              .email("Please enter your email in the format: name@example.com")
              .nonempty("Required")
          : z
              .email("Please enter your email in the format: name@example.com")
              .optional();
        break;

      case "phone_number":
        schema[fieldKey] = isRequired
          ? z.string().min(10, "Too short").nonempty("Required")
          : z.string().min(10, "Too short").optional();
        break;

      case "photo_profile":
        schema[fieldKey] = isRequired
          ? z.string().min(2, "Too short").nonempty("Required")
          : z.string().min(10, "Too short").optional();
        break;

      default:
        schema[fieldKey as keyof BaseResumeType] = isRequired
          ? z.string().nonempty(`Required`)
          : z.string().optional();
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return z.object(schema as Record<keyof BaseResumeType, ZodType<any>>);
};

export const generateFieldConfigs = (rules: SchemaRule[]) => {
  const typeMap: Partial<Record<keyof BaseResumeType, string>> = {
    photo_profile: "text",
    full_name: "text",
    date_of_birth: "date",
    gender: "radio",
    domicile: "select",
    phone_number: "phone",
    email: "email",
    linkedin_link: "url",
  };

  const orderedFieldKeys: (keyof BaseResumeType)[] = [
    "photo_profile",
    "full_name",
    "date_of_birth",
    "gender",
    "domicile",
    "phone_number",
    "email",
    "linkedin_link",
  ];

  const filteredRules = rules.filter(
    (rule): rule is SchemaRule =>
      rule.fieldOption !== "Off" && rule.fieldKey !== undefined,
  );

  const sortedRules = filteredRules.sort(
    (a, b) =>
      orderedFieldKeys.indexOf(a.fieldKey) -
      orderedFieldKeys.indexOf(b.fieldKey),
  );

  return sortedRules.map((rule) => ({
    ...rule,
    label: rule.fieldKey
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    placeholder: `Enter ${rule.fieldKey.replace(/_/g, " ")}`,
    type: typeMap[rule.fieldKey] ?? "text",
  }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isFieldRequired<T extends ZodObject<any>>(
  schema: T,
  fieldName: string,
): boolean {
  const shape = schema.shape;
  const field = shape[fieldName];

  return !field?.isOptional?.();
}
