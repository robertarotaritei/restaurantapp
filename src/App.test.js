import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('404 Not Found', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/It seems that this page does not exist/i);
  expect(linkElement).toBeInTheDocument();
});