import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

export interface CheckboxProps<IFormValues extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  name: Path<IFormValues>;
  register?: UseFormRegister<IFormValues>;
  required?: boolean;
  children?: React.ReactNode;
  shouldHaveBorder?:boolean;  
  customLabelClassName?:string;
  customContainerClassName?:string;
}
  