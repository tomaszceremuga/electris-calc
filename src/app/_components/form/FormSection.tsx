// // "use client";

// // import SelectGroup from "./SelectGroup";
// // import RadioElements from "./RadioElements";
// // import TextAreaElement from "./TextAreaElement";
// // import UploadElement from "./UploadElement";
// // import QuantityElement from "./QuantityElement";
// // import SelectMaterial from "./SelectMaterial";

// // import type { FilledValueType } from "~/lib/FilledValueType";
// // import { useFormContext } from "~/lib/FormContext";
// // import InputNumber from "./InputNumber";
// // import { useEffect } from "react";
// // import InputText from "./InputText";
// // import SelectGroupCustom from "./SelectGroupCustom";

// // const FormSection = () => {
// //   const { formDataToGenerate, formCurrentState, setFormCurrentState } =
// //     useFormContext();

// //   const defaultMaterial = {
// //     image: "",
// //     name: "Unknown",
// //     infoLink: "#",
// //     rate: 0,
// //     rates: 0,
// //   };
// //   const defaultData = {
// //     alertMesage: "",
// //     categories: [],
// //     tiles: [],
// //   };

// //   const handleChange = (id: number, value: FilledValueType["value"]) => {
// //     setFormCurrentState((prev) => ({
// //       ...prev,
// //       filledForm: {
// //         ...prev.filledForm,
// //         values: prev.filledForm.values.map((item) =>
// //           item.id === id ? { ...item, value } : item,
// //         ),
// //       },
// //     }));
// //   };

// //   useEffect(() => {
// //     setFormCurrentState((prev) => ({
// //       ...prev,
// //       hiddenElements: formDataToGenerate.hiddenElements,
// //     }));
// //   }, [formDataToGenerate.hiddenElements, setFormCurrentState]);

// //   return (
// //     <div className="xl:pr-16">
// //       {formDataToGenerate.values.map((el, index) => {
// //         const filledValue = formCurrentState.filledForm.values.find(
// //           (item) => item.id === el.id,
// //         )?.value;

