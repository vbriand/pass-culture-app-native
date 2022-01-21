import * as React from 'react'
import Svg, { G, Path } from 'react-native-svg'

import { ColorsEnum, STANDARD_ICON_SIZE } from 'ui/theme'

import { IconInterface } from './types'

export function NoBookingsDeprecated({
  size = STANDARD_ICON_SIZE,
  color = ColorsEnum.BLACK,
  testID,
}: IconInterface) {
  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 197 124" testID={testID}>
      <G fill="none" fillRule="evenodd">
        <G fill={color}>
          <Path
            d="M114.451 13.779l.168.27 4.88 8.121c1.55 2.581 1.101 5.78-.908 8.051l-.193.21c-3.415 3.586-4.06 9.061-1.474 13.366 2.534 4.217 7.505 6.223 12.183 5.057l.304-.08c3.036-.85 6.218.243 7.817 2.903.64 1.066.295 2.448-.77 3.088-1.015.61-2.317.326-2.991-.623l-.097-.147c-.506-.844-1.583-1.214-2.746-.888-6.705 1.876-13.918-.936-17.557-6.992-3.636-6.052-2.73-13.745 2.073-18.787.785-.825.988-1.87.58-2.697l-.079-.143-4.88-8.122c-1.844-3.07-5.783-4.114-8.894-2.404l-.226.13-62.387 37.487c-3.072 1.848-4.115 5.781-2.406 8.895l.13.226 4.95 8.238c.47.783 1.466 1.125 2.525.817 6.744-1.957 14.042.846 17.709 6.948 3.667 6.104 2.716 13.87-2.177 18.896-.724.747-.912 1.711-.54 2.475l.077.141 4.946 8.237c1.889 3.144 5.976 4.163 9.12 2.274l30.09-18.081c1.066-.64 2.448-.295 3.088.77.64 1.065.295 2.447-.77 3.087l-30.09 18.08c-5.184 3.116-11.89 1.52-15.129-3.544l-.167-.27-4.946-8.236c-1.563-2.602-1.048-5.859 1.093-8.068 3.48-3.575 4.157-9.102 1.548-13.444-2.554-4.25-7.588-6.251-12.296-5.027l-.3.083c-2.86.833-5.884-.152-7.492-2.588l-.146-.232-4.95-8.239c-3.113-5.187-1.519-11.885 3.544-15.127l.27-.168 62.388-37.487c5.184-3.115 11.89-1.519 15.128 3.544zm37.082 53.972c.975.518 1.345 1.73.827 2.705-.519.975-1.73 1.345-2.705.827-9.51-5.056-21.316-1.447-26.372 8.062-5.056 9.51-1.447 21.316 8.062 26.372 9.51 5.056 21.316 1.447 26.372-8.062 2.467-4.639 2.935-9.96 1.423-14.882-.325-1.056.268-2.175 1.324-2.5 1.056-.324 2.175.269 2.5 1.325 1.821 5.928 1.256 12.348-1.715 17.935-6.093 11.46-20.322 15.81-31.782 9.716-11.46-6.093-15.81-20.322-9.716-31.782 6.093-11.46 20.322-15.81 31.782-9.716zM134.73 79.913l.128.117 6.196 6.197 6.197-6.197.128-.117c.785-.662 1.96-.623 2.7.117.782.781.782 2.048 0 2.829l-6.197 6.196 6.087 6.086c.78.781.78 2.048 0 2.829-.74.74-1.916.779-2.701.117l-.128-.117-6.086-6.087-6.085 6.087-.127.117c-.786.662-1.962.623-2.702-.117-.78-.781-.78-2.048 0-2.829l6.086-6.086-6.197-6.196c-.78-.781-.78-2.048 0-2.829.74-.74 1.916-.779 2.701-.117zm-42.869-40.99l.096.148 18.21 30.305c.64 1.065.295 2.448-.77 3.088-1.014.61-2.317.326-2.991-.623l-.097-.147-18.209-30.306c-.64-1.065-.295-2.447.77-3.087 1.014-.61 2.316-.326 2.991.622z"
            transform="translate(-89 -176) translate(89 176)"
          />
        </G>
      </G>
    </Svg>
  )
}