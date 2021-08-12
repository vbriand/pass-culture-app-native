import { t } from '@lingui/macro'
import React, { useCallback } from 'react'
import { FlatList, ListRenderItem, PixelRatio } from 'react-native'
import styled from 'styled-components/native'

import { useVenue } from 'features/venue/api/useVenue'
import { useVenueOffers } from 'features/venue/api/useVenueOffers'
import { VenueOfferTile } from 'features/venue/atoms/VenueOfferTile'
import { useGeolocation } from 'libs/geolocation'
import { formatDates, getDisplayPrice, parseCategory } from 'libs/parsers'
import { SearchHit } from 'libs/search'
import { ButtonWithLinearGradient } from 'ui/components/buttons/ButtonWithLinearGradient'
import { MARGIN_DP, Spacer, Typo } from 'ui/theme'
interface Props {
  venueId: number
}

const keyExtractor = (item: SearchHit) => item.objectID

const VENUE_OFFERS_CTA_WORDING = t`Voir toutes les offres`

export const VenueOffers: React.FC<Props> = ({ venueId }) => {
  const { data: venue } = useVenue(venueId)
  const { data: offers } = useVenueOffers(venueId)
  const { position } = useGeolocation()

  const renderItem: ListRenderItem<SearchHit> = useCallback(
    ({ item }) => {
      const timestampsInMillis = item.offer.dates?.map((timestampInSec) => timestampInSec * 1000)
      return (
        <VenueOfferTile
          category={parseCategory(item.offer.category)}
          categoryName={item.offer.category}
          offerId={+item.objectID}
          description={item.offer.description || ''}
          name={item.offer.name}
          date={formatDates(timestampsInMillis)}
          isDuo={item.offer.isDuo}
          thumbUrl={item.offer.thumbUrl}
          price={getDisplayPrice(item.offer.prices)}
        />
      )
    },
    [position]
  )

  const onPress = () => {
    // TODO : Search all offers ?
  }

  if (!venue) return <React.Fragment></React.Fragment>

  return (
    <React.Fragment>
      <Spacer.Column numberOfSpaces={6} />
      <MarginContainer>
        <Typo.Title4>{t`Offres`}</Typo.Title4>
      </MarginContainer>
      <Spacer.Column numberOfSpaces={6} />
      <FlatList
        testID="offersModuleList"
        ListHeaderComponent={HorizontalMargin}
        ListFooterComponent={HorizontalMargin}
        data={offers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
      <Spacer.Column numberOfSpaces={6} />
      <MarginContainer>
        <ButtonWithLinearGradient
          wording={VENUE_OFFERS_CTA_WORDING}
          onPress={onPress}
          isDisabled={false}
        />
      </MarginContainer>
      <Spacer.Column numberOfSpaces={6} />
    </React.Fragment>
  )
}

const MarginContainer = styled.View({
  marginHorizontal: PixelRatio.roundToNearestPixel(MARGIN_DP),
})
const ItemSeparatorComponent = () => <Spacer.Row numberOfSpaces={4} />
const HorizontalMargin = () => <Spacer.Row numberOfSpaces={6} />