// //         console.log("tablica z ukrytymi elementami");
// //         console.log(formCurrentState.hiddenElements);
// //         if (formCurrentState.hiddenElements.includes(el.id)) return null;
// //         console.log("renderowany element o id:");
// //         console.log(el.id);
// //         switch (el.type) {
// //           case "selectGroup":
// //             return (
// //               <SelectGroup
// //                 id={el.id}
// //                 onChange={handleChange}
// //                 filled={typeof filledValue === "string" ? filledValue : ""}
// //                 name={el.name}
// //                 info={el.info}
// //                 description={el.description}
// //                 options={el.options}
// //                 key={index}
// //                 isImportant={el.isImportant}
// //                 isLoaded={el.isLoaded}
// //                 elementsToShow={el.elementsToShow}
// //               />
// //             );
// //           case "selectGroupCustom":
// //             return (
// //               <SelectGroupCustom
// //                 id={el.id}
// //                 onChange={handleChange}
// //                 filled={typeof filledValue === "string" ? filledValue : ""}
// //                 name={el.name}
// //                 info={el.info}
// //                 description={el.description}
// //                 options={el.options}
// //                 key={index}
// //                 isImportant={el.isImportant}
// //                 isLoaded={el.isLoaded}
// //                 elementsToShow={el.elementsToShow}
// //               />
// //             );
// //           case "radioElements":
// //             return (
// //               <RadioElements
// //                 id={el.id}
// //                 onChange={handleChange}
// //                 filled={typeof filledValue === "string" ? filledValue : ""}
// //                 name={el.name}
// //                 info={el.info}
// //                 description={el.description}
// //                 options={el.options}
// //                 key={index}
// //                 isImportant={el.isImportant}
// //                 elementsToShow={el.elementsToShow}
// //               />
// //             );
// //           case "inputNumber":
// //             return (
// //               <InputNumber
// //                 id={el.id}
// //                 onChange={handleChange}
// //                 filled={typeof filledValue === "number" ? filledValue : 0}
// //                 name={el.name}
// //                 info={el.info}
// //                 description={el.description}
// //                 key={index}
// //                 isImportant={el.isImportant}
// //                 isLoaded={el.isLoaded}
// //               />
// //             );
// //           case "inputText":
// //             return (
// //               <InputText
// //                 id={el.id}
// //                 onChange={handleChange}
// //                 filled={typeof filledValue === "number" ? filledValue : 0}
// //                 name={el.name}
// //                 info={el.info}
// //                 description={el.description}
// //                 key={index}
// //                 isImportant={el.isImportant}
// //                 isLoaded={el.isLoaded}
// //               />
// //             );
// //           case "textArea":
// //             return (
// //               <TextAreaElement
// //                 id={el.id}
// //                 onChange={handleChange}
// //                 filled={typeof filledValue === "string" ? filledValue : ""}
// //                 name={el.name}
// //                 info={el.info}
// //                 description={el.description}
// //                 options={el.options}
// //                 key={index}
// //                 isImportant={el.isImportant}
// //               />
// //             );
// //           case "quantity":
// //             return (
// //               <QuantityElement
// //                 id={el.id}
// //                 onChange={handleChange}
// //                 filled={typeof filledValue === "number" ? filledValue : 0}
// //                 name={el.name}
// //                 info={el.info}
// //                 description={el.description}
// //                 options={el.options}
// //                 key={index}
// //                 isImportant={el.isImportant}
// //               />
// //             );
// //           case "uploadElement":
// //             return (
// //               <UploadElement
// //                 id={el.id}
// //                 onChange={handleChange}
// //                 filled={Array.isArray(filledValue) ? filledValue : []}
// //                 name={el.name}
// //                 info={el.info}
// //                 description={el.description}
// //                 options={el.options}
// //                 key={index}
// //                 isImportant={el.isImportant}
// //               />
// //             );
// //           case "selectMaterial":
// //             return (
// //               <SelectMaterial
// //                 id={el.id}
// //                 onChange={handleChange}
// //                 filled={
// //                   typeof filledValue === "object" &&
// //                   filledValue !== null &&
// //                   !Array.isArray(filledValue)
// //                     ? filledValue
// //                     : {}
// //                 }
// //                 key={index}
// //                 selectedMaterial={el.selectedMaterial ?? defaultMaterial}
// //                 data={el.data ?? defaultData}
// //               />
// //             );

// //           default:
// //             return (
// //               <p key={index} className="bg-red-600">
// //                 Błędny element
// //               </p>
// //             );
// //         }
// //       })}
// //       {/* <pre className="bg-yellow-200">
// //         {JSON.stringify(formCurrentState, null, 2)}
// //       </pre> */}
// //     </div>
// //   );
// // };

// // export default FormSection;

// "use client";

// import SelectGroup from "./SelectGroup";
// import RadioElements from "./RadioElements";
// import TextAreaElement from "./TextAreaElement";
// import UploadElement from "./UploadElement";
// import QuantityElement from "./QuantityElement";
// import SelectMaterial from "./SelectMaterial";

// import type { FilledValueType } from "~/lib/FilledValueType";
// import { useFormContext } from "~/lib/FormContext";
// import InputNumber from "./InputNumber";
// import { useEffect } from "react";
// import InputText from "./InputText";
// import SelectGroupCustom from "./SelectGroupCustom";

// const FormSection = () => {
//   const { formDataToGenerate, formCurrentState, setFormCurrentState } =
//     useFormContext();

//   const defaultMaterial = {
//     image: "",
//     name: "Unknown",
//     infoLink: "#",
//     rate: 0,
//     rates: 0,
//   };
//   const defaultData = {
//     alertMesage: "",
//     categories: [],
//     tiles: [],
//   };

//   const handleChange = (id: number, value: FilledValueType["value"]) => {
//     setFormCurrentState((prev) => ({
//       ...prev,
//       filledForm: {
//         ...prev.filledForm,
//         values: prev.filledForm.values.map((item) =>
//           item.id === id ? { ...item, value } : item,
//         ),
//       },
//     }));
//   };

