import { type FC, type PropsWithChildren } from 'react';

interface IComposeProviders {
	providers: FC<PropsWithChildren>[]
}

const ComposeProviders: FC<PropsWithChildren<IComposeProviders>> = ({ 
	providers, 
	children 
}) => providers.reduceRight(
	(acc, Provider) => <Provider>{acc}</Provider>, 
	children
);

export default ComposeProviders;