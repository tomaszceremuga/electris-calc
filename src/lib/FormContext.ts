"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import formData from "~/lib/formData"
import type { UploadedFile } from "~/lib/UploadedFileType"
import type { FilledFormType } from "~/lib/FilledFormType"
import type { FormDataToGenerateType } from "~/lib/FormDataToGenerateType"

// Define the context type
interface FormContextType {
  formCurrentState: FilledFormType
  setFormCurrentState: React.Dispatch<React.SetStateAction<FilledFormType>>
  formDataToGenerate: FormDataToGenerateType
  generateForm: (data: FormDataToGenerateType, filledData?: FilledFormType) => void
  uploadedFiles: UploadedFile[]
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>
}

// Create the context with a default value
const FormContext = createContext<FormContextType>({
  formCurrentState: {} as FilledFormType,
  setFormCurrentState: () => {console.log("")},
  formDataToGenerate: {} as FormDataToGenerateType,
  generateForm: () => {console.log("")},
  uploadedFiles: [],
  setUploadedFiles: () => {console.log("")},
})

// Create a provider component
export function FormProvider({ children }: { children: ReactNode }) {
  // Move uploadedFiles state to the context
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [formCurrentState, setFormCurrentState] = useState<FilledFormType>(formData.defaultFilledFormData)
  const [formDataToGenerate, setFormDataToGenerate] = useState<FormDataToGenerateType>(formData)

  // Update form state when uploaded files change
  useEffect(() => {
    setFormCurrentState((prevState) => ({
      ...prevState,
      uploadedFiles: uploadedFiles,
    }))
  }, [uploadedFiles])

  // Function to generate form
  const generateForm = (data: FormDataToGenerateType, filledData?: FilledFormType) => {
    setFormDataToGenerate(data)
    setFormCurrentState(filledData ?? data.defaultFilledFormData)
  }

  // Create the context value object
  const contextValue: FormContextType = {
    formCurrentState,
    setFormCurrentState,
    formDataToGenerate,
    generateForm,
    uploadedFiles,
    setUploadedFiles,
  }

  // Use React.createElement instead of JSX
  return React.createElement(FormContext.Provider, { value: contextValue }, children)
}

// Create a custom hook to use the context
export function useFormContext() {
  const context = useContext(FormContext)
  return context
}

