import React, { useCallback, useState } from 'react'

import { CookiesConsentModal } from 'features/cookies/components/CookiesConsentModal'
import {
  CookiesSteps,
  useCookiesModalContent,
} from 'features/cookies/components/useCookiesModalContent'
import { ALL_OPTIONAL_COOKIES, COOKIES_BY_CATEGORY } from 'features/cookies/CookiesPolicy'
import { getCookiesChoiceFromCategories } from 'features/cookies/getCookiesChoiceFromCategories'
import { logGoogleAnalytics } from 'features/cookies/logGoogleAnalytics'
import { useCookies } from 'features/cookies/useCookies'
import { CookiesChoiceByCategory } from 'features/cookies/useCookiesChoiceByCategory'
import { useLogCookiesConsent } from 'features/cookies/useLogCookiesConsent'
import { analytics } from 'libs/firebase/analytics'
import { requestIDFATrackingConsent } from 'libs/trackingConsent/useTrackingConsent'

interface Props {
  visible: boolean
  hideModal: () => void
}

export const CookiesConsent = ({ visible, hideModal }: Props) => {
  const [cookiesStep, setCookiesStep] = useState(CookiesSteps.COOKIES_CONSENT)
  const [settingsCookiesChoice, setSettingsCookiesChoice] = useState<CookiesChoiceByCategory>({
    customization: false,
    performance: false,
    marketing: false,
  })
  const { setCookiesConsent } = useCookies()
  const { mutate: logCookiesConsent } = useLogCookiesConsent()

  const acceptAll = useCallback(() => {
    setCookiesConsent({
      mandatory: COOKIES_BY_CATEGORY.essential,
      accepted: ALL_OPTIONAL_COOKIES,
      refused: [],
    })
    analytics.enableCollection()
    analytics.logHasAcceptedAllCookies()
    requestIDFATrackingConsent()
    logCookiesConsent()
    hideModal()
  }, [hideModal, setCookiesConsent, logCookiesConsent])

  const declineAll = useCallback(() => {
    setCookiesConsent({
      mandatory: COOKIES_BY_CATEGORY.essential,
      accepted: [],
      refused: ALL_OPTIONAL_COOKIES,
    })
    analytics.disableCollection()
    requestIDFATrackingConsent()
    logCookiesConsent()
    hideModal()
  }, [hideModal, setCookiesConsent, logCookiesConsent])

  const customChoice = useCallback(() => {
    const { accepted, refused } = getCookiesChoiceFromCategories(settingsCookiesChoice)
    setCookiesConsent({
      mandatory: COOKIES_BY_CATEGORY.essential,
      accepted,
      refused,
    })
    logGoogleAnalytics(accepted)
    analytics.logHasMadeAChoiceForCookies({ from: 'Modal', type: settingsCookiesChoice })
    requestIDFATrackingConsent()
    logCookiesConsent()
    hideModal()
  }, [settingsCookiesChoice, hideModal, setCookiesConsent, logCookiesConsent])

  const { childrenProps } = useCookiesModalContent({
    cookiesStep,
    settingsCookiesChoice,
    setCookiesStep,
    setSettingsCookiesChoice,
    acceptAll,
    declineAll,
    customChoice,
  })

  return (
    <CookiesConsentModal
      visible={visible}
      rightIconAccessibilityLabel={undefined}
      rightIcon={undefined}
      onRightIconPress={undefined}
      {...childrenProps}
    />
  )
}
