import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
	it("should render 'React'", () => {
		render(<App />);

		const text = screen.getAllByText(/React/);
		expect(text).toHaveLength(2);
	});

	it('should render a Button', () => {
		render(<App />);

		const buttonContent = screen.getByRole('button', { name: /count/ });
		expect(buttonContent).toBeInTheDocument();
	});
});
