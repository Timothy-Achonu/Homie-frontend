import * as Yup from "yup";

export const businessDetailsSchema = Yup.object({
  businessName: Yup.string().required("Business name is required."),

  email: Yup.string().email().required("Email is required!"),

  businessPhoneNumber: Yup.string().required(
    "Business phone number is required."
  ),
});

export const profileDetailsSchema = Yup.object({
  country: Yup.string().required("Country is required."),
  industry: Yup.string().required("Industry is required."),
  username: Yup.string().required("username is required"),
});

export const customizeModeSchema = Yup.object({
  mode: Yup.string().oneOf(["creator", "business"]),
});

export type ModeSchemaType = Yup.InferType<typeof customizeModeSchema>;
             