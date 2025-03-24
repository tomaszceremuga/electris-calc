"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent as UI_AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import FormSection from "./form/FormSection";
import UploadSection from "./upload/UploadSection";
import SummarySection from "./summary/SummarySection";

import { ChevronRight, File } from "lucide-react";

import { FormProvider, useFormContext } from "~/lib/FormContext";
import type { GeneralInformationType } from "~/lib/GeneralInformationType";
const AccordionContent = () => {
  const [activeIndex, setActiveIndex] = useState<string>("item-0");
  const [generalInformation, setGeneralInformation] =
    useState<GeneralInformationType>({
      name: "",
      company: "",
      email: "",
    });
  const { formCurrentState } = useFormContext();
  const uploadedFiles = formCurrentState.uploadedFiles;
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleNavigation = (targetIndex: string) => {
    setActiveIndex(targetIndex);
  };

  return (
    <Accordion
      type="single"
      value={activeIndex}
      onValueChange={setActiveIndex}
      collapsible
      className="h-min w-full max-w-4xl"
    >
      {/* General Information Section */}
      <AccordionItem
        value="item-0"
        className="mb-2 border-b bg-white p-2 lg:rounded-md lg:border"
      >
        <AccordionTrigger className="flex w-[300px] justify-between px-4 hover:no-underline">
          <div className="flex w-1/2 items-center md:w-3/4">
            <span className="mr-5 shrink-0 font-medium">
              General information
            </span>
            <div className="h-max w-3/4 md:w-full">
              <div className="relative flex-1 overflow-hidden">
                <div className="flex items-center gap-2 overflow-x-hidden whitespace-nowrap">
                  <p className="text-sm text-muted-foreground">
                    {generalInformation.name != "" && (
                      <span> {`${generalInformation.name},`} </span>
                    )}
                    {generalInformation.company != "" && (
                      <span> {` ${generalInformation.company}, `} </span>
                    )}
                    {generalInformation.email != "" && (
                      <span> {` ${generalInformation.email}`} </span>
                    )}
                  </p>
                </div>
                <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-r from-transparent to-background"></div>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <UI_AccordionContent className="pb-4 xl:px-4">
          {/* TUTAJ ZAWARTOSC */}
          <div className="mx-auto w-full">
            <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-1">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Imię i nazwisko
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Wprowadź imię i nazwisko"
                  required
                  value={generalInformation.name}
                  onChange={(e) =>
                    setGeneralInformation({
                      ...generalInformation,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                {formErrors.fullName && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-1">
                <label htmlFor="companyName" className="text-sm font-medium">
                  Nazwa firmy
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Wprowadź nazwę firmy"
                  required
                  value={generalInformation.company}
                  onChange={(e) =>
                    setGeneralInformation({
                      ...generalInformation,
                      company: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                {formErrors.companyName && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.companyName}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Adres email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Wprowadź adres email"
                  required
                  value={generalInformation.email}
                  onChange={(e) =>
                    setGeneralInformation({
                      ...generalInformation,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {formErrors.email}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => {
                // Reset errors
                setFormErrors({});

                // Validate fields
                const errors: Record<string, string> = {};

                if (!generalInformation.name.trim()) {
                  errors.fullName = "Imię i nazwisko jest wymagane";
                }

                if (!generalInformation.company.trim()) {
                  errors.companyName = "Nazwa firmy jest wymagana";
                }

                if (!generalInformation.email.trim()) {
                  errors.email = "Adres email jest wymagany";
                } else if (!/\S+@\S+\.\S+/.test(generalInformation.email)) {
                  errors.email = "Nieprawidłowy format adresu email";
                }

                // If there are errors, display them
                if (Object.keys(errors).length > 0) {
                  setFormErrors(errors);
                  return;
                }

                // If validation passes, proceed to next section
                handleNavigation("item-1");
              }}
              className="flex items-center"
            >
              Dalej
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </UI_AccordionContent>
      </AccordionItem>

      {/* Upload Section */}
      <AccordionItem
        value="item-1"
        className="mb-2 border-b bg-white p-2 lg:rounded-md lg:border"
      >
        <AccordionTrigger className="flex w-[300px] justify-between px-4 hover:no-underline">
          <div className="flex w-1/2 items-center md:w-3/4">
            <span className="mr-5 shrink-0 font-medium">Prześlij pliki</span>
            <div className="h-max w-3/4 md:w-full">
              <div className="relative flex-1 overflow-hidden">
                <div className="flex items-center gap-2 overflow-x-hidden whitespace-nowrap">
                  {uploadedFiles.map((el, index) => (
                    <div
                      key={index}
                      className="flex shrink-0 items-center gap-1 rounded-md border bg-muted/30 px-2 py-1 text-sm"
                    >
                      <File className="h-3.5 w-3.5" />
                      <a
                        href={el.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="max-w-[150px] truncate hover:underline"
                      >
                        {el.name}
                      </a>
                    </div>
                  ))}
                </div>
                {/* Gradient overlay that creates the fade-out effect */}
                <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-r from-transparent to-background"></div>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <UI_AccordionContent className="pb-4 xl:px-4">
          <UploadSection />
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => handleNavigation("item-0")}
              variant="outline"
              className="flex items-center"
            >
              <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
              Wróć
            </Button>
            <Button
              onClick={() => handleNavigation("item-2")}
              className="flex items-center"
            >
              Dalej
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </UI_AccordionContent>
      </AccordionItem>

      {/* Form Section */}
      <AccordionItem
        value="item-2"
        className="mb-2 border-b bg-white p-2 lg:rounded-md lg:border"
      >
        <AccordionTrigger className="flex w-[300px] px-4 hover:no-underline">
          <div className="flex w-1/2 items-center md:w-3/4">
            <span className="mr-5 shrink-0 font-medium">
              Technical information
            </span>
            <div className="h-max w-3/4 md:w-full">
              <div className="relative flex-1 overflow-hidden">
                <div className="flex items-center gap-2 overflow-x-hidden whitespace-nowrap pr-4 text-sm text-muted-foreground">
                  {formCurrentState.values.map((el, index) => {
                    if (typeof el.value == "number") {
                      return <p key={index}> {el.value.toString()},</p>;
                    } else if (typeof el.value == "string") {
                      return <p key={index}> {el.value},</p>;
                    }
                  })}
                </div>
                {/* Gradient overlay that creates the fade-out effect */}
                <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-r from-transparent to-background"></div>
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <UI_AccordionContent className="pb-4 xl:px-4">
          <FormSection />

          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => handleNavigation("item-1")}
              variant="outline"
              className="flex items-center"
            >
              <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
              Wróć
            </Button>
            <Button
              onClick={() => handleNavigation("item-3")}
              className="flex items-center"
            >
              Dalej
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </UI_AccordionContent>
      </AccordionItem>

      {/* Summary Section */}
      <AccordionItem
        value="item-3"
        className="mb-2 border-b bg-white p-2 lg:rounded-md lg:border"
      >
        <AccordionTrigger className="px-4 hover:no-underline">
          <span className="text-left font-medium">Dostawa</span>
        </AccordionTrigger>
        <UI_AccordionContent className="pb-4 xl:px-4">
          <SummarySection generalInformation={generalInformation} />
          <div className="mt-4 flex gap-2">
            <Button
              onClick={() => handleNavigation("item-1")}
              variant="outline"
              className="flex items-center"
            >
              <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
              Wróć
            </Button>
          </div>
        </UI_AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default function AccordionWithNavigation() {
  return (
    <FormProvider>
      <AccordionContent />
    </FormProvider>
  );
}
