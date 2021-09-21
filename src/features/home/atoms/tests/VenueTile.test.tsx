import React from 'react'

import { VenueTypeCode } from 'api/gen'
import { mockedSearchResponse } from 'libs/search/fixtures/mockedSearchResponse'
import { render } from 'tests/utils'

import { VenueTile } from '../VenueTile'

jest.mock('react-query')

const venue = mockedSearchResponse.hits[0]

const props = {
  name: venue.name,
  venueType: VenueTypeCode.MUSEUM,
}

describe('VenueTile component', () => {
  it('should render correctly', () => {
    const component = render(<VenueTile {...props} />)
    expect(component).toMatchSnapshot()
  })
})