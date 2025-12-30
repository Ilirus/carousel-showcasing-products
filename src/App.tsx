import './App.css'
import Header from './components/header/Header'
import { type FC } from 'react';
import ProductCardCarousel from './components/productCardCarousel/ProductCardCarousel';

const App: FC = () => {
    return (
        <>
            <Header />
            <main className="flex justify-center items-center min-h-screen">
                <ProductCardCarousel />
            </main>
        </>
    )
}

export default App
