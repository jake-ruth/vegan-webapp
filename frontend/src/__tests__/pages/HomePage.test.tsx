import React from 'react';
import { render } from '@testing-library/react';
import { HomePage } from '../../pages/HomePage';

test('renders App.tx', () => {
  const { getByText } = render(<HomePage />);
  const newRecipesElement = getByText('New Recipes:')

  console.log("ELEMENT: ", newRecipesElement.innerHTML);
    
  expect(newRecipesElement).toBeInTheDocument();
});
