import { t } from '@lingui/macro'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components/native'

import { CategoryIdEnum, BookingReponse } from 'api/gen'
import { TicketCode } from 'features/bookings/atoms/TicketCode'
import { Ean } from 'features/bookings/components/TicketBody/Ean/Ean'
import { SeatWithQrCodeProps } from 'features/bookings/components/TicketBody/SeatWithQrCode/SeatWithQrCode'
import { TicketBody } from 'features/bookings/components/TicketBody/TicketBody'
import { getBookingProperties } from 'features/bookings/helpers'
import { useCategoryId, useSubcategory } from 'libs/subcategories'
import { ButtonWithLinearGradient } from 'ui/components/buttons/ButtonWithLinearGradient'
import { TouchableLink } from 'ui/components/touchableLink/TouchableLink'
import { ExternalSite } from 'ui/svg/icons/ExternalSite'
import { getSpacing, Spacer, Typo } from 'ui/theme'
import { getHeadingAttrs } from 'ui/theme/typographyAttrs/getHeadingAttrs'

export type BookingDetailsTicketContentProps = {
  booking: BookingReponse
  activationCodeFeatureEnabled?: boolean
  externalBookings?: SeatWithQrCodeProps
  testID?: string
}

export const BookingDetailsTicketContent: FunctionComponent<BookingDetailsTicketContentProps> = ({
  booking,
  activationCodeFeatureEnabled,
  externalBookings,
}) => {
  const { completedUrl } = booking
  const { offer, beginningDatetime } = booking.stock
  const {
    id: offerId,
    name: offerName,
    subcategoryId: offerSubcategory,
    extraData,
    withdrawalType,
    withdrawalDelay,
  } = offer

  const { isEvent } = useSubcategory(offerSubcategory)
  const properties = getBookingProperties(booking, isEvent)

  const categoryId = useCategoryId(offerSubcategory)
  const isbn =
    extraData?.isbn && categoryId === CategoryIdEnum.LIVRE ? <Ean isbn={extraData.isbn} /> : null

  const isDigitalAndActivationCodeEnabled =
    activationCodeFeatureEnabled && properties.hasActivationCode

  const activationCode = !!booking.activationCode && (
    <TicketCode withdrawalType={withdrawalType || undefined} code={booking.activationCode.code} />
  )

  const accessExternalOfferButton = completedUrl ? (
    <TouchableLink
      as={ButtonWithLinearGradient}
      wording={t`Accéder à l'offre`}
      icon={ExternalSite}
      externalNav={{ url: completedUrl, params: { analyticsData: { offerId } } }}
    />
  ) : null

  const ticketToken = !!booking.token && (
    <TicketCode withdrawalType={withdrawalType || undefined} code={booking.token} />
  )

  const ticketContent = properties.isDigital ? (
    accessExternalOfferButton
  ) : (
    <TicketBody
      withdrawalType={withdrawalType || undefined}
      withdrawalDelay={withdrawalDelay || 0}
      beginningDatetime={beginningDatetime || undefined}
      subcategoryId={offerSubcategory}
      qrCodeData={booking.qrCodeData || undefined}
      externalBookings={externalBookings}
    />
  )

  return (
    <Container>
      <Title>{offerName}</Title>
      <Spacer.Column numberOfSpaces={3} />
      <TicketContent>
        {isDigitalAndActivationCodeEnabled ? (
          <React.Fragment>
            {activationCode}
            {accessExternalOfferButton}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {ticketToken}
            {ticketContent}
          </React.Fragment>
        )}
      </TicketContent>
      {isbn}
    </Container>
  )
}

const Container = styled.View(({ theme }) => ({
  justifyContent: 'center',
  minHeight: theme.ticket.minHeight,
  width: '100%',
}))

const Title = styled(Typo.Title3).attrs(getHeadingAttrs(1))({
  textAlign: 'center',
  maxWidth: '100%',
  paddingHorizontal: getSpacing(2),
})

const TicketContent = styled.View({
  paddingHorizontal: getSpacing(2),
  paddingVertical: getSpacing(3),
})
