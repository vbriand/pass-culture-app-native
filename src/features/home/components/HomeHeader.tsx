import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

import { useUserProfileInfo } from 'features/home/api'
import { useAvailableCredit } from 'features/home/services/useAvailableCredit'
import { UseNavigationType } from 'features/navigation/RootNavigator'
import { env } from 'libs/environment'
import { formatToFrenchDecimal } from 'libs/parsers'
import { HeaderBackground } from 'ui/svg/HeaderBackground'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'
import { ACTIVE_OPACITY } from 'ui/theme/colors'
import { useCustomSafeInsets } from 'ui/theme/useCustomSafeInsets'

export const HomeHeader: FunctionComponent = function () {
  const navigation = useNavigation<UseNavigationType>()
  const { data: userInfos } = useUserProfileInfo()
  const availableCredit = useAvailableCredit()
  const { top } = useCustomSafeInsets()

  const welcomeTitle = userInfos?.firstName
    ? t({
        id: 'hello name',
        values: { name: userInfos?.firstName },
        message: 'Bonjour {name}',
      })
    : t`Bienvenue !`

  let subtitle = t`Toute la culture à portée de main`
  if (userInfos?.isBeneficiary && availableCredit) {
    subtitle = availableCredit.isExpired
      ? t`Ton crédit est expiré`
      : t({
          id: 'credit left on pass',
          values: { credit: formatToFrenchDecimal(availableCredit.amount) },
          message: 'Tu as {credit} sur ton pass',
        })
  }

  return (
    <React.Fragment>
      <HeaderBackgroundWrapper>
        <HeaderBackground />
      </HeaderBackgroundWrapper>
      {!!env.FEATURE_FLIPPING_ONLY_VISIBLE_ON_TESTING && (
        <CheatCodeButtonContainer
          onPress={() => navigation.navigate('CheatMenu')}
          style={{ top: getSpacing(3) + top }}>
          <Text>{t`CheatMenu`}</Text>
        </CheatCodeButtonContainer>
      )}

      <CenterContainer>
        <Spacer.Column numberOfSpaces={8} />
        <StyledTitle1 color={ColorsEnum.WHITE} numberOfLines={2}>
          {welcomeTitle}
        </StyledTitle1>
        <Spacer.Column numberOfSpaces={2} />
        <Typo.Body color={ColorsEnum.WHITE}>{subtitle}</Typo.Body>
      </CenterContainer>
      <Spacer.Column numberOfSpaces={6} />
    </React.Fragment>
  )
}

const StyledTitle1 = styled(Typo.Title1)({
  textAlign: 'center',
  marginHorizontal: getSpacing(8),
})

const CenterContainer = styled.View({
  flexGrow: 1,
  alignItems: 'center',
})

const HeaderBackgroundWrapper = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
})

const CheatCodeButtonContainer = styled.TouchableOpacity.attrs({
  activeOpacity: ACTIVE_OPACITY,
})({
  position: 'absolute',
  right: getSpacing(2),
  zIndex: 1,
  border: 1,
  padding: getSpacing(1),
})
