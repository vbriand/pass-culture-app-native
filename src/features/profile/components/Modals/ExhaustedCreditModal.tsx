import { t } from '@lingui/macro'
import React, { useEffect } from 'react'

import { ExpiredOrExhaustedCreditModalContent } from 'features/profile/components/Modals/ExpiredOrExhaustedCreditModalContent'
import { analytics } from 'libs/firebase/analytics'
import { AppInformationModal } from 'ui/components/modals/AppInformationModal'

type Props = {
  visible: boolean
  hideModal: () => void
}

export function ExhaustedCreditModal({ visible, hideModal }: Props) {
  useEffect(() => {
    analytics.logConsultModalNoMoreCredit()
  }, [])

  return (
    <AppInformationModal
      title={t`Tu as dépensé tout ton crédit, que faire\u00a0?`}
      numberOfLinesTitle={3}
      visible={visible}
      onCloseIconPress={hideModal}
      testIdSuffix="exhausted-credit">
      <ExpiredOrExhaustedCreditModalContent />
    </AppInformationModal>
  )
}
