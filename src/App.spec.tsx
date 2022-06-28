import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it("should render 'React'", () => {
    render(<App />);

    const text = screen.getAllByText(/React/);
    expect(text).toHaveLength(2);
  });
});
