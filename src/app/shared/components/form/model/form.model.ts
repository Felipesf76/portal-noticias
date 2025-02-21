export interface FormField {
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'date' | 'file';
  label: string;
  name: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validators?: any[];
  accept?: string;
}
