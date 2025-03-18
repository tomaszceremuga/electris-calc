import { type FilledValueType } from "./FilledValueType";
import { type UploadedFile } from "~/lib/UploadedFileType";

export type FilledFormType = {
  id: number;
  uploadedFiles: UploadedFile[];
  values: Array<FilledValueType>;
};
