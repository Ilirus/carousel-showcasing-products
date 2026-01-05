import type { Product, ProductResp } from '@app-types/product'

export const getProducts = async (): Promise<Product[]> => {
    const resp = await fetch('./products.json')
    return new Promise((resolve, rejects) => {
        setTimeout(async () => {
            try {
                if (resp.ok) {
                    const { products }: ProductResp = await resp.json()
                    // .then(() => {
                    // 	throw new Error('json() failed')
                    // });
                    resolve(products)
                } else {
                    throw new Error(`${resp.status}: ${resp.statusText}`)
                }
            } catch (error) {
                rejects(error)
            }
        }, 1500)
    })
}
