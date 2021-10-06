import React from 'react'
import waitForExpect from 'wait-for-expect'

import { bookingsSnap } from 'features/bookings/api/bookingsSnap'
import { BookingPropertiesSection } from 'features/bookings/components/BookingPropertiesSection'
import { Booking } from 'features/bookings/components/types'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { render } from 'tests/utils/web'

jest.mock('features/home/api', () => ({
  useUserProfileInfo: jest.fn(() => ({ data: { firstName: 'Christophe', lastName: 'Dupont' } })),
}))

describe('<BookingPropertiesSection />', () => {
  const booking = bookingsSnap.ongoing_bookings[0]

  it('should display user firstname and lastname', async () => {
    const { getByText } = await renderBookingProperties(booking)

    await waitForExpect(() => {
      expect(getByText('Christophe Dupont')).toBeTruthy()
    })
  })

  it('should display duo icon when offer is duo', async () => {
    booking.quantity = 2
    const { getByTestId } = await renderBookingProperties(booking)

    await waitForExpect(() => {
      expect(getByTestId('duo-icon')).toBeTruthy()
    })
  })

  it('should display date label', async () => {
    const { getByText } = await renderBookingProperties(booking)

    await waitForExpect(() => {
      expect(getByText('Le 15 mars 2021 à 20h00')).toBeTruthy()
    })
  })

  // FIXME: web integration
  it.skip('should display location label if offer is not permanent and not a digital event', async () => {
    booking.stock.offer.isDigital = false
    booking.stock.offer.isPermanent = false
    const { getByText } = await renderBookingProperties(booking)
    await waitForExpect(() => {
      expect(getByText('Maison de la Brique, Drancy')).toBeTruthy()
    })
  })
})

async function renderBookingProperties(booking: Booking) {
  const wrapper = render(
    // eslint-disable-next-line local-rules/no-react-query-provider-hoc
    reactQueryProviderHOC(
      <BookingPropertiesSection
        booking={booking}
        appSettings={{
          accountCreationMinimumAge: 15,
          allowIdCheckRegistration: false,
          autoActivateDigitalBookings: false,
          depositAmount: 30000,
          enableNativeIdCheckVersion: false,
          enableNativeIdCheckVerboseDebugging: false,
          enableIdCheckRetention: false,
          enablePhoneValidation: false,
          isRecaptchaEnabled: false,
          wholeFranceOpening: true,
          objectStorageUrl: 'http://localhost',
          displayDmsRedirection: true,
          idCheckAddressAutocompletion: false,
          useAppSearch: true,
          isWebappV2Enabled: false,
          enableNativeEacIndividual: false,
        }}
      />
    )
  )
  return wrapper
}
