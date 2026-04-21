import { render } from '@testing-library/react-native';
import * as React from 'react';

import App from './App';

test('renders app title', () => {
  const { getByText } = render(<App />);
  expect(getByText('FitFam')).toBeTruthy();
});
