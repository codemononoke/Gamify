import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required."),
  email: yup.string().email().required("Email is required.").trim(),
  password: yup
    .string()
    .min(8, "At least 8 characters")
    .max(32, "At most 32 characters.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .min(8, "At least 8 characters")
    .max(32, "At most 32 characters.")
    .required("Confirm password is required."),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email().required("Email is required.").trim(),
  password: yup
    .string()
    .min(8, "At least 8 characters")
    .max(32, "At most 32 characters.")
    .required("Password is required."),
});

export const editProfileSchema = yup.object().shape({
  name: yup.string(),
  gender: yup.string(),
  phoneNumber: yup
    .string()
    .min(10, "At least 10 characters")
    .max(10, "At most 10 characters."),
  address: yup.string().max(100),
  city: yup.string(),
  state: yup.string(),
  country: yup.string(),
  pinCode: yup
    .string()
    .min(6, "At least 6 characters")
    .max(6, "At most 6 characters."),
});
