// import React from "react";

// interface SelectGroupProps {
//   name: string;
//   options: string[];
//   isImportant?: boolean;
// }

// const SelectGroup: React.FC<SelectGroupProps> = ({
//   name,
//   options,
//   isImportant = false,
// }) => {
//   return (
//     <div className="mb-10 flex flex-wrap items-center">
//       <div className="ml-2 flex flex-wrap gap-2">
//         <p className="whitespace-nowrap p-[6px] text-base">
//           {isImportant && <span className="mr-1 text-red-500">*</span>}
//           {name}
//         </p>
//         {options.map((option, index) => (
//           <button
//             key={index}
//             className="ring-offset-background hover:bg-muted hover:text-muted-foreground focus-visible:ring-ring data-[state=on]:bg-accent data-[state=on]:text-accent-foreground inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-md border px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SelectGroup;

"use client";
import React, { useState } from "react";

interface SelectGroupProps {
  name: string;
  options: string[];
  isImportant?: boolean;
}

const SelectGroup: React.FC<SelectGroupProps> = ({
  name,
  options,
  isImportant = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="mb-3 flex flex-wrap items-center">
      <div className="ml-2 flex flex-wrap gap-2">
        <p className="whitespace-nowrap p-[6px] text-base">
          {isImportant && <span className="mr-1 text-red-500">*</span>}
          {name}
        </p>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleClick(option)}
            className={`${
              selectedOption === option
                ? "bg-accent text-accent-foreground"
                : "hover:bg-muted hover:text-muted-foreground"
            } ring-offset-background inline-flex h-9 min-w-9 items-center justify-center gap-2 rounded-md border px-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectGroup;
