// import React, { useState, useEffect, useRef } from "react";
// import InfoButton from "./InfoButton";
// import { type FormElementsType } from "~/lib/FormElementsType";
// import { useFormContext } from "~/lib/FormContext";
// import LoadedElement from "./LoadedElement";

// const SelectGroupCustom: React.FC<FormElementsType> = ({
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
//   isLoaded,
// }) => {
//   const [selectedOption, setSelectedOption] = useState<string | null>(
//     typeof filled == "string" ? filled : null,
//   );
//   const [customOption, setCustomOption] = useState<string>("");
//   const prevOption = useRef<string | null>(selectedOption);
//   const { setFormCurrentState } = useFormContext();

//   const handleClick = (option: string) => {
//     const newValue = selectedOption === option ? null : option;
//     setSelectedOption(newValue);
//     setCustomOption("");
//     handleVisibility(newValue);
//   };

//   const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (/^\d*$/.test(value)) {
//       setCustomOption(value);
//       setSelectedOption(null); // Odznacza inne pola przy wpisywaniu własnej wartości
//       handleVisibility(value);
//     }
//   };

//   const handleVisibility = (newValue: string | null) => {
//     elementsToShow?.forEach((el) => {
//       if (el.option === newValue) {
//         setFormCurrentState((prev) => ({
//           ...prev,
//           hiddenElements: prev.hiddenElements.filter(
//             (item) => item !== el.elementToShow,
//           ),
//         }));
//       } else {
//         setFormCurrentState((prev) => ({
//           ...prev,
//           hiddenElements: [...prev.hiddenElements, el.elementToShow],
//         }));
//       }
//     });
//   };

//   useEffect(() => {
//     if (prevOption.current !== selectedOption) {
//       onChange(id, selectedOption ?? "");
//       prevOption.current = selectedOption;
//     }
//   }, [selectedOption, id, onChange]);

//   useEffect(() => {
//     setSelectedOption(typeof filled == "string" ? filled : null);
//   }, [filled]);

//   return (
//     <div className="mb-5 flex flex-wrap items-center">
//       <div className="flex items-center">
//         <p className="flex items-center whitespace-nowrap p-[6px] text-base">
//           {isImportant && <span className="mr-1 text-red-500">*</span>}
//           {name}
//         </p>
//         {isLoaded && <LoadedElement />} {info && <InfoButton info={info} />}
//       </div>
//       <div className="ml-5 flex flex-wrap gap-x-2">
//         {options.map((option, index) => (
//           <button
//             key={index}
//             onClick={() => handleClick(option)}
//             className={`${
//               selectedOption === option
//                 ? "bg-accent-foreground text-accent"
//                 : "hover:bg-muted hover:text-muted-foreground"
//             } my-1 inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-md border px-2.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
//           >
//             {option}
//           </button>
//         ))}

//         {/* <input
//           type="text"
//           value={customOption}
//           onChange={handleCustomChange}
//           placeholder="Wpisz własną wartość.."
//           className={`my-1 inline-flex h-9 min-w-5 items-center justify-center gap-2 rounded-md border px-2.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${customOption && selectedOption === null ? "bg-accent-foreground text-accent" : "bg-white text-black"} ${selectedOption === null && !customOption ? "bg-white text-black" : "hover:bg-muted hover:text-muted-foreground"}`}
//           onFocus={() => setSelectedOption(null)} // Gdy pole ma fokus, traktujemy je jak zwykły input
//         /> */}
//         <input
//           type="text"
//           value={customOption}
//           onChange={handleCustomChange}
//           placeholder="Wpisz własną wartość..."
//           className={`my-1 h-9 w-auto min-w-[150px] max-w-full items-center justify-center gap-2 rounded-md border px-2.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${customOption && selectedOption === null ? "bg-accent-foreground text-accent" : "bg-white text-black"} ${selectedOption === null && !customOption ? "bg-white text-black" : "hover:bg-muted hover:text-muted-foreground"}`}
//           onFocus={() => setSelectedOption(null)} // Gdy pole ma fokus, traktujemy je jak zwykły input
//         />
//       </div>
//     </div>
//   );
// };

// export default SelectGroupCustom;
"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import InfoButton from "./InfoButton";
import type { FormElementsType } from "~/lib/FormElementsType";
import { useFormContext } from "~/lib/FormContext";
import LoadedElement from "./LoadedElement";

const SelectGroupCustom: React.FC<FormElementsType> = ({
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
  isLoaded,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    typeof filled == "string" ? filled : null,
  );
  const [customOption, setCustomOption] = useState<string>("");
  const prevOption = useRef<string | null>(selectedOption);
  const { setFormCurrentState } = useFormContext();

  const handleClick = (option: string) => {
    const newValue = selectedOption === option ? null : option;
    setSelectedOption(newValue);
    setCustomOption("");
    handleVisibility(newValue);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomOption(value);
      setSelectedOption(null); // Odznacza inne pola przy wpisywaniu własnej wartości
      handleVisibility(value);
    }
  };

  const handleVisibility = (newValue: string | null) => {
    elementsToShow?.forEach((el) => {
      if (el.option === newValue) {
        setFormCurrentState((prev) => ({
          ...prev,
          hiddenElements: prev.hiddenElements.filter(
            (item) => item !== el.elementToShow,
          ),
        }));
      } else {
        setFormCurrentState((prev) => ({
          ...prev,
          hiddenElements: [...prev.hiddenElements, el.elementToShow],
        }));
      }
    });
  };

  useEffect(() => {
    if (prevOption.current !== selectedOption) {
      onChange(id, selectedOption ?? "");
      prevOption.current = selectedOption;
    }
  }, [selectedOption, id, onChange]);

  useEffect(() => {
    setSelectedOption(typeof filled == "string" ? filled : null);
  }, [filled]);

  return (
    <div className="mb-5 flex flex-wrap items-center">
      <div className="flex items-center">
        <p className="flex items-center whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
        </p>
        {isLoaded && <LoadedElement />} {info && <InfoButton info={info} />}
      </div>
      <div className="ml-5 flex flex-wrap gap-x-2 md:max-w-[700px]">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleClick(option)}
            className={`${
              selectedOption === option
                ? "bg-accent-foreground text-accent"
                : "hover:bg-muted hover:text-muted-foreground"
            } my-1 inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-md border px-2.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
          >
            {option}
          </button>
        ))}

        <input
          type="text"
          value={customOption}
          onChange={handleCustomChange}
          placeholder="Własna wartość"
          className={`my-1 inline-flex h-9 w-auto items-center justify-center gap-2 rounded-md border px-2.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${customOption && selectedOption === null ? "bg-accent-foreground text-accent" : "bg-white text-black"} ${selectedOption === null && !customOption ? "bg-white text-black" : "hover:bg-muted hover:text-muted-foreground"} placeholder:text-neutral-400`}
          onFocus={() => setSelectedOption(null)}
          style={{ width: "min-content" }}
          size={customOption.length || 10}
        />
      </div>
    </div>
  );
};

export default SelectGroupCustom;
