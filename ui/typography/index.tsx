import { TypographyProps, variantMapping } from './types';
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';
import { agile, poppins } from '@/app/styles/fonts';

const typography = cva('', {
  variants: {
    intent: {
      'text-xs': 'text-xs-fluid',
      'text-sm': 'text-sm-fluid',
      'text-md': 'text-md-fluid',
      'text-lg': 'text-lg-fluid',
      'text-xl': 'text-xl-fluid',
      'display-xs': 'text-display-xs-fluid',
      'display-sm': 'text-display-sm-fluid',
      'display-md': 'text-display-md-fluid',
      'display-lg': 'text-display-lg-fluid',
      'display-xl': 'text-display-xl-fluid',
      'display-2xl': 'text-display-2xl-fluid',
    },   
      
    font: {
      poppins: 'font-poppins', 
      agile: 'font-agile',      
    },  
    color: { 
      white: 'text-white',       
      'gray-1': 'text-gray-1', 
      'gray-500': 'text-gray-500',
      'gray-600': 'text-gray-600',
      'gray-700': 'text-gray-700',
      info: 'text-info', 
      success: 'text-success',
      warn: 'text-warning',
      error: 'text-error',
      secondary: 'text-secondary-main',
      primary: 'text-primary-900',
      'quaternary-foreground': 'text-quaternary-foreground',
      'primary-light-100': 'text-primary-light-100', 
      'secondary-100': 'text-secondary-100',
      'tertiary-600': 'text-tertiary-600',
      inherit: 'text-inherit',
    },
    fontWeight: {
      thin: 'font-thin',
      'extra-light': 'font-extra-light', 
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      'semi-bold': 'font-semibold',
      bold: 'font-bold',
      'extra-bold': 'font-extra-bold', 
      black: 'font-black',
    }, 
    underline: { always: 'underline', hover: 'hover:underline', none: '' },
    align: {
      center: 'text-center',
      start: 'text-start',
      end: 'text-end',
      left: 'text-left',
      right: 'text-right', 
      justify: 'text-justify',
    },
  },
  defaultVariants: {
    font: 'poppins',
  },
  compoundVariants: [],
});

const filterProps = (tag: keyof React.JSX.IntrinsicElements, props: TypographyProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onToggle: _onToggle, align: _align, ...rest } = props;

  // Elements that support onToggle
  const supportsToggle = tag === 'details' || tag === 'dialog';
  // Note: For popover attribute, you'd need to check props, not just tag

  if (tag === 'table') {
    // Remove 'align' if tag is 'table' (align is deprecated on table)
    return rest;
  }

  // Remove 'onToggle' if tag doesn't support it
  if (!supportsToggle) {
    return rest;
  }

  // For elements that support onToggle, remove align but keep onToggle
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { align: __align, ...restForToggleElements } = props;
  return restForToggleElements;
};


// Typography component
const Typography: React.FC<TypographyProps> = (props) => {
  const {
    variant = 'text-md',
    tag,
    underline = 'none',
    fontWeight,
    gutterBottom,
    noWrap,
    align = 'left',
    color = 'gray-1',
    font = 'poppins',
    className = '',
    children, 
    ...rest
  } = props; 

  // Resolved tag
  const resolvedTag = (tag || variantMapping[variant] || 'p') as keyof React.JSX.IntrinsicElements;

  // Filtered props
  const filteredProps = filterProps(resolvedTag, { ...rest, align });

  // Classes
  const additionalClassName = cn(
    gutterBottom && 'mb-4',
    noWrap && 'overflow-hidden text-ellipsis whitespace-nowrap'
  ); 
  
  // Generate typography classes
  const typographyClasses = typography({   
    intent: variant,
    underline,
    fontWeight, 
    color,
    align,
    font,
  });

  
  return React.createElement(
    resolvedTag,
    {
      ...filteredProps,
      className: cn( 
        typographyClasses,
        additionalClassName,
        className,

      ),
    }, 
    children
  );
};

export { Typography }; 
export * from './types'; 
