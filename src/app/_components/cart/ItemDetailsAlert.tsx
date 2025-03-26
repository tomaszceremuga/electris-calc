// "use client";

// import { X, Edit } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { FieldRow } from "./FieldRow";
// import { type CartElementType } from "~/lib/CartElementType";
// import { type FilledFormType } from "~/lib/FilledFormType";
// import { type FormDataToGenerateType } from "~/lib/FormDataToGenerateType";

// interface ItemDetailsAlertProps {
//   item?: CartElementType;
//   onClose: () => void;
//   onEdit: () => void;
// }

// export function ItemDetailsAlert({
//   item,
//   onClose,
//   onEdit,
// }: ItemDetailsAlertProps) {
//   if (!item) return null;

//   const filledForm = item.filledForm as FilledFormType;
//   const formDataToGenerate = item.formDataToGenerate as FormDataToGenerateType;

//   // const allFields = formDataToGenerate.values.map((field) => {
//   //   const filledValue = filledForm.values.find(
//   //     (value) => value.id === field.id,
//   //   );
//   //   return {
//   //     name: field.name,
//   //     value: filledValue ? filledValue.value : "Nie określono",
//   //     id: field.id,
//   //     isImportant: field.isImportant,
//   //   };
//   // });
//   const allFields = (formDataToGenerate?.values || []).map((field) => {
//     const filledValue = filledForm?.values?.find(
//       (value) => value.id === field.id
//     );

//     return {
//       name: field.name,
//       value: filledValue ? filledValue.value : "Nie określono",
//       id: field.id,
//       isImportant: field.isImportant,
//     };
//   });

//   const sortedFields = [
//     ...allFields.filter((field) => field.isImportant),
//     ...allFields.filter((field) => !field.isImportant),
//   ];

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="max-h-[80vh] w-full max-w-md rounded-lg bg-background shadow-lg"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between border-b p-4">
//           <h3 className="text-lg font-semibold">Szczegóły elementu</h3>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={onEdit}
//               className="h-8 w-8"
//             >
//               <Edit className="h-4 w-4" />
//               <span className="sr-only">Edytuj</span>
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={onClose}
//               className="h-8 w-8"
//             >
//               <X className="h-4 w-4" />
//               <span className="sr-only">Zamknij</span>
//             </Button>
//           </div>
//         </div>
//         <div className="max-h-[50vh] overflow-y-auto p-4">
//           <div className="grid gap-2">
//             {sortedFields.map((field, index) => (
//               <FieldRow
//                 key={index}
//                 name={typeof field.name == "string" && field ? field.name : ""}
//                 value={field.value}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="border-t p-4">
//           <Button variant="outline" className="w-full" onClick={onClose}>
//             Zamknij
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
