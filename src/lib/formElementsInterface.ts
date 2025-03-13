export interface formElementsInterface {
  id: number;
  onChange: (id: number, value: string) => void;
  name?: string;
  info?: string;
  options?: string[];
  isImportant?: boolean;
  description?: string;
}
