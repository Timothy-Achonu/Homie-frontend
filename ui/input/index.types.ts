import { LegacyRef, ReactNode } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

export interface InputProps<IFormValues extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: React.ReactNode | string;
  name: Path<IFormValues>;
  hideErrorMsg?: boolean;
  errorMsg?: React.ReactNode | string;
  infoMsg?: React.ReactNode | string;
  successMsg?: React.ReactNode | string;
  register?: UseFormRegister<IFormValues>;
  required?: boolean;
  customClassName?: string;
  customContainerClassName?: string;
  customLabelClassName?: string;
  ref?: LegacyRef<HTMLInputElement>;
  leftIcon?: ReactNode;
}
