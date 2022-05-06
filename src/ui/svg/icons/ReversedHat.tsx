import React from 'react'
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import styled, { useTheme } from 'styled-components/native'

import { svgIdentifier } from 'ui/svg/utils'

import { IconInterface } from './types'

const ReversedHatSvg: React.FunctionComponent<IconInterface> = ({
  size,
  color,
  color2,
  testID,
}) => {
  const { id: gradientId, fill: gradientFill } = svgIdentifier()
  const {
    colors: { primary, secondary },
  } = useTheme()
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" testID={testID} aria-hidden>
      <Defs>
        <LinearGradient id={gradientId} x1="28.841%" x2="71.159%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={color ?? primary} />
          <Stop offset="100%" stopColor={color2 ?? color ?? secondary} />
        </LinearGradient>
      </Defs>
      <Path
        fill={gradientFill}
        clipRule={'evenodd'}
        fillRule={'evenodd'}
        d="M4.79908 7.61709C4.24106 8.15835 4 8.68579 4 9.17948C4 9.67318 4.24106 10.2006 4.79908 10.7419C5.35964 11.2856 6.20457 11.8051 7.30202 12.2554C9.4942 13.1547 12.569 13.7265 16 13.7265C19.431 13.7265 22.5058 13.1547 24.698 12.2554C25.7954 11.8051 26.6404 11.2856 27.2009 10.7419C27.7589 10.2006 28 9.67318 28 9.17948C28 8.68579 27.7589 8.15835 27.2009 7.61709C26.6404 7.07337 25.7954 6.55385 24.698 6.10361C22.5058 5.20426 19.431 4.63247 16 4.63247C12.569 4.63247 9.4942 5.20426 7.30202 6.10361C6.20457 6.55385 5.35964 7.07337 4.79908 7.61709ZM6.78461 4.90628C9.17686 3.92484 12.4354 3.33333 16 3.33333C19.5646 3.33333 22.8231 3.92484 25.2154 4.90628C26.4102 5.39644 27.4202 5.99668 28.1416 6.69638C28.8655 7.39855 29.3333 8.23818 29.3333 9.17948C29.3333 10.1208 28.8655 10.9604 28.1416 11.6626C27.4441 12.3391 26.4767 12.9227 25.3333 13.4037V14.8504L25.3334 14.8569L25.3333 14.8699V18.7543V24.0677C25.3333 24.732 25.0798 25.3973 24.5686 25.8874C23.4645 26.9552 20.9163 28.6667 16 28.6667C11.0836 28.6667 8.53542 26.9552 7.43138 25.8873C6.92015 25.3973 6.66667 24.732 6.66667 24.0677V23.4701C6.66667 23.1113 6.96514 22.8205 7.33333 22.8205C7.70152 22.8205 8 23.1113 8 23.4701V24.0677C8 24.416 8.13269 24.7375 8.36714 24.9619L8.36979 24.9644C9.22639 25.7934 11.4381 27.3675 16 27.3675C20.5619 27.3675 22.7736 25.7934 23.6302 24.9644L23.6329 24.9618C23.8673 24.7375 24 24.416 24 24.0677V21.0322C22.8382 21.8242 20.3732 22.8207 15.3333 22.8207C14.9651 22.8207 14.6667 22.5298 14.6667 22.1711C14.6667 21.8123 14.9651 21.5215 15.3333 21.5215C21.2347 21.5215 23.1598 20.1094 23.6286 19.6526L23.6328 19.6485L23.6329 19.6485C23.8673 19.4241 24 19.1027 24 18.7543V17.1347C23.1741 17.698 21.9387 18.1867 20.2023 18.4847C19.8397 18.5469 19.494 18.3109 19.4301 17.9576C19.3663 17.6043 19.6085 17.2674 19.9711 17.2052C22.0175 16.8541 23.1166 16.2489 23.6311 15.7528L23.6329 15.7511C23.8652 15.5287 23.9976 15.2111 24 14.8663V13.8939C21.7702 14.6086 18.993 15.0256 16 15.0256C13.007 15.0256 10.2298 14.6086 8 13.8939V14.8569C8 15.2053 8.13269 15.5267 8.36714 15.7511L8.36979 15.7536C9.15952 16.5179 11.3152 17.5072 16 17.5072C16.3682 17.5072 16.6667 17.798 16.6667 18.1567C16.6667 18.5155 16.3682 18.8063 16 18.8063C11.868 18.8063 9.3627 18.0649 8 17.1353V20.6834C8 21.0422 7.70152 21.333 7.33333 21.333C6.96514 21.333 6.66667 21.0422 6.66667 20.6834V14.8569V13.4037C5.52334 12.9227 4.55592 12.3391 3.85841 11.6626C3.13449 10.9604 2.66667 10.1208 2.66667 9.17948C2.66667 8.23818 3.13449 7.39855 3.85841 6.69638C4.57978 5.99668 5.58984 5.39644 6.78461 4.90628ZM8.40659 8.69314C8.03664 8.9554 8 9.12792 8 9.17948C8 9.23105 8.03664 9.40357 8.40659 9.66583C8.762 9.91778 9.31918 10.1717 10.0677 10.3961C11.5566 10.8424 13.6541 11.1282 16 11.1282C18.3459 11.1282 20.4434 10.8424 21.9323 10.3961C22.6808 10.1717 23.238 9.91778 23.5934 9.66583C23.9634 9.40357 24 9.23105 24 9.17948C24 9.13944 23.9791 9.0159 23.7498 8.8167C23.5226 8.61944 23.1538 8.40673 22.633 8.20438C22.291 8.07149 22.1244 7.69362 22.2608 7.36039C22.3972 7.02717 22.785 6.86477 23.127 6.99766C23.7262 7.23052 24.2507 7.51149 24.6369 7.84688C25.0209 8.18033 25.3333 8.62841 25.3333 9.17948C25.3333 9.84569 24.885 10.3568 24.3778 10.7164C23.8562 11.0862 23.1442 11.3921 22.3244 11.6378C20.6766 12.1318 18.4408 12.4273 16 12.4273C13.5592 12.4273 11.3234 12.1318 9.67563 11.6378C8.85582 11.3921 8.14383 11.0862 7.62216 10.7164C7.11503 10.3568 6.66667 9.84569 6.66667 9.17948C6.66667 8.51327 7.11503 8.00212 7.62216 7.64261C8.14383 7.2728 8.85582 6.9669 9.67563 6.72115C11.3234 6.22721 13.5592 5.93162 16 5.93162C17.2201 5.93162 18.3884 6.00464 19.4581 6.13826C19.8233 6.18388 20.0814 6.50932 20.0346 6.86516C19.9878 7.221 19.6538 7.47248 19.2886 7.42686C18.2782 7.30065 17.1666 7.23076 16 7.23076C13.6541 7.23076 11.5566 7.51654 10.0677 7.96286C9.31918 8.18724 8.762 8.44118 8.40659 8.69314Z"
      />
    </Svg>
  )
}

export const ReversedHat = styled(ReversedHatSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.primary,
  size: size ?? theme.icons.sizes.standard,
}))``