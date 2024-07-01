import {
  genders,
  sexualities,
  therapyFocus,
  therapyMethods,
  therapyModes,
  certification,
} from "./FormOption";

export const FormData = {
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
