import { describe, it, expect, vi, beforeEach } from 'vitest'

import { getProducts } from './products'

const mockProducts = [
    { id: '1', title: 'Product 1', description: 'Desc 1', price: 10, url: 'url1' },
    { id: '2', title: 'Product 2', description: 'Desc 2', price: 20, url: 'url2' },
]

describe('getProducts', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    it('should return products if the fetch is successful', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ products: mockProducts }),
        } as Response)

        const products = await getProducts()
        expect(products).toEqual(mockProducts)
        expect(global.fetch).toHaveBeenCalledWith('./products.json')
    })

    it('should throw an error if the fetch is not successful', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        } as Response)

        await expect(getProducts()).rejects.toThrow('404: Not Found')
        expect(global.fetch).toHaveBeenCalledWith('./products.json')
    })
})
