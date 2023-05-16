import { render, screen } from 'test-utils';
import userEvent from '@testing-library/user-event';
import { Star } from 'react-iconly';

import { Button } from './Button';

describe('<Button />', () => {
  describe('Snapshots', () => {
    it('should match snapshot', () => {
      const { asFragment } = render(<Button />);
      expect(asFragment()).toMatchSnapshot();
    });
    it('should match snapshot in default button with leadIcon prop', () => {
      const { asFragment } = render(<Button leadIcon={<Star />} />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe('User Interactions', () => {
    it('should trigger onClick callback when clicked', async () => {
      const mockFn = jest.fn();
      render(<Button onClick={mockFn}>Foo</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(mockFn).toHaveBeenCalled();
    });
  });
});