//   useEffect(() => {
//     // Only set the initial hidden elements once when the component mounts
//     setFormCurrentState((prev) => {
//       // Only update if hiddenElements hasn't been set yet
//       if (!prev.hiddenElements || prev.hiddenElements.length === 0) {
//         return {
//           ...prev,
//           hiddenElements: formDataToGenerate.hiddenElements,
//         };
//       }
//       return prev;
//     });
//   }, []); // Empty dependency array to run only on mount

//   useEffect(() => {
//     // Process initial form values to show/hide elements
//     const initialValues = formCurrentState.filledForm.values;

//     // Find elements with elementsToShow property
//     formDataToGenerate.values.forEach((formElement) => {
//       if (formElement.elementsToShow) {
//         // Find the corresponding filled value
//         const filledValue = initialValues.find(
//           (v) => v.id === formElement.id,
//         )?.value;

//         if (filledValue && typeof filledValue === "string") {
//           // For each element that should be shown based on this value
//           formElement.elementsToShow.forEach((showConfig) => {
//             if (showConfig.option === filledValue) {
//               // Remove from hidden elements
//               setFormCurrentState((prev) => ({
//                 ...prev,
//                 hiddenElements: prev.hiddenElements.filter(
//                   (id) => id !== showConfig.elementToShow,
//                 ),
//               }));
//             }
//           });
//         }
//       }
//     });
//   }, []); // Run only once on mount

//   return (
//     <div className="xl:pr-16">
//       {formDataToGenerate.values.map((el, index) => {
//         const filledValue = formCurrentState.filledForm.values.find(
//           (item) => item.id === el.id,
//         )?.value;

//         console.log("tablica z ukrytymi elementami");
//         console.log(formCurrentState.hiddenElements);
//         if (formCurrentState.hiddenElements.includes(el.id)) return null;
//         console.log("renderowany element o id:");
//         console.log(el.id);
//         switch (el.type) {
//           case "selectGroup":
//             return (
//               <SelectGroup
//                 id={el.id}
//                 onChange={handleChange}
//                 filled={typeof filledValue === "string" ? filledValue : ""}
//                 name={el.name}
//                 info={el.info}
//                 description={el.description}
//                 options={el.options}
//                 key={index}
//                 isImportant={el.isImportant}
//                 isLoaded={el.isLoaded}
//                 elementsToShow={el.elementsToShow}
//               />
//             );
//           case "selectGroupCustom":
//             return (
//               <SelectGroupCustom
//                 id={el.id}
//                 onChange={handleChange}
//                 filled={typeof filledValue === "string" ? filledValue : ""}
//                 name={el.name}
//                 info={el.info}
//                 description={el.description}
//                 options={el.options}
//                 key={index}
//                 isImportant={el.isImportant}
//                 isLoaded={el.isLoaded}
//                 elementsToShow={el.elementsToShow}
//               />
//             );
//           case "radioElements":
//             return (
//               <RadioElements
//                 id={el.id}
//                 onChange={handleChange}
//                 filled={typeof filledValue === "string" ? filledValue : ""}
//                 name={el.name}
//                 info={el.info}
//                 description={el.description}
//                 options={el.options}
//                 key={index}
//                 isImportant={el.isImportant}
//                 elementsToShow={el.elementsToShow}
//               />
//             );
//           case "inputNumber":
//             return (
//               <InputNumber
//                 id={el.id}
//                 onChange={handleChange}
//                 filled={typeof filledValue === "number" ? filledValue : 0}
//                 name={el.name}
//                 info={el.info}
//                 description={el.description}
//                 key={index}
//                 isImportant={el.isImportant}
//                 isLoaded={el.isLoaded}
//               />
//             );
//           case "inputText":
//             return (
//               <InputText
//                 id={el.id}
//                 onChange={handleChange}
//                 filled={typeof filledValue === "number" ? filledValue : 0}
//                 name={el.name}
//                 info={el.info}
//                 description={el.description}
//                 key={index}
//                 isImportant={el.isImportant}
//                 isLoaded={el.isLoaded}
//               />
//             );
//           case "textArea":
//             return (
//               <TextAreaElement
//                 id={el.id}
//                 onChange={handleChange}
//                 filled={typeof filledValue === "string" ? filledValue : ""}
//                 name={el.name}
//                 info={el.info}
//                 description={el.description}
//                 options={el.options}
//                 key={index}
//                 isImportant={el.isImportant}
//               />
//             );
//           case "quantity":
//             return (
//               <QuantityElement
//                 id={el.id}
//                 onChange={handleChange}
//                 filled={typeof filledValue === "number" ? filledValue : 0}
//                 name={el.name}
//                 info={el.info}
//                 description={el.description}
//                 options={el.options}
//                 key={index}
//                 isImportant={el.isImportant}
//               />
//             );
//           case "uploadElement":
//             return (
//               <UploadElement
//                 id={el.id}
//                 onChange={handleChange}
//                 filled={Array.isArray(filledValue) ? filledValue : []}
//                 name={el.name}
//                 info={el.info}
//                 description={el.description}
//                 options={el.options}
//                 key={index}
//                 isImportant={el.isImportant}
//               />
//             );
//           case "selectMaterial":
//             return (
//               <SelectMaterial
//                 id={el.id}
//                 onChange={handleChange}
//                 filled={
//                   typeof filledValue === "object" &&
//                   filledValue !== null &&
//                   !Array.isArray(filledValue)
//                     ? filledValue
//                     : {}
//                 }
//                 key={index}
//                 selectedMaterial={el.selectedMaterial ?? defaultMaterial}
//                 data={el.data ?? defaultData}
//               />
//             );

