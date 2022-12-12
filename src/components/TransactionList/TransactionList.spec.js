import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { AddTransaction } from '.././AddTransaction/AddTransaction';
import '@testing-library/jest-dom/extend-expect'
import { GlobalProvider } from '../../context/GlobalState';
import { TransactionList } from './TransactionList';

describe('AddTransaction.js works', () => {
    afterEach(cleanup);

    it('Ui tests', () => {
        render(<TransactionList />)
        expect(screen.getByText(/history/i)).toBeInTheDocument()
    })


    it('user can interacte with ui', () => {
        render(
            <GlobalProvider>
                <TransactionList />
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
        expect(screen.getAllByTestId('transaction-text')[0].textContent).toBe('food')
        
        operation('clothes', -550)
        expect(screen.getAllByTestId('transaction-text')[0].textContent).toBe('clothes')

        
        operation('salary', 1500)
        expect(screen.getAllByTestId('transaction-text')).toHaveLength(3)
        expect(screen.getAllByTestId('transaction-text')[0].textContent).toBe('salary')
        expect(screen.getAllByTestId('transaction-text')[1].textContent).toBe('clothes')
        expect(screen.getAllByTestId('transaction-text')[2].textContent).toBe('food')
        

    })
})