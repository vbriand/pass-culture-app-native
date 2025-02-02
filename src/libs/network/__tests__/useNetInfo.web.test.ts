// eslint-disable-next-line no-restricted-imports
import { useNetInfo as useNetInfoDefault } from '@react-native-community/netinfo'

import { useNetInfo } from 'libs/network/useNetInfo'

jest.mock('@react-native-community/netinfo')
const mockUseNetInfo = useNetInfoDefault as jest.Mock

describe('useNetInfo', () => {
  it('should return is connected when native lib says so', () => {
    mockUseNetInfo.mockReturnValueOnce({ isConnected: true })
    const { isConnected } = useNetInfo()

    expect(isConnected).toEqual(true)
  })

  it('should return is not connected even when lib says so', () => {
    mockUseNetInfo.mockReturnValueOnce({ isConnected: false })
    const { isConnected } = useNetInfo()

    expect(isConnected).toEqual(true)
  })
})
