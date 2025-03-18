import { type FilledFormType } from "./FilledFormType";
import { type FormElementsType } from "./FormElementsType";

export type FormDataToGenerateType = {
  id: number;
  calculation: {
    price: string;
    deliveryDate: string;
  };
  values: Array<FormElementsType>;
  defaultFilledFormData: FilledFormType;
};
