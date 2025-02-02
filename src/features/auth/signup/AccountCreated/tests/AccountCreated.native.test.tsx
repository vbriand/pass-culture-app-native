import React from 'react'
import { UseQueryResult } from 'react-query'
import { mocked } from 'ts-jest/utils'
import waitForExpect from 'wait-for-expect'

import { navigate } from '__mocks__/@react-navigation/native'
import { UserProfileResponse } from 'api/gen'
import { navigateToHomeConfig } from 'features/navigation/helpers'
import { navigateFromRef } from 'features/navigation/navigationRef'
import { useUserProfileInfo } from 'features/profile/api'
import { BatchUser } from 'libs/react-native-batch'
import { render, fireEvent } from 'tests/utils'

import { AccountCreated } from '../AccountCreated'

const mockedUseUserProfileInfo = mocked(useUserProfileInfo)
jest.mock('features/profile/api')
jest.mock('features/navigation/helpers')
jest.mock('features/navigation/navigationRef')

const mockSettings = {
  enableNativeCulturalSurvey: false,
}

jest.mock('features/auth/settings', () => ({
  useAppSettings: jest.fn(() => ({
    data: mockSettings,
  })),
}))

beforeEach(() => {
  mockedUseUserProfileInfo.mockReturnValue({
    data: { needsToFillCulturalSurvey: true },
  } as UseQueryResult<UserProfileResponse>)
})

describe('<AccountCreated />', () => {
  it('should render correctly', () => {
    const renderAPI = render(<AccountCreated />)
    expect(renderAPI).toMatchSnapshot()
  })

  it('should redirect to cultural survey page WHEN "On y va !" button is clicked', async () => {
    const renderAPI = render(<AccountCreated />)

    fireEvent.press(await renderAPI.findByText('On y va\u00a0!'))

    await waitForExpect(() => {
      expect(navigateFromRef).not.toBeCalledTimes(1)
      expect(navigate).toBeCalledTimes(1)
      expect(navigate).toBeCalledWith('CulturalSurvey', undefined)
    })
  })

  it('should redirect to native cultural survey page WHEN "On y va !" button is clicked when native feature flag is activated', async () => {
    mockSettings.enableNativeCulturalSurvey = true
    const renderAPI = render(<AccountCreated />)

    fireEvent.press(await renderAPI.findByText('On y va\u00a0!'))

    await waitForExpect(() => {
      expect(navigateFromRef).not.toBeCalled()
      expect(navigate).toBeCalledTimes(1)
      expect(navigate).toBeCalledWith('CulturalSurveyIntro', undefined)
    })
  })

  it('should redirect to home page WHEN "On y va !" button is clicked and user needs not to fill cultural survey', async () => {
    // eslint-disable-next-line local-rules/independant-mocks
    mockedUseUserProfileInfo.mockReturnValue({
      data: { needsToFillCulturalSurvey: false },
    } as UseQueryResult<UserProfileResponse>)
    const renderAPI = render(<AccountCreated />)

    fireEvent.press(await renderAPI.findByText('On y va\u00a0!'))

    await waitForExpect(() => {
      expect(navigateFromRef).toBeCalledWith(
        navigateToHomeConfig.screen,
        navigateToHomeConfig.params
      )
      expect(navigate).not.toBeCalledWith('CulturalSurvey', undefined)
    })
  })

  it('should track Batch event when "On y va !" button is clicked', async () => {
    const renderAPI = render(<AccountCreated />)

    fireEvent.press(await renderAPI.findByText('On y va\u00a0!'))

    expect(BatchUser.trackEvent).toBeCalledWith('has_validated_account')
  })
})
