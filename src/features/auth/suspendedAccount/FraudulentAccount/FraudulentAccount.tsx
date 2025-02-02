import { t } from '@lingui/macro'
import React from 'react'
import styled from 'styled-components/native'

import { useLogoutRoutine } from 'features/auth/AuthContext'
import { navigateToHomeConfig } from 'features/navigation/helpers'
import { env } from 'libs/environment'
import { ButtonPrimaryWhite } from 'ui/components/buttons/ButtonPrimaryWhite'
import { ButtonTertiaryWhite } from 'ui/components/buttons/ButtonTertiaryWhite'
import { GenericInfoPage } from 'ui/components/GenericInfoPage'
import { TouchableLink } from 'ui/components/touchableLink/TouchableLink'
import { Email } from 'ui/svg/icons/Email'
import { PlainArrowPrevious } from 'ui/svg/icons/PlainArrowPrevious'
import { UserBlocked } from 'ui/svg/icons/UserBlocked'
import { Spacer, Typo } from 'ui/theme'

export const FraudulentAccount = () => {
  const signOut = useLogoutRoutine()

  return (
    <GenericInfoPage
      title={t`Ton compte a été suspendu`}
      icon={UserBlocked}
      buttons={[
        <TouchableLink
          key={1}
          as={ButtonPrimaryWhite}
          wording={t`Contacter le service`}
          accessibilityLabel={t`Ouvrir le gestionnaire mail pour contacter le support`}
          externalNav={{ url: `mailto:${env.FRAUD_EMAIL_ADDRESS}` }}
          icon={Email}
        />,
        <TouchableLink
          key={2}
          as={ButtonTertiaryWhite}
          wording={t`Retourner à l'accueil`}
          navigateTo={{ ...navigateToHomeConfig, params: { ...navigateToHomeConfig.params } }}
          onPress={signOut}
          icon={PlainArrowPrevious}
        />,
      ]}>
      <StyledBody>{t`Ton compte est actuellement suspendu pour des raisons de sécurité.`}</StyledBody>
      <Spacer.Column numberOfSpaces={5} />
      <StyledBody>
        {t`Pour en savoir plus, tu peux contacter l'équipe de lutte contre la fraude.`}
      </StyledBody>
    </GenericInfoPage>
  )
}

const StyledBody = styled(Typo.Body)(({ theme }) => ({
  color: theme.colors.white,
  textAlign: 'center',
}))
