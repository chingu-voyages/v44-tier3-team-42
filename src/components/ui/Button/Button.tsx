'use client';

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import type {
  ButtonHTMLAttributes,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const styles = {
  root: '',
  size: {
    sm: 'text-xs leading-none tracking-[0.0375em] py-2 px-3 rounded-lg h-8',
    md: 'text-sm leading-tight tracking-wide py-3 px-4 rounded-xl h-11',
    lg: 'text-base leading-normal tracking-[0.0125em] py-4 px-5 rounded-2xl h-14',
  },
  variant: {
    primary: 'text-white bg-primary',
    secondary: 'text-primary bg-primarySubtle',
    tertiary: 'text-primary bg-transparent',
  },
} as const;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * Size of the component
   * @default 'md'
   */
  size?: keyof typeof styles.size;
  /**
   * Variant of the component
   */
  variant?: keyof typeof styles.variant;
  /**
   * Leading icon for component
   */
  leadIcon?: React.ReactNode;
};

export const Button: ForwardRefExoticComponent<
  ButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef(
  (
    {
      children,
      type = 'button',
      size = 'md',
      variant = 'primary',
      leadIcon: Icon,
      className,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={twMerge(
        styles.root,
        styles.size[size],
        styles.variant[variant],
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-x-[6px]">
        {Icon || null}
        <p>{children}</p>
      </div>
    </button>
  ),
);

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}
