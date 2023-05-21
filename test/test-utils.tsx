/* eslint-disable import/no-extraneous-dependencies */
import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, options);

export * from '@testing-library/react';
export { customRender as render };
