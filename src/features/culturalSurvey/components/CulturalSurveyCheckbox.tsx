import React, { FunctionComponent, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components/native'

import { GreyDarkCaption } from 'ui/components/GreyDarkCaption'
import { TouchableOpacity } from 'ui/components/TouchableOpacity'
import { IconInterface } from 'ui/svg/icons/types'
import { Validate } from 'ui/svg/icons/Validate'
import { getSpacing, Typo } from 'ui/theme'

type CulturalSurveyCheckboxProps = {
  title?: string
  subtitle?: string | null
  icon?: FunctionComponent<IconInterface> | null
  onPress: () => void
  selected: boolean
}

export const CulturalSurveyCheckbox = (props: CulturalSurveyCheckboxProps) => {
  const [selected, setIsSelected] = useState(props.selected)

  const AnswerIcon = props.icon
    ? styled(props.icon).attrs(({ theme }) => ({
        color: selected ? theme.colors.secondary : theme.colors.greyDark,
        color2: selected ? theme.colors.primary : theme.colors.greyDark,
      }))``
    : null

  const StyledLinearGradient = styled(LinearGradient).attrs(({ theme }) => ({
    colors: selected
      ? [theme.colors.secondary, theme.colors.primary]
      : [theme.colors.greyMedium, theme.colors.greyMedium],
    useAngle: true,
    angle: 175,
  }))({ borderRadius: getSpacing(2) })

  const onPress = () => {
    setIsSelected(!selected)
    props.onPress()
  }

  useEffect(() => {
    setIsSelected(props.selected)
  }, [props.selected])

  return (
    <StyledLinearGradient>
      <AnswerContainer onPress={onPress} testID={`${props?.title}-CulturalSurveyAnswer`}>
        {!!AnswerIcon && (
          <ActivityIconContainer>
            <AnswerIcon />
          </ActivityIconContainer>
        )}
        <DescriptionContainer>
          <Typo.ButtonText>{props?.title}</Typo.ButtonText>
          {!!props.subtitle && <GreyDarkCaption>{props?.subtitle}</GreyDarkCaption>}
        </DescriptionContainer>
        {!!selected && (
          <ValidateIconContainer>
            <RedValidate />
          </ValidateIconContainer>
        )}
      </AnswerContainer>
    </StyledLinearGradient>
  )
}

const RedValidate = styled(Validate).attrs(({ theme }) => ({
  color: theme.colors.primary,
  size: theme.icons.sizes.smaller,
}))``

const AnswerContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.95,
})(({ theme }) => ({
  flexDirection: 'row',
  backgroundColor: theme.colors.white,
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: getSpacing(0.25),
  borderRadius: getSpacing(1.8),
  minHeight: getSpacing(18),
}))

const DescriptionContainer = styled.View({
  flexShrink: 1,
  marginLeft: getSpacing(4),
  marginRight: getSpacing(10),
})

const ValidateIconContainer = styled.View({
  alignContent: 'center',
  position: 'absolute',
  right: getSpacing(4),
})
const ActivityIconContainer = styled.View({
  alignContent: 'center',
  marginLeft: getSpacing(4),
})
