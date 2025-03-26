// // // import React, { useState, useEffect, useRef } from "react";

// // // import { Label } from "@/components/ui/label";
// // // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // // import InfoButton from "./InfoButton";
// // // import { type FormElementsType } from "~/lib/FormElementsType";
// // // import { useFormContext } from "~/lib/FormContext";

// // // const RadioElements: React.FC<FormElementsType> = ({
// // //   id,
// // //   onChange = () => {
// // //     console.log("");
// // //   },
// // //   filled,
// // //   name,
// // //   info = "",
// // //   options = [""],
// // //   isImportant = false,
// // //   elementsToShow,
// // // }) => {
// // //   const [selectedOption, setSelectedOption] = useState<string | null>(
// // //     typeof filled === "string" ? filled : null,
// // //   );
// // //   const prevOption = useRef<string | null>(selectedOption);

// // //   const { setFormCurrentState } = useFormContext();

// // //   const showElements = (value: string) => {
// // //     console.log("pokazyheny element");
// // //     elementsToShow?.forEach((el) => {
// // //       if (el.option === value) {
// // //         setFormCurrentState((prev) => ({
// // //           ...prev,
// // //           hiddenElements: prev.hiddenElements.filter(
// // //             (item) => item !== el.elementToShow,
// // //           ),
// // //         }));
// // //       } else {
// // //         setFormCurrentState((prev) => ({
// // //           ...prev,
// // //           hiddenElements: [...prev.hiddenElements, el.elementToShow],
// // //         }));
// // //       }
// // //     });
// // //   };

// // //   const handleChange = (value: string) => {
// // //     setSelectedOption(value);
// // //     showElements(value);
// // //   };

// // //   useEffect(() => {
// // //     if (prevOption.current !== selectedOption) {
// // //       onChange(id, selectedOption ?? "");
// // //       prevOption.current = selectedOption;
// // //     }
// // //   }, [selectedOption, id, onChange]);

// // //   useEffect(() => {
// // //     setSelectedOption(typeof filled === "string" ? filled : null);
// // //   }, [filled]);

// // //   useEffect(() => {
// // //     // tutaj probowalem zrobic pokazywanie elementow na podstawie wypelnionej wartosci
// // //     showElements(typeof filled === "string" ? filled : "");
// // //   }, []);

// // //   return (
// // //     <div className="mb-2 p-2">
// // //       <div className="flex items-center">
// // //         <p className="whitespace-nowrap p-[6px] text-base">
// // //           {isImportant && <span className="mr-1 text-red-500">*</span>}
// // //           {name}
// // //         </p>
// // //         {info && <InfoButton info={info} />}
// // //       </div>

// // //       <RadioGroup
// // //         className="ml-5 flex flex-wrap gap-3 pt-2"
// // //         value={selectedOption ?? ""}
// // //         onValueChange={handleChange}
// // //       >
// // //         {options.map((option, index) => (
// // //           <div key={index} className="mr-3 flex items-center space-x-2">
// // //             <RadioGroupItem
// // //               value={option}
// // //               id={`option-${index}`}
// // //               checked={selectedOption === option}
// // //             />
// // //             <Label htmlFor={`option-${index}`}>{option}</Label>
// // //           </div>
// // //         ))}
// // //       </RadioGroup>
// // //     </div>
// // //   );
// // // };

// // // export default RadioElements;

// // "use client";

// // import type React from "react";
// // import { useState, useEffect, useRef } from "react";

// // import { Label } from "@/components/ui/label";
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import InfoButton from "./InfoButton";
// // import type { FormElementsType } from "~/lib/FormElementsType";
// // import { useFormContext } from "~/lib/FormContext";

// // const RadioElements: React.FC<FormElementsType> = ({
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
// // }) => {
// //   const [selectedOption, setSelectedOption] = useState<string | null>(
// //     typeof filled === "string" ? filled : null,
// //   );
// //   const prevOption = useRef<string | null>(selectedOption);

// //   const { setFormCurrentState } = useFormContext();

// //   const showElements = (value: string) => {
// //     console.log("pokazyheny element");
// //     elementsToShow?.forEach((el) => {
// //       if (el.option === value) {
// //         console.log("pokazywanie elementu o id: ");
// //         console.log(el.elementToShow);
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

// //   const handleChange = (value: string) => {
// //     setSelectedOption(value);
// //     showElements(value);
// //   };

// //   useEffect(() => {
// //     if (prevOption.current !== selectedOption) {
// //       onChange(id, selectedOption ?? "");
// //       prevOption.current = selectedOption;
// //     }
// //   }, [selectedOption, id, onChange]);

// //   useEffect(() => {
// //     setSelectedOption(typeof filled === "string" ? filled : null);
// //   }, [filled]);

