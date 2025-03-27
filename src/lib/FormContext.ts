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
  formCurrentState: {
    filledForm: FilledFormType;
    hiddenElements: number[];
  };
  setFormCurrentState: React.Dispatch<
    React.SetStateAction<{
      filledForm: FilledFormType;
      hiddenElements: number[];
    }>
  >;
  formDataToGenerate: FormDataToGenerateType;
  generateForm: (
    data: FormDataToGenerateType,
    filledData?: FilledFormType,
  ) => void;
  setUploadedFiles: (uploadedFiles: UploadedFile[] | []) => void;
  handleShowElement: (id: number) => void; // Dodanie funkcji do kontekstu
}

// Create the context with a default value
const FormContext = createContext<FormContextType>({
  formCurrentState: {
    filledForm: {} as FilledFormType,
    hiddenElements: [],
  },
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
  handleShowElement: () => {
    console.log("");
  }, // Pusty placeholder dla funkcji
});

export function FormProvider({ children }: { children: ReactNode }) {
  const [formCurrentState, setFormCurrentState] = useState<{
    filledForm: FilledFormType;
    hiddenElements: number[];
  }>({
    filledForm: formData.defaultFilledFormData as FilledFormType,
    hiddenElements: [],
  });
  const [formDataToGenerate, setFormDataToGenerate] =
    useState<FormDataToGenerateType>(formData as FormDataToGenerateType);

  const setUploadedFiles = (uploadedFiles: UploadedFile[]) => {
    setFormCurrentState((prevState) => ({
      ...prevState,
      filledForm: {
        ...prevState.filledForm,
        uploadedFiles: uploadedFiles,
      },
    }));
  };

  const generateForm = (
    data: FormDataToGenerateType,
    filledData?: FilledFormType,
  ) => {
    setFormDataToGenerate(data);
    setFormCurrentState({
      filledForm: filledData ?? data.defaultFilledFormData,
      hiddenElements: [],
    });
    setFormCurrentState((prevForm) => ({
      ...prevForm,
      filledForm: {
        ...prevForm.filledForm,
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
      },
    }));
  };

  // Funkcja do usuwania elementu z hiddenElements
  const handleShowElement = (id: number) => {
    setFormCurrentState((prev) => ({
      ...prev,
      hiddenElements: prev.hiddenElements.filter((item) => item !== id),
    }));
  };

  const contextValue: FormContextType = {
    formCurrentState,
    setFormCurrentState,
    formDataToGenerate,
    generateForm,
    setUploadedFiles,
    handleShowElement, // Dodanie funkcji do kontekstu
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
