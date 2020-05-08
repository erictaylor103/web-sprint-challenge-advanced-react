import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm />)
});

test("form shows success message on submit with form details", () => {
    const {getByLabelText, getByText} = render(<CheckoutForm />)

    const firstNameInput = getByLabelText(/first name/i);
    const lastNameInput  = getByLabelText(/last name/i);
    const addressInput   = getByLabelText(/address:/i);
    const cityInput      = getByLabelText(/city/i);
    const stateInput     = getByLabelText(/state/i);
    const zipInput       = getByLabelText(/zip/i);

    //type dummy data into input fields so we can test if the data can be entered
    fireEvent.change(firstNameInput, { target: { value: 'Eric' } });
    fireEvent.change(lastNameInput, { target: { value: 'Johnson' } });
    fireEvent.change(addressInput, { target: { value: '124 South Street' } });
    fireEvent.change(cityInput, {target: { value: 'Miami' }});
    fireEvent.change(stateInput, {target: { value: 'Florida' }});
    fireEvent.change(zipInput, {target: { value: '33169' }});

    //simulate the button click
    const button = getByText(/checkout!/i);
    fireEvent.click(button);

    //assert that the following inputs can be added when we click on the submit button
    const firstName = getByText(/eric/i);
    expect(firstName).toBeInTheDocument();

    const lastName = getByText(/johnson/i);
    expect(lastName).toBeInTheDocument();

    const address = getByText(/124 south street/i);
    expect(address).toBeInTheDocument();

    const city = getByText(/miami/i);
    expect(city).toBeInTheDocument();

    const state = getByText(/florida/i);
    expect(state).toBeInTheDocument();

    const zip = getByText(/33169/i);
    expect(zip).toBeInTheDocument();

});
