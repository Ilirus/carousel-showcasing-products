import { type FC, type PropsWithChildren } from 'react'

export interface ComposeProviders {
    providers: FC<PropsWithChildren>[]
}

const ComposeProviders: FC<PropsWithChildren<ComposeProviders>> = ({
    providers,
    children,
}) => providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
)

export default ComposeProviders
