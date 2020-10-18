import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders App.tx', () => {
  const { getByText, getByTestId } = render(<App />);
  const rootElement = getByTestId('app-element')
  expect(rootElement).toBeInTheDocument();
});
