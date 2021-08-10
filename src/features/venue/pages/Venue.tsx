import { useRoute } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components/native'

import { UseRouteType } from 'features/navigation/RootNavigator'
import { testID } from 'tests/utils'
import { useHeaderTransition } from 'ui/components/headers/animationHelpers'

import { useVenue } from '../api/useVenue'
import { VenueHeader } from '../components/VenueHeader'

import { VenueBody } from './VenueBody'

export const Venue: FunctionComponent = () => {
  const { params } = useRoute<UseRouteType<'Venue'>>()
  const { data: venue } = useVenue(params.id)
  const { headerTransition, onScroll } = useHeaderTransition()

  if (!venue) return <React.Fragment></React.Fragment>

  return (
    <Container {...testID('Page de détail du lieu')}>
      <VenueBody venueId={params.id} onScroll={onScroll} />
      <VenueHeader headerTransition={headerTransition} title={venue.name} venueId={venue.id} />
    </Container>
  )
}

const Container = styled.View({})