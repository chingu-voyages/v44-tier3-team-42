import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { Show } from 'react-iconly';

import { TextField } from './TextField';

describe('<TextField />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { asFragment } = render(<TextField label="Foo" />);
      expect(asFragment()).toMatchSnapshot();
    });
    it('should match snapshot in default text-field with trailIcon prop', () => {
      const { asFragment } = render(
        <TextField label="Foo" trailIcon={<Show />} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('User Interactions', () => {
    it('should update value based on user input', async () => {
      render(<TextField label="Foo" />);
      const inputEl = screen.getByRole('textbox');
      await userEvent.click(inputEl);
      await userEvent.type(inputEl, 'example');
      expect(inputEl).toHaveValue('example');
    });
  });
}
)
