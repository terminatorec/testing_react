import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { AddTransaction } from './AddTransaction';
import '@testing-library/jest-dom/extend-expect'
import { GlobalProvider } from '../../context/GlobalState';

describe('AddTransaction.js works', () => {
    afterEach(cleanup);

    it('Ui tests', () => {

        render(<AddTransaction />)

        const title = screen.getByText(/add new transaction/i)
        expect(title).toBeInTheDocument()

        const placeholder = screen.getByPlaceholderText(/enter text/i)
        expect(placeholder).toBeInTheDocument()

        const desc = screen.getByText(/(negative - expense, positive - income)/i)
        expect(desc).toBeInTheDocument()

        const btn = screen.getByText(/add transaction/i)
        expect(btn).toBeInTheDocument()
    })


    it('user can interacte with ui', () => {
        render(
            <GlobalProvider>
                <AddTransaction />
            </GlobalProvider>
        )

        //1 ожидание что напечатаный текст отобразится в поле ввода
        fireEvent.change(screen.getByTestId('input-text'), {
            target: {
                value: "React-test-text-waahahha"
            }
        })
        expect(screen.getByDisplayValue(/React-test-text-waahahha/i)).toBeInTheDocument()
        
        //1 ожидание что напечатаный текст отобразится в поле ввода
        fireEvent.change(screen.getByTestId('input-count'), {
            target: {
                value: 919191999
            }
        })
        expect(screen.getByDisplayValue(/919191999/i)).toBeInTheDocument()
        
        //1 после клика на кнопку, должны сбросится записи в полях ввода
        fireEvent.click(screen.getByTestId('test-btn'))

        //1 ожидание что после нажатия кнопки все значения будут пустыми
        expect(screen.queryByDisplayValue(/React-test-text-waahahha/i)).toBeNull()
        expect(screen.queryByDisplayValue(/919191999/i)).toBeNull()

    })
})