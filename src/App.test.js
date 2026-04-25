import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Boolforge application', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: /boolforge/i });
  expect(titleElement).toBeInTheDocument();
});
