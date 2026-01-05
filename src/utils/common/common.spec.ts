import { stub } from '@utils/common/common'
import { describe, it, expect, vi } from 'vitest'


describe('stub', () => {
    it('should call alert with "Something went wrong" when invoked', () => {
    // Mock window.alert
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

        stub()

        expect(alertSpy).toHaveBeenCalledTimes(1)
        expect(alertSpy).toHaveBeenCalledWith('Something went wrong')

        // Restore original alert function
        alertSpy.mockRestore()
    })
})
