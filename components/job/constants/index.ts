export const PROFILE_FIELDS = [
  { key: "full_name", name: "Full name" },
  { key: "photo_profile", name: "Photo Profile" },
  { key: "gender", name: "Gender" },
  { key: "domicile", name: "Domicile" },
  { key: "email", name: "Email" },
  { key: "phone_number", name: "Phone number" },
  { key: "linkedin_link", name: "LinkedIn link" },
  { key: "date_of_birth", name: "Date of birth" },
] as const;

export const FIELD_OPTIONS = ["Mandatory", "Optional", "Off"] as const;

export type FieldName = (typeof PROFILE_FIELDS)[number];
export type FieldOption = (typeof FIELD_OPTIONS)[number];
