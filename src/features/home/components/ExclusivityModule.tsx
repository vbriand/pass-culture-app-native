import React from 'react'
import { Dimensions, PixelRatio } from 'react-native'
import styled from 'styled-components/native'

import { ExclusivityPane } from 'features/home/contentful'
import { Margin, BORDER_RADIUS, MARGIN_DP } from 'ui/theme'

export const ExclusivityModule = ({ alt, image, offerId }: ExclusivityPane) => (
  <Row>
    {/** Explicitly defining Margin component for easier use for other components, with gutters */}
    <Margin />
    <ImageContainer>
      <TouchableHighlight
        onPress={() => console.log(`Opening offer ${offerId}...`)} // eslint-disable-line no-console
      >
        <Image
          source={{ uri: image }}
          accessible={!!alt}
          accessibilityLabel={alt}
          testID="imageExclu"
        />
      </TouchableHighlight>
    </ImageContainer>
    <Margin />
  </Row>
)

const imageWidth = Dimensions.get('window').width - 2 * MARGIN_DP
const imageHeight = PixelRatio.roundToNearestPixel((imageWidth * 292) / 333)

const Row = styled.View({
  flexDirection: 'row',
})

const ImageContainer = styled.View({
  flex: 1,
})

const TouchableHighlight = styled.TouchableHighlight({
  borderRadius: BORDER_RADIUS,
})

const Image = styled.Image({
  height: imageHeight,
  borderRadius: BORDER_RADIUS,
})
