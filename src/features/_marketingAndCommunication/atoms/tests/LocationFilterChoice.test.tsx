import React from 'react'

import { LocationFilterChoice } from 'features/_marketingAndCommunication/atoms/LocationFilterChoice'
import { LocationType } from 'features/search/enums'
import { render, fireEvent } from 'tests/utils'

describe('<LocationFilterChoice />', () => {
  it('should call onChange with LocationType.AROUND_ME or null', () => {
    const onChange = jest.fn()
    const renderAPI = render(<LocationFilterChoice onChange={onChange} />)

    fireEvent.press(renderAPI.getByText('Autour de moi'))
    expect(onChange).toHaveBeenNthCalledWith(1, {
      aroundRadius: 100,
      locationType: LocationType.AROUND_ME,
    })

    fireEvent.press(renderAPI.getByText('Partout'))
    expect(onChange).toHaveBeenNthCalledWith(2, null)
  })
})
