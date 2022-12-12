import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import { Transaction } from './Transaction';

describe('AddTransaction.js works', () => {
    afterEach(cleanup);

    it('Ui tests', () => {

        let trans = {
            "id": 19382972,
            "text": "444",
            "amount": 44
        }

        render(<Transaction transaction={trans} />)

        expect(screen.getByTestId('transaction-text').textContent).toBe('444')
        expect(screen.getByTestId('transaction-cost').textContent).toBe('+$ 44.00')

        //1 здесь можно затестить стили css




    })



})