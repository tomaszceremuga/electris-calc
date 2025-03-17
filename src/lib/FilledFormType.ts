import { type UploadedFile } from "~/lib/UploadedFileType";
import { type SelectedSurfaceType } from "./SelectedSurfaceType";

export type FilledFormType = {
  id: number;
  uploadedFiles: UploadedFile[];
  values: Array<Record<string, string | SelectedSurfaceType | UploadedFile[]>>;
};
