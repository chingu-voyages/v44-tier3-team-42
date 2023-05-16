'use client';

/* eslint-disable react/jsx-props-no-spreading */
import type {
  ForwardRefExoticComponent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  RefAttributes,
} from 'react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const styles = {
  root: '',
  label: 'text-sm leading-tight tracking-wide text-subtleLight',
  input: 'text-base leading-normal tracking-normal text-subtleDark',
} as const;

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * Label text associated to component
   */
  label: string;
  /**
   * Trailing icon for component
   */
  trailIcon?: React.ReactNode;
  type?: Extract<HTMLInputTypeAttribute, 'text' | 'password'>;
};

export const TextField: ForwardRefExoticComponent<
  TextFieldProps & RefAttributes<HTMLInputElement>
> = forwardRef(
  ({ id, label, type = 'text', trailIcon: Icon, className, ...props }, ref) => (
    <label className={styles.root} htmlFor={id}>
      <p className={styles.label}>{label}</p>
      <div className="flex items-center h-12 p-3 mt-2 border rounded-lg gap-x-4 border-subtleLight">
        <input
          ref={ref}
          id={id}
          type={type}
          className={twMerge(styles.input, className)}
          {...props}
        />
        {Icon || null}
      </div>
    </label>
  ),
);

if (process.env.NODE_ENV !== 'production') {
  TextField.displayName = 'TextField';
}
