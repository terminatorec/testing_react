import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { AddTransaction } from '.././AddTransaction/AddTransaction';
import '@testing-library/jest-dom/extend-expect'
import { GlobalProvider } from '../../context/GlobalState';
import { IncomeExpenses } from './IncomeExpenses';

describe('AddTransaction.js works', () => {
    afterEach(cleanup);

    it('Ui tests', () => {

        render(<IncomeExpenses />)

        expect(screen.getByText(/income/i)).toBeInTheDocument()
        expect(screen.getByText(/expense/i)).toBeInTheDocument()



    })


    it('user can interacte with ui', () => {
        render(
            <GlobalProvider>
                <IncomeExpenses />
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
        expect(screen.getByTestId('income').textContent).toBe('$ 0.00')
        expect(screen.getByTestId('expense').textContent).toBe('$ 150.00')
        
        operation('clothes', -550)
        expect(screen.getByTestId('income').textContent).toBe('$ 0.00')
        expect(screen.getByTestId('expense').textContent).toBe('$ 700.00')
        
        operation('salary', 1500)
        expect(screen.getByTestId('income').textContent).toBe('$ 1,500.00')
        expect(screen.getByTestId('expense').textContent).toBe('$ 700.00')

    })
})