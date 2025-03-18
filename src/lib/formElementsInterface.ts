export interface formElementsInterface {
  id: number;
  onChange: (id: number, value: string | number) => void;
  filled?: string;
  name?: string;
  info?: string;
  options?: string[];
  isImportant?: boolean;
  description?: string;
}
