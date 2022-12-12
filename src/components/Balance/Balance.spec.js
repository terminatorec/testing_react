import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { AddTransaction } from '.././AddTransaction/AddTransaction';
import '@testing-library/jest-dom/extend-expect'
import { GlobalProvider } from '../../context/GlobalState';
import { Balance } from './Balance';

describe('AddTransaction.js works', () => {
    afterEach(cleanup);

    it('Ui tests', () => {

        render(<Balance />)

        const title = screen.getByText(/your balance/i)
        expect(title).toBeInTheDocument()


    })


    it('user can interacte with ui', () => {
        render(
            <GlobalProvider>
                <Balance />
                <AddTransaction />
            </GlobalProvider>
        )


        const operation = (text, cost) => {
            fireEvent.change(screen.getByTestId('input-text'), {
                target: {
                    value: text
                }
            })

            fireEvent.change(screen.getByTestId('input-count'), {
                target: {
                    value: cost
                }
            })

            fireEvent.click(screen.getByTestId('test-btn'))
        }


        operation('food', -150)
        expect(screen.getByText(/\$ -150\.00/)).toBeInTheDocument()

        operation('clothes', -550)
        expect(screen.getByText(/\$ -700\.00/)).toBeInTheDocument()

        operation('salary', 1500)
        expect(screen.getByText(/\$ 800\.00/)).toBeInTheDocument()


        operation('zer0', 0)
        expect(screen.getByText(/\$ 800\.00/)).toBeInTheDocument()


    })
})