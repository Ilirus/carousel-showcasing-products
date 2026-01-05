import { render, screen } from '@testing-library/react'
import { type FC, type PropsWithChildren, createContext, useContext } from 'react'
import { describe, it, expect } from 'vitest'

import ComposeProviders from './ComposeProviders'

const TestContext1 = createContext('Default1')
const TestContext2 = createContext('Default2')

const Provider1: FC<PropsWithChildren> = ({ children }) => (
    <TestContext1.Provider value="Value1">
        {children}
    </TestContext1.Provider>
)

const Provider2: FC<PropsWithChildren> = ({ children }) => (
    <TestContext2.Provider value="Value2">
        {children}
    </TestContext2.Provider>
)

const ConsumerComponent: FC = () => {
    const val1 = useContext(TestContext1)
    const val2 = useContext(TestContext2)
    return (
        <div>
            <span>Context 1: {val1}</span>
            <span>Context 2: {val2}</span>
        </div>
    )
}

describe('ComposeProviders', () => {
    it('should compose providers and render children with correct context values', () => {
        render(
            <ComposeProviders providers={[
                Provider1,
                Provider2,
            ]}>
                <ConsumerComponent />
            </ComposeProviders>
        )

        expect(screen.getByText('Context 1: Value1')).toBeInTheDocument()
        expect(screen.getByText('Context 2: Value2')).toBeInTheDocument()
    })

    it('should render children without providers if the providers array is empty', () => {
        render(
            <ComposeProviders providers={[]}>
                <div>No Providers</div>
            </ComposeProviders>
        )
        expect(screen.getByText('No Providers')).toBeInTheDocument()
    })

    it('should render children when only one provider is given', () => {
        render(
            <ComposeProviders providers={[Provider1]}>
                <ConsumerComponent />
            </ComposeProviders>
        )
        expect(screen.getByText('Context 1: Value1')).toBeInTheDocument()
        expect(screen.getByText('Context 2: Default2')).toBeInTheDocument()
    })
})