// //   useEffect(() => {
// //     // Call showElements with the filled value when the component mounts
// //     if (filled) {
// //       showElements(typeof filled === "string" ? filled : "");
// //     }
// //   }, [filled]); // Add filled as a dependency to re-run when it changes

// //   return (
// //     <div className="mb-2 p-2">
// //       <div className="flex items-center">
// //         <p className="whitespace-nowrap p-[6px] text-base">
// //           {isImportant && <span className="mr-1 text-red-500">*</span>}
// //           {name}
// //         </p>
// //         {info && <InfoButton info={info} />}
// //       </div>

// //       <RadioGroup
// //         className="ml-5 flex flex-wrap gap-3 pt-2"
// //         value={selectedOption ?? ""}
// //         onValueChange={handleChange}
// //       >
// //         {options.map((option, index) => (
// //           <div key={index} className="mr-3 flex items-center space-x-2">
// //             <RadioGroupItem
// //               value={option}
// //               id={`option-${index}`}
// //               checked={selectedOption === option}
// //             />
// //             <Label htmlFor={`option-${index}`}>{option}</Label>
// //           </div>
// //         ))}
// //       </RadioGroup>
// //     </div>
// //   );
// // };

// // export default RadioElements;
// "use client";

// import type React from "react";
// import { useState, useEffect, useRef } from "react";

// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import InfoButton from "./InfoButton";
// import type { FormElementsType } from "~/lib/FormElementsType";
// import { useFormContext } from "~/lib/FormContext";

// const RadioElements: React.FC<FormElementsType> = ({
//   id,
//   onChange = () => {
//     console.log("");
//   },
//   filled,
//   name,
//   info = "",
//   options = [""],
//   isImportant = false,
//   elementsToShow,
// }) => {
//   const [selectedOption, setSelectedOption] = useState<string | null>(
//     typeof filled === "string" ? filled : null,
//   );
//   const prevOption = useRef<string | null>(selectedOption);

//   const { setFormCurrentState } = useFormContext();

//   const showElements = (value: string) => {
//     console.log("pokazyheny element");
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

//   useEffect(() => {
//     // Only call showElements if filled has a value and elementsToShow exists
//     if (filled && elementsToShow?.length) {
//       showElements(typeof filled === "string" ? filled : "");
//     }
//   }, []); // Empty dependency array to run only on mount

//   return (
//     <div className="mb-2 p-2">
//       <div className="flex items-center">
//         <p className="whitespace-nowrap p-[6px] text-base">
//           {isImportant && <span className="mr-1 text-red-500">*</span>}
//           {name}
//         </p>
//         {info && <InfoButton info={info} />}
//       </div>

//       <RadioGroup
//         className="ml-5 flex flex-wrap gap-3 pt-2"
//         value={selectedOption ?? ""}
//         onValueChange={handleChange}
//       >
//         {options.map((option, index) => (
//           <div key={index} className="mr-3 flex items-center space-x-2">
//             <RadioGroupItem
//               value={option}
//               id={`option-${index}`}
//               checked={selectedOption === option}
//             />
//             <Label htmlFor={`option-${index}`}>{option}</Label>
//           </div>
//         ))}
//       </RadioGroup>
//     </div>
//   );
// };

// export default RadioElements;
"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InfoButton from "./InfoButton";
import type { FormElementsType } from "~/lib/FormElementsType";
import { useFormContext } from "~/lib/FormContext";

const RadioElements: React.FC<FormElementsType> = ({
  id,
  onChange = () => {
    console.log("");
  },
  filled,
  name,
  info = "",
  options = [""],
  isImportant = false,
  elementsToShow,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    typeof filled === "string" ? filled : null,
  );
  const prevOption = useRef<string | null>(selectedOption);
  // const initialRenderRef = useRef(true);

  const { setFormCurrentState } = useFormContext();

  const showElements = (value: string) => {
    console.log("pokazyheny element");
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

  // We'll skip the initial automatic showing of elements
  // This will now be handled by the FormSection component
  // to ensure proper coordination with the initial hiddenElements array

  return (
    <div className="mb-2 p-2">
      <div className="flex items-center">
        <p className="whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
        </p>
        {info && <InfoButton info={info} />}
      </div>

      <RadioGroup
        className="ml-5 flex flex-wrap gap-3 pt-2"
        value={selectedOption ?? ""}
        onValueChange={handleChange}
      >
        {options.map((option, index) => (
          <div key={index} className="mr-3 flex items-center space-x-2">
            <RadioGroupItem
              value={option}
              id={`option-${index}`}
              checked={selectedOption === option}
            />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default RadioElements;
