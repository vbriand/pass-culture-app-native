import { t } from '@lingui/macro'
import React from 'react'
import styled from 'styled-components/native'

import { OnGoingBookingsList } from 'features/bookings/components/OnGoingBookingsList'
import { PageHeader } from 'ui/components/headers/PageHeader'

export function Bookings() {
  return (
    <Container>
      <PageHeader title={t`Mes réservations`} size="medium" />
      <OnGoingBookingsList />
    </Container>
  )
}

const Container = styled.View({ flex: 1 })
