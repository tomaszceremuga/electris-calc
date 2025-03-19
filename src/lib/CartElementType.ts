import {type FilledFormType } from "./FilledFormType";
import {type FormDataToGenerateType } from "./FormDataToGenerateType";
export type cartElementType = {
  id: number;
  filledForm: FilledFormType | object,
  formDataToGenerate: FormDataToGenerateType | object
};
