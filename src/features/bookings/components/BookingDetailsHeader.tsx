import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { Animated } from 'react-native'
import styled, { useTheme } from 'styled-components/native'

import { getTabNavConfig } from 'features/navigation/TabBar/helpers'
import { useGoBack } from 'features/navigation/useGoBack'
import { getAnimationState } from 'ui/components/headers/animationHelpers'
import { HeaderIcon } from 'ui/components/headers/HeaderIcon'
import { getSpacing, Spacer, Typo } from 'ui/theme'
interface Props {
  headerTransition: Animated.AnimatedInterpolation
  title: string
}
/**
 * @param props.headerTransition should be between animated between 0 and 1
 */

export const BookingDetailsHeader: React.FC<Props> = (props) => {
  const theme = useTheme()
  const { headerTransition, title } = props
  const { goBack } = useGoBack(...getTabNavConfig('Bookings'))

  const [ariaHiddenTitle, setAriaHiddenTitle] = useState(true)
  headerTransition.addListener((opacity) => setAriaHiddenTitle(opacity.value !== 1))

  const { animationState, backgroundColor } = getAnimationState(theme, headerTransition)

  return (
    <React.Fragment>
      <HeaderContainer style={{ backgroundColor }}>
        <Spacer.TopScreen />
        <Spacer.Column numberOfSpaces={2} />
        <Row>
          <IconContainer>
            <HeaderIcon
              animationState={animationState}
              iconName="back"
              onPress={goBack}
              testID={t`Revenir en arrière`}
            />
          </IconContainer>
          <Spacer.Flex />
          <Title style={{ opacity: headerTransition }} aria-hidden={ariaHiddenTitle}>
            <StyledBody>{title}</StyledBody>
          </Title>
          <Spacer.Flex />
          <IconContainer />
        </Row>
        <Spacer.Column numberOfSpaces={2} />
      </HeaderContainer>
    </React.Fragment>
  )
}

const HeaderContainer = styled(Animated.View)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: theme.zIndex.header,
}))

const Row = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
})

const IconContainer = styled.View(({ theme }) => ({
  marginLeft: getSpacing(3),
  minWidth: theme.icons.sizes.standard,
}))

const Title = styled(Animated.Text).attrs({
  numberOfLines: 1,
})({
  textAlign: 'center',
  flex: 5,
  marginHorizontal: getSpacing(3),
})

const StyledBody = styled(Typo.Body)(({ theme }) => ({
  color: theme.colors.white,
}))
