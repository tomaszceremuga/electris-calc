// // import React, { useState, useEffect, useRef } from "react";
// // import InfoButton from "./InfoButton";
// // import { type FormElementsType } from "~/lib/FormElementsType";
// // import { useFormContext } from "~/lib/FormContext";
// // import LoadedElement from "./LoadedElement";

// // const SelectGroup: React.FC<FormElementsType> = ({
// //   id,
// //   onChange = () => {
// //     console.log("");
// //   },
// //   filled,
// //   name,
// //   info = "",
// //   options = [""],
// //   isImportant = false,
// //   elementsToShow,
// //   isLoaded,
// // }) => {
// //   const [selectedOption, setSelectedOption] = useState<string | null>(
// //     typeof filled == "string" ? filled : null,
// //   );
// //   const prevOption = useRef<string | null>(selectedOption);
// //   const { setFormCurrentState } = useFormContext();

// //   const handleClick = (option: string) => {
// //     const newValue = selectedOption === option ? null : option;
// //     setSelectedOption(newValue);
// //     console.log(elementsToShow);

// //     elementsToShow?.forEach((el) => {
// //       if (el.option === newValue) {
// //         setFormCurrentState((prev) => ({
// //           ...prev,
// //           hiddenElements: prev.hiddenElements.filter(
// //             (item) => item !== el.elementToShow,
// //           ),
// //         }));
// //       } else {
// //         setFormCurrentState((prev) => ({
// //           ...prev,
// //           hiddenElements: [...prev.hiddenElements, el.elementToShow],
// //         }));
// //       }
// //     });
// //   };

// //   useEffect(() => {
// //     if (prevOption.current !== selectedOption) {
// //       onChange(id, selectedOption ?? "");
// //       prevOption.current = selectedOption;
// //     }
// //   }, [selectedOption, id, onChange, filled]);

// //   useEffect(() => {
// //     setSelectedOption(typeof filled == "string" ? filled : null);
// //   }, [filled]);

// //   return (
// //     <div className="mb-5 flex flex-wrap items-center">
// //       <div className="ml-2 flex flex-wrap gap-x-2">
// //         <div className="flex items-center">
// //           <p className="flex items-center whitespace-nowrap p-[6px] text-base">
// //             {isImportant && <span className="mr-1 text-red-500">*</span>}
// //             {name}
// //           </p>
// //           {isLoaded && <LoadedElement />} {info && <InfoButton info={info} />}
// //         </div>
// //         {options.map((option, index) => (
// //           <button
// //             key={index}
// //             onClick={() => handleClick(option)}
// //             className={`${
// //               selectedOption === option
// //                 ? "bg-accent-foreground text-accent"
// //                 : "hover:bg-muted hover:text-muted-foreground"
// //             } my-1 inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-md border px-2.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
// //           >
// //             {option}
// //           </button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default SelectGroup;
// "use client";

// import type React from "react";

// import { useState, useEffect, useRef } from "react";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import InfoButton from "./InfoButton";
// import type { FormElementsType } from "~/lib/FormElementsType";
// import { useFormContext } from "~/lib/FormContext";

// const SelectGroup: React.FC<FormElementsType> = ({
//   id,
//   onChange = () => {
//     console.log("");
//   },
//   filled,
//   name,
//   info = "",
//   description = "",
//   options = [""],
//   isImportant = false,
//   isLoaded = false,
//   elementsToShow,
// }) => {
//   const [selectedOption, setSelectedOption] = useState<string | null>(
//     typeof filled === "string" ? filled : null,
//   );
//   const prevOption = useRef<string | null>(selectedOption);
//   const { setFormCurrentState } = useFormContext();

//   const showElements = (value: string) => {
//     if (!elementsToShow) return;

//     // Create a set of elements to show based on the selected value
//     const elementsToShowSet = new Set();
//     elementsToShow.forEach((el) => {
//       if (el.option === value) {
//         elementsToShowSet.add(el.elementToShow);
//       }
//     });

//     // Update the hidden elements array
//     setFormCurrentState((prev) => {
//       // Start with the current hidden elements
//       const newHiddenElements = [...prev.hiddenElements];

//       // For each element that could be shown
//       elementsToShow.forEach((el) => {
//         const elementId = el.elementToShow;
//         const shouldShow = elementsToShowSet.has(elementId);

