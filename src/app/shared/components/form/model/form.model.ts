export interface FormField {
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'date';
  label: string;
  name: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validators?: any[];
}
