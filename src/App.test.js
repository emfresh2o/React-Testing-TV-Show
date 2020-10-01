import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';
import { fetchShow as mockFetchShow } from './api/fetchShow';
import App from './App';

import {showData} from "./testdata";

jest.mock('./api/fetchShow');


test('App component renders when fetching data', async() => {
    mockFetchShow.mockResolvedValueOnce({
        data: showData
    });

    const { getByText } = render(
        <App/>
    )
    
    // Checking if fetching data when render
    getByText(/fetching data.../i);

    // Checking if App component renders when fetching data
    await wait(() => {
        getByText(/select a season/i);
    })
})

test('Dropdown menu works when clicked', async() => {
    mockFetchShow.mockResolvedValueOnce({
        data: showData
    });

    const { getByText } = render(
        <App/>
    )

    await wait(() => {
        getByText(/select a season/i);
    })

    fireEvent.mouseDown(getByText(/select a season/i));

    getByText(/season 1/i);
})

test('Season 1 displays from dropdown', async() => {
    mockFetchShow.mockResolvedValueOnce({
        data: showData
    });

    const { getByText } = render(
        <App/>
    )

    await wait(() => {
        getByText(/select a season/i);
    })

    fireEvent.mouseDown(getByText(/select a season/i));

    const select = getByText(/season 2/i);
    fireEvent.mouseDown(select);

    // episodes are displaying when specified season is selected
    expect(getByText(/chapter two/i)).toHaveTextContent(/trick or treat, freak/i);
})