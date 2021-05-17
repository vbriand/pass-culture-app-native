import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import React, { useState, FunctionComponent, useCallback } from 'react'
import { NativeSyntheticEvent, NativeScrollEvent, ScrollView, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import styled from 'styled-components/native'

import { useListenDeepLinksEffect } from 'features/deeplinks'
import { useUserProfileInfo } from 'features/home/api'
import { HomeBodyPlaceholder } from 'features/home/components'
import { HomeBody } from 'features/home/components/HomeBody'
import { useDisplayedHomeModules } from 'features/home/pages/useDisplayedHomeModules'
import { useAvailableCredit } from 'features/home/services/useAvailableCredit'
import { UseNavigationType } from 'features/navigation/RootNavigator'
import { useInitialScreenConfig } from 'features/navigation/RootNavigator/useInitialScreenConfig'
import { useFunctionOnce } from 'features/offer/services/useFunctionOnce'
import { analytics } from 'libs/analytics'
import { isCloseToBottom } from 'libs/analytics.utils'
import { env } from 'libs/environment'
import { formatToFrenchDecimal } from 'libs/parsers'
import { HeaderBackground } from 'ui/svg/HeaderBackground'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'
import { ACTIVE_OPACITY } from 'ui/theme/colors'

import { RecommendationPane } from '../contentful/moduleTypes'

import { useShowSkeleton } from './useShowSkeleton'

const statusBarHeight = getStatusBarHeight(true)

export const Home: FunctionComponent = function () {
  const navigation = useNavigation<UseNavigationType>()
  const { data: userInfos } = useUserProfileInfo()
  const showSkeleton = useShowSkeleton()
  const availableCredit = useAvailableCredit()
  const [recommendationY, setRecommendationY] = useState<number>(Infinity)
  const { displayedModules, algoliaModules, recommendedHits } = useDisplayedHomeModules()

  useInitialScreenConfig()
  useListenDeepLinksEffect()

  const logHasSeenAllModules = useFunctionOnce(() =>
    analytics.logAllModulesSeen(displayedModules.length)
  )

  const logHasSeenRecommendationModule = useFunctionOnce(() => {
    const recommendationModule = displayedModules.find((m) => m instanceof RecommendationPane)
    if (recommendationModule && recommendedHits.length > 0) {
      analytics.logRecommendationModuleSeen(
        (recommendationModule as RecommendationPane).display.title,
        recommendedHits.length
      )
    }
  })

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

  const onScroll = useCallback(
    ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isCloseToBottom(nativeEvent)) logHasSeenAllModules()
      const padding = nativeEvent.contentSize.height - recommendationY
      if (isCloseToBottom({ ...nativeEvent, padding })) logHasSeenRecommendationModule()
    },
    [recommendationY, displayedModules.length]
  )

  return (
    <ScrollView
      testID="homeScrollView"
      scrollEventThrottle={400}
      bounces={false}
      onScroll={onScroll}>
      <Spacer.TopScreen />
      <HeaderBackgroundWrapper>
        <HeaderBackground />
      </HeaderBackgroundWrapper>
      {env.FEATURE_FLIPPING_ONLY_VISIBLE_ON_TESTING && (
        <CheatCodeButtonContainer onPress={() => navigation.navigate('CheatMenu')}>
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

      {showSkeleton ? <HomeBodyPlaceholder /> : null}
      <HomeBodyLoadingContainer isLoading={showSkeleton}>
        <HomeBody
          modules={displayedModules}
          algoliaModules={algoliaModules}
          recommendedHits={recommendedHits}
          setRecommendationY={setRecommendationY}
        />
      </HomeBodyLoadingContainer>
      <Spacer.TabBar />
    </ScrollView>
  )
}

const StyledTitle1 = styled(Typo.Title1)({
  textAlign: 'center',
  marginHorizontal: getSpacing(8),
})

const CenterContainer = styled.View({
  flex: 1,
  alignItems: 'center',
})

const HeaderBackgroundWrapper = styled.View({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 0,
})

const HomeBodyLoadingContainer = styled.View<{ isLoading: boolean }>(({ isLoading }) => ({
  height: isLoading ? 0 : undefined,
  overflow: 'hidden',
}))

const CheatCodeButtonContainer = styled.TouchableOpacity.attrs({
  activeOpacity: ACTIVE_OPACITY,
})({
  position: 'absolute',
  right: getSpacing(2),
  top: getSpacing(3) + statusBarHeight,
  zIndex: 1,
  border: 1,
  padding: getSpacing(1),
})
