import React from 'react'; // so that we can use JSX syntax
import {
 render,
 cleanup,
 waitForElement
} from '@testing-library/react'; // testing helpers
import userEvent from '@testing-library/user-event' // testing helpers for imitating user events

test('renders learn react link', () => {
  let myTest = 3;

  expect(myTest).toBe(3)
});
