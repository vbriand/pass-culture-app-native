import React from 'react'

import { push, useRoute } from '__mocks__/@react-navigation/native'
import { LocationType } from 'features/search/enums'
import { initialSearchState } from 'features/search/pages/reducer'
import { MAX_RADIUS } from 'features/search/pages/reducer.helpers'
import { SearchView } from 'features/search/types'
import { analytics } from 'libs/firebase/analytics'
import { GeoCoordinates } from 'libs/geolocation'
import { fireEvent, render } from 'tests/utils/web'

import { NoSearchResult } from '../NoSearchResult'

const mockSearchState = initialSearchState
const mockDispatch = jest.fn()

jest.mock('features/search/pages/SearchWrapper', () => ({
  useStagedSearch: () => ({
    searchState: mockSearchState,
    dispatch: mockDispatch,
  }),
}))

let mockPosition: Pick<GeoCoordinates, 'latitude' | 'longitude'> | null = null
jest.mock('libs/geolocation', () => ({
  useGeolocation: jest.fn(() => ({ position: mockPosition })),
}))

describe('NoSearchResult component', () => {
  it('should show the message depending on the query', () => {
    useRoute.mockReturnValueOnce({ params: { view: SearchView.Landing, query: '' } })

    let text = render(<NoSearchResult />).getByText('Pas de résultat trouvé.')
    expect(text).toBeTruthy()

    useRoute.mockReturnValueOnce({ params: { view: SearchView.Landing, query: 'ZZZZZZ' } })
    text = render(<NoSearchResult />).getByText('Pas de résultat trouvé pour "ZZZZZZ"')
    expect(text).toBeTruthy()
  })

  it('should dispatch the right actions when pressing "autour de toi" - no location', () => {
    const button = render(<NoSearchResult />).getByText('autour de toi')
    fireEvent.click(button)
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenLastCalledWith('TabNavigator', {
      screen: 'Search',
      params: {
        ...initialSearchState,
        locationFilter: {
          locationType: LocationType.EVERYWHERE,
        },
        view: SearchView.Landing,
      },
    })
  })

  it('should dispatch the right actions when pressing "autour de toi" - with location', () => {
    mockPosition = { latitude: 2, longitude: 40 }
    const button = render(<NoSearchResult />).getByText('autour de toi')
    fireEvent.click(button)
    expect(push).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenLastCalledWith('TabNavigator', {
      screen: 'Search',
      params: {
        ...initialSearchState,
        locationFilter: {
          locationType: LocationType.AROUND_ME,
          aroundRadius: MAX_RADIUS,
        },
        view: SearchView.Landing,
      },
    })
  })

  it('should log NoSearchResult with the query', () => {
    useRoute.mockReturnValueOnce({ params: { view: SearchView.Landing, query: '' } })

    render(<NoSearchResult />)
    expect(analytics.logNoSearchResult).not.toHaveBeenLastCalledWith('')

    useRoute.mockReturnValueOnce({ params: { view: SearchView.Landing, query: 'no result query' } })
    render(<NoSearchResult />)
    expect(analytics.logNoSearchResult).toHaveBeenLastCalledWith('no result query')
    expect(analytics.logNoSearchResult).toHaveBeenCalledTimes(1)
  })
})
