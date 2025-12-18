'use client';

import React, { ForwardedRef } from 'react';
import clsx from 'clsx';
import { FieldValues, UseFormRegisterReturn, Path, InternalFieldName } from 'react-hook-form';

import { InputProps } from './index.types';
import { Typography } from '../typography';
import { cn } from '@/utils';

const InputComponent = <FV extends FieldValues>(
  props: InputProps<FV>,
  ref?: ForwardedRef<HTMLInputElement>
) => {
  const {
    placeholder,
    errorMsg,
    successMsg,
    label,
    register,
    name,
    customClassName,
    hideErrorMsg,
    customContainerClassName,
    customLabelClassName,
    leftIcon,
    ...rest
  } = props;

  // React hook form register
  const registerInput: UseFormRegisterReturn<Path<FV>> | object = register
    ? register(name, { required: rest.required })
    : {};

  return (
    <div className={cn('relative z-0 flex w-full flex-col', customContainerClassName)}>
      {label && (
        <label
          className={clsx(
            'mb-4 w-fit text-body-s font-semibold first-letter:capitalize',
            errorMsg ? 'text-error' : 'text-gray-3',
            customLabelClassName,
          )}
          htmlFor={name}
        > 
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-gray-4">
            {leftIcon}
          </span>
        ) : null} 
        <input
          className={cn(
            `peer block max-h-14 w-full appearance-none rounded-xl shadow-input bg-white pr-6 py-5 text-[0.875rem] font-semibold placeholder:font-normal placeholder:text-gray-4 autofill:bg-white focus:outline-none`,
            leftIcon ? 'pl-12' : 'pl-6',
            rest.disabled
              ? 'disabled:cursor-not-allowed disabled:bg-primary-light-100 disabled:font-semibold  disabled:text-gray-3'
              : '',
            errorMsg
              ? 'border-error text-error focus:ring-error'
              : successMsg
              ? 'border-success text-success focus:border-success focus:ring-success'
              : '',
            customClassName
          )} 
          id={name}
          placeholder={placeholder}
          onWheel={(e) => { 
            (e.currentTarget as unknown as HTMLInputElement).blur();
          }}
          {...rest}
          ref={ref}
          {...registerInput}
        />
      </div>

      {!hideErrorMsg && (errorMsg || successMsg) ? (
        <Typography
          variant="text-xs"
          fontWeight="regular"
          color={errorMsg ? 'error' : 'success'}
          className="mt-2"
        >
          {errorMsg || successMsg}
        </Typography>
      ) : null}
    </div>
  );
};

export type InputComponentType = <FV extends FieldValues, TFieldName extends InternalFieldName>(
  props: InputProps<FV> & {
    ref?: React.ForwardedRef<HTMLInputElement> | UseFormRegisterReturn<TFieldName>;
  }
) => ReturnType<typeof InputComponent>;

const Input = React.forwardRef(InputComponent) as InputComponentType;

const RadioInputComponent = <FV extends FieldValues>(
  props: InputProps<FV>,
  ref?: ForwardedRef<HTMLInputElement>
) => {
  const {
    placeholder,
    errorMsg,
    successMsg,
    label,
    register,
    name,
    customClassName,
    customContainerClassName,
    hideErrorMsg,
    customLabelClassName,
    ...rest  
  } = props;

  // React hook form register
  const registerInput: UseFormRegisterReturn<Path<FV>> | object = register
    ? register(name, { required: rest.required })
    : {}; 
  return (
    <div
      className={cn(` relative z-0 mt-2 flex w-full items-center ${customContainerClassName}`)}
    >
      <input
        className={cn(
          `appeagrance-none peer block h-[20px] max-h-14 w-[20px] rounded-xl
          font-semibold placeholder:font-normal placeholder:text-primary autofill:bg-white focus:outline-none`,
          rest.disabled
            ? 'disabled:cursor-not-allowed disabled:bg-primary-light-100 disabled:font-semibold  disabled:text-gray-3'
            : '',

          errorMsg
            ? 'border-error text-error focus:ring-error'
            : successMsg
            ? 'border-success text-success focus:border-success focus:ring-success'
            : '',
          customClassName
        )}
        type="radio"
        id={name}
        name={name}
        placeholder={placeholder}
        {...rest}
        ref={ref} 
        {...registerInput}
      />
      {label && (
        <label
          className={clsx(
            'w-fit text-body-s font-semibold first-letter:capitalize',
            errorMsg ? 'text-error' : 'text-gray-3',
            customLabelClassName
          )}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      {!hideErrorMsg && (errorMsg || successMsg) ? (
        <Typography
          variant="text-xs"
          fontWeight="regular"
          color={errorMsg ? 'error' : 'success'}
          className="mt-2"
        >
          {errorMsg || successMsg}
        </Typography>
      ) : null}
    </div>
  );
};

export type RadioInputComponentType = <
  FV extends FieldValues,
  TFieldName extends InternalFieldName
>(
  props: InputProps<FV> & {
    ref?: React.ForwardedRef<HTMLInputElement> | UseFormRegisterReturn<TFieldName>;
  }
) => ReturnType<typeof InputComponent>;

const RadioInput = React.forwardRef(RadioInputComponent) as InputComponentType;

export { Input, RadioInput };
export * from './index.types';
