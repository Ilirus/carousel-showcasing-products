import { render, screen } from '@testing-library/react';
import Button from './Button';
import { PlusIcon } from '@heroicons/react/24/solid'; // Example icons

describe('Button', () => {
  it('should render the button with text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should render the button with an icon on the left', () => {
    render(<Button icon={<PlusIcon className="h-5 w-5" />}>Add Item</Button>);
    const buttonElement = screen.getByText('Add Item');
    expect(buttonElement).toBeInTheDocument();
    // Check if the icon span exists and contains the icon
    expect(buttonElement.previousElementSibling).toHaveClass('flex items-center justify-center');
    expect(buttonElement.previousElementSibling?.firstChild).toHaveClass('h-5 w-5');
  });

  it('should render the button with an icon on the right', () => {
    render(<Button icon={<PlusIcon className="h-5 w-5" />} iconPosition="right">Add Item</Button>);
    const buttonElement = screen.getByText('Add Item');
    expect(buttonElement).toBeInTheDocument();
    // Check if the icon span exists and contains the icon
    expect(buttonElement.nextElementSibling).toHaveClass('flex items-center justify-center');
    expect(buttonElement.nextElementSibling?.firstChild).toHaveClass('h-5 w-5');
  });

  // it('should call onClick handler when clicked', () => {
  //   const handleClick = jest.fn();
  //   render(<Button onClick={handleClick}>Click Me</Button>);
  //   const button = screen.getByText('Click Me');
  //   fireEvent.click(button);
  //   expect(handleClick).toHaveBeenCalledTimes(1);
  // });

  it('should apply custom classes', () => {
    render(<Button className="custom-class">Styled Button</Button>);
    expect(screen.getByText('Styled Button')).toHaveClass('custom-class');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText('Disabled Button')).toBeDisabled();
    expect(screen.getByText('Disabled Button')).toHaveClass('bg-gray-400 cursor-not-allowed');
  });
});
