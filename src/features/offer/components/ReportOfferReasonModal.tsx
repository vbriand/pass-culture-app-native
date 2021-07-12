import { t } from '@lingui/macro'
import React, { FunctionComponent } from 'react'
import { useState } from 'react'
import { useQueryClient } from 'react-query'
import styled from 'styled-components/native'

import { extractApiErrorMessage } from 'api/helpers'
import { useReasonsForReporting } from 'features/offer/services/useReasonsForReporting'
import { useReportOfferMutation } from 'features/offer/services/useReportOffer'
import { QueryKeys } from 'libs/queryKeys'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { AppModal } from 'ui/components/modals/AppModal'
import { RadioButton } from 'ui/components/RadioButton'
import { SectionRow } from 'ui/components/SectionRow'
import { SNACK_BAR_TIME_OUT, useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { Close } from 'ui/svg/icons/Close'
import { Spacer } from 'ui/theme'

interface Props {
  isVisible: boolean
  dismissModal: () => void
  onGoBack: () => void
  onPressOtherReason: () => void
  offerId: number
}

export const ReportOfferReasonModal: FunctionComponent<Props> = (props) => {
  const { data } = useReasonsForReporting()
  const [selectedReason, setSelectedReason] = useState('')
  const { showSuccessSnackBar, showErrorSnackBar } = useSnackBarContext()
  const queryClient = useQueryClient()

  const reasonsForReporting = Object.entries(data?.reasons ?? []).map(([key, value]) => {
    return {
      id: key,
      ...value,
    }
  })

  const { mutate } = useReportOfferMutation({
    offerId: props.offerId,
    onSuccess: () => {
      queryClient.invalidateQueries(QueryKeys.REPORTED_OFFERS)
      showSuccessSnackBar({
        message: t`Ton signalement a bien été pris en compte`,
        timeout: SNACK_BAR_TIME_OUT,
      })
      props.dismissModal()
    },
    onError: (error) => {
      showErrorSnackBar({ message: extractApiErrorMessage(error), timeout: SNACK_BAR_TIME_OUT })
    },
  })

  function reportOffer() {
    mutate({ reason: selectedReason })
  }

  return (
    <AppModal
      visible={props.isVisible}
      title={t`Pourquoi signales-tu` + '\n' + t`cette offre ?`}
      rightIcon={Close}
      onRightIconPress={props.dismissModal}
      leftIcon={ArrowPrevious}
      onLeftIconPress={props.onGoBack}
      onBackdropPress={props.dismissModal}>
      <ModalContent>
        <Spacer.Column numberOfSpaces={3} />
        {reasonsForReporting.map((reason) =>
          reason.id !== 'OTHER' ? (
            <RadioButton
              key={reason.id}
              id={reason.id}
              title={reason.title}
              description={reason.description}
              onSelect={setSelectedReason}
              selectedValue={selectedReason}
            />
          ) : (
            <SectionRow
              title={reason.title}
              type={'navigable'}
              onPress={props.onPressOtherReason}
              key="other"
            />
          )
        )}
        <Spacer.Column numberOfSpaces={10.5} />
        <ButtonPrimary
          title={t`Signaler l'offre`}
          disabled={!selectedReason}
          onPress={reportOffer}
          testId="report-button"
        />
      </ModalContent>
    </AppModal>
  )
}

const ModalContent = styled.View({
  width: '100%',
})
