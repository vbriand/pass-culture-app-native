import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'
import { initialSearchState } from 'features/search/pages/reducer'
import { keyExtractor, SuggestedPlaces } from 'features/search/pages/SuggestedPlaces'
import { SuggestedPlace } from 'libs/place'
import { buildSuggestedPlaces } from 'libs/place/fetchPlaces'
import { mockedSuggestedPlaces } from 'libs/place/fixtures/mockedSuggestedPlaces'
import { SuggestedVenue } from 'libs/venue'
import { fireEvent, render } from 'tests/utils/web'

const mockSearchState = initialSearchState
const mockStagedDispatch = jest.fn()

jest.mock('features/search/pages/SearchWrapper', () => ({
  useStagedSearch: () => ({
    searchState: mockSearchState,
    dispatch: mockStagedDispatch,
  }),
}))

let mockPlaces: SuggestedPlace[] = []
const mockVenues: SuggestedVenue[] = []

jest.mock('libs/place', () => ({
  usePlaces: () => ({ data: mockPlaces, isLoading: false }),
  useVenues: () => ({ data: mockVenues, isLoading: false }),
}))

describe('SuggestedPlaces component', () => {
  it('should trigger onPress when pressing the Space bar on focused place', () => {
    mockPlaces = buildSuggestedPlaces(mockedSuggestedPlaces)
    const { getByTestId } = render(<SuggestedPlaces query="paris" />)

    fireEvent.focus(getByTestId(keyExtractor(mockPlaces[1])))
    fireEvent.keyDown(getByTestId(keyExtractor(mockPlaces[1])), { key: 'Spacebar' })

    expect(navigate).toHaveBeenCalledWith('LocationFilter', { selectedPlace: mockPlaces[1] })
  })
})