//         if (shouldShow) {
//           // Remove from hidden elements if it should be shown
//           const index = newHiddenElements.indexOf(elementId);
//           if (index !== -1) {
//             newHiddenElements.splice(index, 1);
//           }
//         } else {
//           // Add to hidden elements if it should be hidden
//           if (!newHiddenElements.includes(elementId)) {
//             newHiddenElements.push(elementId);
//           }
//         }
//       });

//       return {
//         ...prev,
//         hiddenElements: newHiddenElements,
//       };
//     });
//   };

//   const handleChange = (value: string) => {
//     setSelectedOption(value);
//     showElements(value);
//   };

//   useEffect(() => {
//     if (prevOption.current !== selectedOption) {
//       onChange(id, selectedOption ?? "");
//       prevOption.current = selectedOption;
//     }
//   }, [selectedOption, id, onChange]);

//   useEffect(() => {
//     setSelectedOption(typeof filled === "string" ? filled : null);
//   }, [filled]);

//   return (
//     <div className="mb-2 p-2">
//       <div className="flex items-center">
//         <Label className="whitespace-nowrap p-[6px] text-base">
//           {isImportant && <span className="mr-1 text-red-500">*</span>}
//           {name}
//         </Label>
//         {info && <InfoButton info={info} />}
//       </div>
//       <div className="ml-5 pt-2">
//         <Select
//           value={selectedOption ?? ""}
//           onValueChange={handleChange}
//           disabled={isLoaded}
//         >
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Wybierz opcję" />
//           </SelectTrigger>
//           <SelectContent>
//             {options.map((option, index) => (
//               <SelectItem key={index} value={option}>
//                 {option}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//       {description && (
//         <p className="ml-5 pt-1 text-xs text-muted-foreground">{description}</p>
//       )}
//     </div>
//   );
// };

// export default SelectGroup;
"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfoButton from "./InfoButton";
import type { FormElementsType } from "~/lib/FormElementsType";
import { useFormContext } from "~/lib/FormContext";

const SelectGroup: React.FC<FormElementsType> = ({
  id,
  onChange = () => {
    console.log("");
  },
  filled,
  name,
  info = "",
  description = "",
  options = [""],
  isImportant = false,
  elementsToShow,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    typeof filled === "string" ? filled : null,
  );
  const prevOption = useRef<string | null>(selectedOption);
  const { setFormCurrentState } = useFormContext();

  const showElements = (value: string) => {
    if (!elementsToShow) return;

    // Create a set of elements to show based on the selected value
    const elementsToShowSet = new Set();
    elementsToShow.forEach((el) => {
      if (el.option === value) {
        elementsToShowSet.add(el.elementToShow);
      }
    });

    // Update the hidden elements array
    setFormCurrentState((prev) => {
      // Start with the current hidden elements
      const newHiddenElements = [...prev.hiddenElements];

      // For each element that could be shown
      elementsToShow.forEach((el) => {
        const elementId = el.elementToShow;
        const shouldShow = elementsToShowSet.has(elementId);

        if (shouldShow) {
          // Remove from hidden elements if it should be shown
          const index = newHiddenElements.indexOf(elementId);
          if (index !== -1) {
            newHiddenElements.splice(index, 1);
          }
        } else {
          // Add to hidden elements if it should be hidden
          if (!newHiddenElements.includes(elementId)) {
            newHiddenElements.push(elementId);
          }
        }
      });

      return {
        ...prev,
        hiddenElements: newHiddenElements,
      };
    });
  };

  const handleChange = (value: string) => {
    setSelectedOption(value);
    showElements(value);
  };

  useEffect(() => {
    if (prevOption.current !== selectedOption) {
      onChange(id, selectedOption ?? "");
      prevOption.current = selectedOption;
    }
  }, [selectedOption, id, onChange]);

  useEffect(() => {
    setSelectedOption(typeof filled === "string" ? filled : null);
  }, [filled]);

  return (
    <div className="mb-2 flex items-center p-2">
      <div className="flex items-center">
        <p className="whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
        </p>
        {info && <InfoButton info={info} />}
      </div>
      <div className="ml-2">
        <Select value={selectedOption ?? ""} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Wybierz opcję" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {description && (
        <p className="ml-5 pt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default SelectGroup;
