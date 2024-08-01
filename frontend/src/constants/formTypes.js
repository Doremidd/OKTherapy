import {
  genders,
  sexualities,
  therapyFocus,
  therapyMethods,
  therapyModes,
  certification,
} from "./formOptions";

export const FormData = {
  firstName: String,
  lastName: String,
  age: Number,
  gender: genders,
  sexuality: sexualities,
  location: String,
  budget: [Number],
  therapyMode: therapyModes,
  therapyFocus: therapyFocus,
  therapistGender: genders,
  therapyMethods: therapyMethods,
  certification: certification,
};
