import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { act } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = ReactDOMClient.createRoot(div);

    act(() => {
      root.render(<App />);
      root.unmount();
    });
  });
})
