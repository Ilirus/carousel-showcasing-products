import Header from '@components/header/Header'
import ProductCardCarousel from '@features/product/productCardCarousel/ProductCardCarousel'
import { type FC } from 'react'

const App: FC = () => {
    return (
        <>
            <Header />
            <main className="flex flex-col flex-1 p-4 w-full overflow-y-auto overflow-x-hidden">
                <div className='flex flex-col flex-1 items-center justify-center w-full'>
                    <ProductCardCarousel />
                </div>
            </main>
        </>
    )
}

export default App
