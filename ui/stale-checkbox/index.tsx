'use client';

import { FieldValues, Path, UseFormRegisterReturn } from 'react-hook-form';
import { CheckboxProps } from './index.types';
import styles from './index.module.scss';
import React, { ForwardedRef } from 'react';
import clsx from 'clsx';
const CheckBoxComponent = <FV extends FieldValues>(
  props: CheckboxProps<FV>,
  ref?: ForwardedRef<HTMLInputElement>
) => {
  const {
    label,
    register,
    name,
    children,
    shouldHaveBorder,
    customLabelClassName,
    customContainerClassName,
    ...rest
  } = props;

  // React hook form register
  const registerCheckbox: UseFormRegisterReturn<Path<FV>> | object = register
    ? register(name, { required: rest.required })
    : {};

  return (
    <div
      className={clsx(
        'flex w-fit items-center gap-2',
        shouldHaveBorder && 'rounded-lg border border-[#BDBDBD] px-[1.1rem] py-3.5',
        customContainerClassName
      )}
    >
      <input
        type="checkbox"
        id={name}
        ref={ref}
        {...rest}
        {...registerCheckbox}
        className={clsx(
          styles.checkbox,
          rest.className,
          rest.readOnly && 'read-only:outline-0 read-only:focus:ring-0',
          '!mt-0 flex items-center justify-center'
        )}
      />

      <label
        className={clsx('flex cursor-pointer items-center text-blue-100', customLabelClassName)}
        htmlFor={name}
      >
        {label ? label : children}
      </label>
    </div>
  );
};

const CheckBox = React.forwardRef(CheckBoxComponent) as <FV extends FieldValues>(
  props: CheckboxProps<FV> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof CheckBoxComponent>;

export { CheckBox };
export * from './index.types';
