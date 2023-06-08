'use client';

/* eslint-disable react/jsx-props-no-spreading */

// NOTE: Replace all instances of 'Example' with the name of your component.
// Also, remember to include an `index.ts` file to export this component

export type ExampleProps = {};

export const Example: React.FC<ExampleProps> = () => (
  <div>This is an example component</div>
);

if (process.env.NODE_ENV !== 'production') {
  Example.displayName = 'Example';
}

