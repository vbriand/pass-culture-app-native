import { act, fireEvent, render } from '@testing-library/react-native'
import { rest } from 'msw'
import { DefaultRequestBodyType } from 'msw/lib/types/utils/handlers/requestHandler'
import React from 'react'
import waitForExpect from 'wait-for-expect'

import { navigate, useRoute } from '__mocks__/@react-navigation/native'
import { SigninRequest, SigninResponse, UserProfileResponse } from 'api/gen'
import { NavigateToHomeWithoutModalOptions, usePreviousRoute } from 'features/navigation/helpers'
import { env } from 'libs/environment'
import { server } from 'tests/server'
import { flushAllPromises, flushAllPromisesTimes } from 'tests/utils'

import { AuthContext } from '../AuthContext'

import { Login } from './Login'

jest.mock('features/navigation/helpers')

const mockUsePreviousRoute = usePreviousRoute as jest.Mock

describe('<Login/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUsePreviousRoute.mockReturnValue(null)
    useRoute.mockImplementation(() => ({
      params: {},
    }))
  })

  it('should redirect to home page WHEN signin is successful', async () => {
    simulateSignin200()
    simulateUserProfileNeedNotFillCulturalSurvey()
    const renderAPI = renderLogin()

    fireEvent.press(renderAPI.getByText('Se connecter'))
    await act(async () => {
      await flushAllPromises()
    })

    await waitForExpect(() => {
      expect(navigate).toHaveBeenNthCalledWith(1, 'Home', NavigateToHomeWithoutModalOptions)
    })
  })

  it('should redirect to Cultural Survey WHEN signin is successful and user needs to fill cultural survey', async () => {
    simulateSignin200()
    simulateUserProfileNeedsToFillCulturalSurvey()
    const renderAPI = renderLogin()

    fireEvent.press(renderAPI.getByText('Se connecter'))
    await act(async () => {
      await flushAllPromises()
    })

    await waitForExpect(() => {
      expect(navigate).toHaveBeenNthCalledWith(1, 'CulturalSurvey')
    })
  })

  it('should redirect to SignupConfirmationEmailSent page WHEN signin has failed with EMAIL_NOT_VALIDATED code', async () => {
    simulateSigninEmailNotValidated()
    const renderAPI = renderLogin()

    fireEvent.press(renderAPI.getByText('Se connecter'))
    await act(async () => {
      await flushAllPromises()
    })

    await waitForExpect(() => {
      expect(navigate).toHaveBeenNthCalledWith(1, 'SignupConfirmationEmailSent', {
        email: undefined,
      })
    })
  })

  it('should show error message and error inputs WHEN signin has failed because of wrong credentials', async () => {
    simulateSigninWrongCredentials()
    const renderAPI = renderLogin()
    const notErrorSnapshot = renderAPI.toJSON()

    fireEvent.press(renderAPI.getByText('Se connecter'))
    await act(async () => {
      await flushAllPromisesTimes(6)
    })

    await waitForExpect(() => {
      expect(renderAPI.queryByText('E-mail ou mot de passe incorrect.')).toBeTruthy()
    })
    const errorSnapshot = renderAPI.toJSON()
    expect(notErrorSnapshot).toMatchDiffSnapshot(errorSnapshot)
    expect(navigate).not.toBeCalled()
  })

  it('should show error message and error inputs WHEN signin has failed because of network failure', async () => {
    simulateSigninNetworkFailure()
    const renderAPI = renderLogin()
    const notErrorSnapshot = renderAPI.toJSON()

    fireEvent.press(renderAPI.getByText('Se connecter'))
    await act(async () => {
      await flushAllPromises()
    })

    await waitForExpect(() => {
      expect(renderAPI.queryByText('Erreur réseau. Tu peux réessayer.')).toBeTruthy()
    })
    const errorSnapshot = renderAPI.toJSON()
    expect(notErrorSnapshot).toMatchDiffSnapshot(errorSnapshot)
    expect(navigate).not.toBeCalled()
  })

  it('should enable login button when both text inputs are filled', async () => {
    const renderAPI = renderLogin()
    const disabledButtonSnapshot = renderAPI.toJSON()

    const emailInput = renderAPI.getByPlaceholderText('tonadresse@email.com')
    const passwordInput = renderAPI.getByPlaceholderText('Ton mot de passe')
    fireEvent.changeText(emailInput, 'email@gmail.com')
    fireEvent.changeText(passwordInput, 'mypassword')

    await waitForExpect(() => {
      const enabledButtonSnapshot = renderAPI.toJSON()
      expect(disabledButtonSnapshot).toMatchDiffSnapshot(enabledButtonSnapshot)
    })
  })
})

function renderLogin() {
  return render(
    <AuthContext.Provider value={{ isLoggedIn: true, setIsLoggedIn: jest.fn() }}>
      <Login />
    </AuthContext.Provider>
  )
}

function simulateUserProfileNeedNotFillCulturalSurvey() {
  server.use(
    rest.get<DefaultRequestBodyType, UserProfileResponse>(
      env.API_BASE_URL + '/native/v1/me',
      async (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            needsToFillCulturalSurvey: false,
          } as UserProfileResponse)
        )
    )
  )
}

function simulateUserProfileNeedsToFillCulturalSurvey() {
  server.use(
    rest.get<DefaultRequestBodyType, UserProfileResponse>(
      env.API_BASE_URL + '/native/v1/me',
      async (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            needsToFillCulturalSurvey: true,
          } as UserProfileResponse)
        )
    )
  )
}

function simulateSignin200() {
  server.use(
    rest.post<SigninRequest, SigninResponse>(
      env.API_BASE_URL + '/native/v1/signin',
      async (req, res, ctx) =>
        res(
          ctx.status(200),
          ctx.json({
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
          })
        )
    )
  )
}

function simulateSigninWrongCredentials() {
  server.use(
    rest.post<SigninRequest, SigninResponse>(
      env.API_BASE_URL + '/native/v1/signin',
      async (req, res, ctx) =>
        res(
          ctx.status(400),
          // @ts-ignore: signin response type does not account for "not success" responses
          ctx.json({
            general: ['Identifiant ou Mot de passe incorrect'],
          })
        )
    )
  )
}

function simulateSigninEmailNotValidated() {
  server.use(
    rest.post<SigninRequest, SigninResponse>(
      env.API_BASE_URL + '/native/v1/signin',
      async (req, res, ctx) =>
        res(
          ctx.status(400),
          // @ts-ignore: signin response type does not account for "not success" responses
          ctx.json({
            code: 'EMAIL_NOT_VALIDATED',
            general: ["L'email n'a pas été validé."],
          })
        )
    )
  )
}

function simulateSigninNetworkFailure() {
  server.use(
    rest.post<SigninRequest, SigninResponse>(
      env.API_BASE_URL + '/native/v1/signin',
      async (req, res) => res.networkError('Network request failed')
    )
  )
}
