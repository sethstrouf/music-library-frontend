import { render, screen } from '@testing-library/react';
import Footer from '../src/components/Footer';


describe('Footer', () => {
  it('displays current year', () => {
    render(<Footer />);

    const element = screen.getByTestId('copyright')
    expect(element).toHaveTextContent(new Date().getFullYear().toString())
  });
});
