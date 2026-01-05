import ComposeProviders from '@contexts/common/composeProviders/ComposeProviders.tsx'
import OverlayProvider from '@contexts/overlay/OverlayProvider.tsx'
import ProductProvider from '@contexts/product/ProductProvider.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'

const providers = [
    ProductProvider,
    OverlayProvider,
]

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ComposeProviders providers={providers}>
            <App />
        </ComposeProviders>
    </StrictMode>
)
