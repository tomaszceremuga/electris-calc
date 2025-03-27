import { type UploadedFile } from "~/lib/UploadedFileType";
import { type SelectedSurfaceType } from "./SelectedSurfaceType";

export type FilledValueType = {
  id: number;
  value: string | number | SelectedSurfaceType | UploadedFile[];
};
