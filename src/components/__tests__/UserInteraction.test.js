// Another general test that can check any interactive component- in this case a button:
import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import FloatingFooterButton from "../FloatingFooterButton";

test('Calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    
    // Render Component with onClick prop as the mock function
    render(<FloatingFooterButton onClick={handleClick} />);
    
    // Get button and click it
    const button = screen.getByText('Info');
    
    // Simulate Click Event
    fireEvent.click(button);
    
    // Check if onClick was Called
    expect(handleClick).toHaveBeenCalled();
});
