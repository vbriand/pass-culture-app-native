import { t } from '@lingui/macro'
import React from 'react'
import styled from 'styled-components/native'

import { navigateToHomeConfig } from 'features/navigation/helpers'
import { ButtonTertiaryWhite } from 'ui/components/buttons/ButtonTertiaryWhite'
import { GenericInfoPage } from 'ui/components/GenericInfoPage'
import { TouchableLink } from 'ui/components/touchableLink/TouchableLink'
import { EmailFilled } from 'ui/svg/icons/EmailFilled'
import { ExternalSite } from 'ui/svg/icons/ExternalSite'
import { PlainArrowPrevious } from 'ui/svg/icons/PlainArrowPrevious'
import { SadFace } from 'ui/svg/icons/SadFace'
import { Spacer, Typo } from 'ui/theme'

type Props = {
  renderResendEmailButton?: () => React.ReactNode
  urlFAQ?: string
  contactSupport?: () => void
  customBodyText?: string
}

export function LayoutExpiredLink({
  renderResendEmailButton,
  urlFAQ,
  contactSupport,
  customBodyText,
}: Props) {
  return (
    <GenericInfoPage
      title={t`Oups\u00a0!`}
      icon={SadFace}
      buttons={[
        renderResendEmailButton && renderResendEmailButton(),
        <TouchableLink
          key={1}
          as={ButtonTertiaryWhite}
          wording={t`Retourner à l'accueil`}
          navigateTo={navigateToHomeConfig}
          icon={PlainArrowPrevious}
        />,
      ].filter(Boolean)}>
      <StyledBody>{t`Le lien est expiré\u00a0!`}</StyledBody>
      <StyledBody>
        {customBodyText ||
          t`Clique sur «\u00a0Renvoyer l’e-mail\u00a0» pour recevoir un nouveau lien.`}
      </StyledBody>
      <Spacer.Column numberOfSpaces={6} />

      {!!urlFAQ || !!contactSupport ? (
        <React.Fragment>
          <StyledBody>{t`Si tu as besoin d’aide n’hésite pas à\u00a0:`}</StyledBody>
          <Spacer.Column numberOfSpaces={2} />
        </React.Fragment>
      ) : null}

      {!!urlFAQ && (
        <TouchableLink
          as={ButtonTertiaryWhite}
          wording={t`Consulter l'article d'aide`}
          externalNav={{ url: urlFAQ }}
          icon={ExternalSite}
        />
      )}

      {!!contactSupport && (
        <ButtonTertiaryWhite
          wording={t`Contacter le support`}
          accessibilityLabel={t`Ouvrir le gestionnaire mail pour contacter le support`}
          onPress={contactSupport}
          icon={EmailFilled}
        />
      )}
    </GenericInfoPage>
  )
}

const StyledBody = styled(Typo.Body)(({ theme }) => ({
  color: theme.colors.white,
  textAlign: 'center',
}))
