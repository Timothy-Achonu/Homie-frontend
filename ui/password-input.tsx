'use client';

import React, { ForwardedRef, useState } from 'react';
import clsx from 'clsx';
import { FieldValues } from 'react-hook-form';

import { Input, InputComponentType, InputProps } from './input';
import { SlashIcon } from 'lucide-react';
import { EyeIcon } from 'lucide-react';
const PasswordInputComponent = <FV extends FieldValues>(
  props: InputProps<FV>,
  ref?: ForwardedRef<HTMLInputElement>
) => {
  const [viewPassword, setViewPassword] = useState(false);

  // Password view toggle handler
  const togglePasswordView = () => setViewPassword((state) => !state);
  const inputType = viewPassword ? 'text' : 'password';

  // Resolves eye icon class name
  const hasHelperText = !!props.errorMsg || !!props.infoMsg;
  const eyeIconClassName = clsx(
    (hasHelperText && props.label) || props.label ? 'translate-y-[54px]' : 'translate-y-[20px]',
    'absolute right-4 cursor-pointer top-0'
  );

  return (
    <div className="relative h-fit w-full">
      <Input {...props} ref={ref} type={inputType} />

      <span className={eyeIconClassName} onClick={togglePasswordView}>
        {inputType === 'password' ? <EyeIcon size={20} /> : <SlashIcon size={20} />}
      </span>
    </div>
  );
};

const PasswordInput = React.forwardRef(PasswordInputComponent) as InputComponentType;

export { PasswordInput };
