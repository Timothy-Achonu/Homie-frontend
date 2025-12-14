import { LegacyRef } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

export interface TextAreaProps<IFormValues extends FieldValues>
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  id?: string;
  label?: React.ReactNode | string;
  rightLabel?: React.ReactNode | string;
  name: Path<IFormValues>;
  errorMsg?: React.ReactNode | string;
  infoMsg?: React.ReactNode | string;
  successMsg?: React.ReactNode | string;
  register?: UseFormRegister<IFormValues>;
  required?: boolean;
  customClassName?: string;
  containerClassName?: string;
  ref?: LegacyRef<HTMLTextAreaElement>;
  isSMSInput?: boolean;
  charCount?: number;
  pageCount?: number;
  maxCharacters?: number;
  totalPages?: number | 'unlimited';  
}
       