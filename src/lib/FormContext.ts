"use client";

import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import formData from "~/lib/formData";
import type { UploadedFile } from "~/lib/UploadedFileType";
import type { FilledFormType } from "~/lib/FilledFormType";
import type { FormDataToGenerateType } from "~/lib/FormDataToGenerateType";

interface FormContextType {
  formCurrentState: FilledFormType;
  setFormCurrentState: React.Dispatch<React.SetStateAction<FilledFormType>>;
  formDataToGenerate: FormDataToGenerateType;
  generateForm: (
    data: FormDataToGenerateType,
    filledData?: FilledFormType,
  ) => void;
  setUploadedFiles: (uploadedFiles: UploadedFile[] | []) => void;
}

// Create the context with a default value
const FormContext = createContext<FormContextType>({
  formCurrentState: {} as FilledFormType,
  setFormCurrentState: () => {
    console.log("");
  },
  formDataToGenerate: {} as FormDataToGenerateType,
  generateForm: () => {
    console.log("");
  },
  setUploadedFiles: () => {
    console.log("");
  },
});

export function FormProvider({ children }: { children: ReactNode }) {
  const [formCurrentState, setFormCurrentState] = useState<FilledFormType>(
    formData.defaultFilledFormData,
  );
  const [formDataToGenerate, setFormDataToGenerate] =
    useState<FormDataToGenerateType>(formData);

  const setUploadedFiles = (uploadedFiles: UploadedFile[]) => {
    setFormCurrentState((prevState) => ({
      ...prevState,
      uploadedFiles: uploadedFiles,
    }));
  };

  const generateForm = (
    data: FormDataToGenerateType,
    filledData?: FilledFormType,
  ) => {
    setFormDataToGenerate(data);
    setFormCurrentState(filledData ?? data.defaultFilledFormData);
    setFormCurrentState((prevForm) => ({
      ...prevForm,
      uploadedFiles: [
        {
          name: "BADZIEW 1",
          size: 11419,
          url: "https://p6s5bqqmdlpwrmuu.public.blob.vercel-storage.com/uploads/Dokument%20bez%20tytu%C5%82u-N16iBmmMuihVzbQUSJel6XOEybhF4J.pdf",
        },
        {
          name: "jasperBagiBagi-4x.gif",
          size: 760780,
          url: "https://p6s5bqqmdlpwrmuu.public.blob.vercel-storage.com/uploads/jasperBagiBagi-4x-0QSVhtTHRlS2iHAlSLKWwOPVixtido.gif",
        },
      ],
    }));
  };

  const contextValue: FormContextType = {
    formCurrentState,
    setFormCurrentState,
    formDataToGenerate,
    generateForm,
    setUploadedFiles,
  };

  return React.createElement(
    FormContext.Provider,
    { value: contextValue },
    children,
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  return context;
}
