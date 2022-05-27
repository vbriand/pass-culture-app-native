import React from 'react'

import { useRoute } from '__mocks__/@react-navigation/native'
import { SearchGroupNameEnum } from 'api/gen'
import { LocationType } from 'features/search/enums'
import { SearchState } from 'features/search/types'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { cleanup, render } from 'tests/utils'

import { initialSearchState } from '../reducer'
import { Search } from '../Search'

const mockSearchState = initialSearchState
const mockDispatch = jest.fn()

jest.mock('features/search/pages/SearchWrapper', () => ({
  useSearch: () => ({
    searchState: mockSearchState,
    dispatch: mockDispatch,
  }),
  useStagedSearch: () => ({
    searchState: mockSearchState,
    dispatch: jest.fn(),
  }),
  useCommit: () => ({
    commit: jest.fn(),
  }),
}))

const mockSettings = {
  appEnableSearchHomepageRework: false,
}

jest.mock('features/auth/settings', () => ({
  useAppSettings: jest.fn(() => ({
    data: mockSettings,
  })),
}))

const parameters: SearchState = {
  beginningDatetime: null,
  endingDatetime: null,
  date: null,
  hitsPerPage: 8,
  locationFilter: { locationType: LocationType.EVERYWHERE },
  offerCategories: [SearchGroupNameEnum.CINEMA],
  offerSubcategories: [],
  offerIsDuo: false,
  offerIsFree: false,
  offerIsNew: false,
  offerTypes: { isDigital: false, isEvent: false, isThing: false },
  priceRange: [0, 500],
  showResults: false,
  tags: [],
  timeRange: null,
  query: '',
}

describe('Search component', () => {
  afterAll(jest.resetAllMocks)
  afterEach(cleanup)

  it('should render correctly', () => {
    useRoute.mockReturnValueOnce({})
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    const { toJSON } = render(reactQueryProviderHOC(<Search />))
    expect(toJSON()).toMatchSnapshot()
  })

  it('should handle coming from "See More" correctly', () => {
    useRoute.mockReturnValueOnce({ params: parameters })
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    render(reactQueryProviderHOC(<Search />))
    expect(mockDispatch).toBeCalledWith({ type: 'SET_STATE_FROM_NAVIGATE', payload: parameters })
    expect(mockDispatch).toBeCalledWith({ type: 'SHOW_RESULTS', payload: true })
  })

  it('should show landing page if not search results and rework search feature flag is not activated', () => {
    mockSettings.appEnableSearchHomepageRework = false
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    const { getByTestId } = render(reactQueryProviderHOC(<Search />))
    const searchLandingPage = getByTestId('searchLandingPage')
    expect(searchLandingPage).toBeTruthy()
  })

  it('should show landing page if search results and rework search feature flag is activated', () => {
    mockSettings.appEnableSearchHomepageRework = true
    useRoute.mockReturnValueOnce({ params: parameters })
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    const { getByTestId } = render(reactQueryProviderHOC(<Search />))
    const searchLandingPage = getByTestId('searchLandingPage')
    expect(searchLandingPage).toBeTruthy()
  })

  it('should show search header without rework if rework search feature flag is not activated', () => {
    mockSettings.appEnableSearchHomepageRework = false
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    const { queryByTestId } = render(reactQueryProviderHOC(<Search />))
    expect(queryByTestId('searchBoxWithoutRework')).toBeTruthy()
  })

  it('should show search header with rework if rework search feature flag is activated', () => {
    mockSettings.appEnableSearchHomepageRework = true
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    const { queryByTestId } = render(reactQueryProviderHOC(<Search />))
    expect(queryByTestId('searchBoxWithLabel')).toBeTruthy()
  })
})
