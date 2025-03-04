import { render, screen } from "@testing-library/react";
import AboutUs from "../../pages/AboutUs"; //This can be adjusted to test individual components

test('Should render <AboutUs />', () => {
    render(<AboutUs />);
    // If the component renders some specific text or another component, testing the expectations. For example:
    // If AboutUs component renders a heading with text 'About Us', It will have:
    const heading = screen.getByText(/about bookhub/i);
    expect(heading).toBeInTheDocument();
});