//           default:
//             return (
//               <p key={index} className="bg-red-600">
//                 Błędny element
//               </p>
//             );
//         }
//       })}
//       {/* <pre className="bg-yellow-200">
//         {JSON.stringify(formCurrentState, null, 2)}
//       </pre> */}
//     </div>
//   );
// };

// export default FormSection;
"use client";

import SelectGroup from "./SelectGroup";
import RadioElements from "./RadioElements";
import TextAreaElement from "./TextAreaElement";
import UploadElement from "./UploadElement";
import QuantityElement from "./QuantityElement";
import SelectMaterial from "./SelectMaterial";

import type { FilledValueType } from "~/lib/FilledValueType";
import { useFormContext } from "~/lib/FormContext";
import InputNumber from "./InputNumber";
import { useEffect, useState } from "react";
import InputText from "./InputText";
import SelectGroupCustom from "./SelectGroupCustom";

const FormSection = () => {
  const { formDataToGenerate, formCurrentState, setFormCurrentState } =
    useFormContext();
  const [initialized, setInitialized] = useState(false);

  const defaultMaterial = {
    image: "",
    name: "Unknown",
    infoLink: "#",
    rate: 0,
    rates: 0,
  };
  const defaultData = {
    alertMesage: "",
    categories: [],
    tiles: [],
  };

  const handleChange = (id: number, value: FilledValueType["value"]) => {
    setFormCurrentState((prev) => ({
      ...prev,
      filledForm: {
        ...prev.filledForm,
        values: prev.filledForm.values.map((item) =>
          item.id === id ? { ...item, value } : item,
        ),
      },
    }));
  };

  // Initialize the form state once
  useEffect(() => {
    if (!initialized) {
      // Start with the original hidden elements
      setFormCurrentState((prev) => ({
        ...prev,
        hiddenElements: [...formDataToGenerate.hiddenElements],
      }));

      setInitialized(true);
    }
  }, [formDataToGenerate.hiddenElements, initialized, setFormCurrentState]);

  // Process initial form values to show/hide elements
  useEffect(() => {
    if (initialized) {
      // Process the initial values to determine which elements should be shown
      const initialValues = formCurrentState.filledForm.values;

      // Find elements with elementsToShow property
      formDataToGenerate.values.forEach((formElement) => {
        if (formElement.elementsToShow) {
          // Find the corresponding filled value
          const filledValue = initialValues.find(
            (v) => v.id === formElement.id,
          )?.value;

          if (filledValue && typeof filledValue === "string") {
            // For each element that should be shown based on this value
            formElement.elementsToShow.forEach((showConfig) => {
              if (showConfig.option === filledValue) {
                // Process this element to show
                setFormCurrentState((prev) => {
                  // Only remove from hidden elements if it's currently hidden
                  if (prev.hiddenElements.includes(showConfig.elementToShow)) {
                    return {
                      ...prev,
                      hiddenElements: prev.hiddenElements.filter(
                        (id) => id !== showConfig.elementToShow,
                      ),
                    };
                  }
                  return prev;
                });
              }
            });
          }
        }
      });
    }
  }, [
    initialized,
    formCurrentState.filledForm.values,
    formDataToGenerate.values,
    setFormCurrentState,
  ]);

  return (
    <div className="xl:pr-16">
      {formDataToGenerate.values.map((el, index) => {
        const filledValue = formCurrentState.filledForm.values.find(
          (item) => item.id === el.id,
        )?.value;

        console.log("tablica z ukrytymi elementami");
        console.log(formCurrentState.hiddenElements);
        if (formCurrentState.hiddenElements.includes(el.id)) return null;
        console.log("renderowany element o id:");
        console.log(el.id);
        switch (el.type) {
          case "selectGroup":
            return (
              <SelectGroup
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "string" ? filledValue : ""}
                name={el.name}
                info={el.info}
                description={el.description}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
                isLoaded={el.isLoaded}
                elementsToShow={el.elementsToShow}
              />
            );
          case "selectGroupCustom":
            return (
              <SelectGroupCustom
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "string" ? filledValue : ""}
                name={el.name}
                info={el.info}
                description={el.description}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
                isLoaded={el.isLoaded}
                elementsToShow={el.elementsToShow}
              />
            );
          case "radioElements":
            return (
              <RadioElements
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "string" ? filledValue : ""}
                name={el.name}
                info={el.info}
                description={el.description}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
                elementsToShow={el.elementsToShow}
              />
            );
          case "inputNumber":
            return (
              <InputNumber
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "number" ? filledValue : 0}
                name={el.name}
                info={el.info}
                description={el.description}
                key={index}
                isImportant={el.isImportant}
                isLoaded={el.isLoaded}
              />
            );
          case "inputText":
            return (
              <InputText
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "number" ? filledValue : 0}
                name={el.name}
                info={el.info}
                description={el.description}
                key={index}
                isImportant={el.isImportant}
                isLoaded={el.isLoaded}
              />
            );
          case "textArea":
            return (
              <TextAreaElement
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "string" ? filledValue : ""}
                name={el.name}
                info={el.info}
                description={el.description}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
          case "quantity":
            return (
              <QuantityElement
                id={el.id}
                onChange={handleChange}
                filled={typeof filledValue === "number" ? filledValue : 0}
                name={el.name}
                info={el.info}
                description={el.description}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
          case "uploadElement":
            return (
              <UploadElement
                id={el.id}
                onChange={handleChange}
                filled={Array.isArray(filledValue) ? filledValue : []}
                name={el.name}
                info={el.info}
                description={el.description}
                options={el.options}
                key={index}
                isImportant={el.isImportant}
              />
            );
          case "selectMaterial":
            return (
              <SelectMaterial
                id={el.id}
                onChange={handleChange}
                filled={
                  typeof filledValue === "object" &&
                  filledValue !== null &&
                  !Array.isArray(filledValue)
                    ? filledValue
                    : {}
                }
                key={index}
                selectedMaterial={el.selectedMaterial ?? defaultMaterial}
                data={el.data ?? defaultData}
              />
            );

          default:
            return (
              <p key={index} className="bg-red-600">
                Błędny element
              </p>
            );
        }
      })}
      <pre className="bg-blue-300">
        {JSON.stringify(formCurrentState, null, 2)}
      </pre>
      ;
    </div>
  );
};

export default FormSection;
