import { type SelectedSurfaceType } from "./SelectedSurfaceType";
import { type UploadedFile } from "./UploadedFileType";

export type FormElementsType = {
  selectedMaterial?: {
    image: string;
    name: string;
    infoLink: string;
    rate: number;
    rates: number;
  };
  id: number;
  type?: string;
  onChange?: (id: number, value: string | number) => void;
  filled?: string | number | SelectedSurfaceType | UploadedFile[];
  name?: string;
  info?: string;
  options?: string[];
  isImportant?: boolean;
  description?: string;
  data?: {
    alertMesage: string;
    categories?: {
      id: string;
      name: string;
      options: {
        id: string;
        name: string;
      }[];
    }[];
    tiles?: {
      id: string;
      categoryId: string;
      name: string;
      description: string;
      image: string;
      colors: string[];
      requiredOption?: string;
    }[];
    treatments?: {
      // Dodanie 'treatments'
      id: string;
      name: string;
      description: string;
      image: string;
      hasColors?: boolean;
      colors?: string[];
      hasCoatings?: boolean;
      coatings?: { id: string; name: string }[];
    }[];
  };
};
