import React, { useCallback } from 'react'

import { useUserProfileInfo } from 'features/home/api'
import { HomeOfferTile, SeeMore } from 'features/home/atoms'
import { SearchParametersFields, DisplayParametersFields } from 'features/home/contentful'
import { getPlaylistItemDimensionsFromLayout } from 'features/home/contentful/dimensions'
import { useOfferModule } from 'features/home/pages/useOfferModule'
import { getTabNavConfig } from 'features/navigation/TabBar/helpers'
import { analytics } from 'libs/analytics'
import { useGeolocation } from 'libs/geolocation'
import useFunctionOnce from 'libs/hooks/useFunctionOnce'
import { formatDates, formatDistance, getDisplayPrice } from 'libs/parsers'
import { SearchHit, useParseSearchParameters } from 'libs/search'
import { useCategoryIdMapping, useCategoryHomeLabelMapping } from 'libs/subcategories'
import { PassPlaylist } from 'ui/components/PassPlaylist'
import { CustomListRenderItem, RenderFooterItem } from 'ui/components/Playlist'

type OffersModuleProps = {
  search: SearchParametersFields[]
  display: DisplayParametersFields
  moduleId: string
  cover: string | null
  index: number
}

const keyExtractor = (item: SearchHit) => item.objectID

export const OffersModule = (props: OffersModuleProps) => {
  const { cover, display, search, index, moduleId } = props
  const data = useOfferModule({ search, moduleId })
  const { position } = useGeolocation()
  const parseSearchParameters = useParseSearchParameters()
  const mapping = useCategoryIdMapping()
  const labelMapping = useCategoryHomeLabelMapping()
  const { data: profile } = useUserProfileInfo()

  const { hits = [], nbHits = 0 } = data || {}

  const [parameters] = search
  // When we navigate to the search page, we want to show 20 results per page,
  // not what is configured in contentful
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchParams = { ...parseSearchParameters(parameters), hitsPerPage: 20 }
  const searchTabConfig = getTabNavConfig('Search', searchParams)
  const moduleName = display.title || parameters.title
  const logHasSeenAllTilesOnce = useFunctionOnce(() =>
    analytics.logAllTilesSeen(moduleName, hits.length)
  )

  const showSeeMore =
    hits.length < nbHits &&
    !(parameters.tags || parameters.beginningDatetime || parameters.endingDatetime)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onPressSeeMore = showSeeMore
    ? () => {
        analytics.logClickSeeMore(moduleName)
      }
    : undefined

  const renderItem: CustomListRenderItem<SearchHit> = useCallback(
    ({ item, width, height }) => {
      const timestampsInMillis = item.offer.dates?.map((timestampInSec) => timestampInSec * 1000)
      return (
        <HomeOfferTile
          categoryLabel={labelMapping[item.offer.subcategoryId]}
          categoryId={mapping[item.offer.subcategoryId]}
          subcategoryId={item.offer.subcategoryId}
          offerId={+item.objectID}
          distance={formatDistance(item._geoloc, position)}
          name={item.offer.name}
          date={formatDates(timestampsInMillis)}
          isDuo={item.offer.isDuo}
          thumbUrl={item.offer.thumbUrl}
          price={getDisplayPrice(item.offer.prices)}
          isBeneficiary={profile?.isBeneficiary}
          moduleName={moduleName}
          width={width}
          height={height}
        />
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [position, profile?.isBeneficiary, labelMapping, mapping]
  )

  const { itemWidth, itemHeight } = getPlaylistItemDimensionsFromLayout(display.layout)

  const shouldModuleBeDisplayed = hits.length > 0 && nbHits >= display.minOffers

  const renderFooter: RenderFooterItem = useCallback(
    ({ width, height }) => {
      return (
        <SeeMore
          navigateTo={
            showSeeMore ? { screen: searchTabConfig[0], params: searchTabConfig[1] } : undefined
          }
          width={width}
          height={height}
          onPress={onPressSeeMore as () => void}
        />
      )
    },
    [onPressSeeMore, showSeeMore, searchTabConfig]
  )

  if (!shouldModuleBeDisplayed) return <React.Fragment />
  return (
    <PassPlaylist
      testID="offersModuleList"
      title={display.title}
      onDarkBackground={index === 0}
      data={hits}
      itemHeight={itemHeight}
      itemWidth={itemWidth}
      coverUrl={cover}
      onPressSeeMore={onPressSeeMore}
      titleSeeMoreLink={{ screen: searchTabConfig[0], params: searchTabConfig[1] }}
      renderItem={renderItem}
      renderFooter={renderFooter}
      keyExtractor={keyExtractor}
      onEndReached={logHasSeenAllTilesOnce}
    />
  )
}
