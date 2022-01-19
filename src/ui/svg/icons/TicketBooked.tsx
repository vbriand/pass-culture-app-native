import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

import { IconInterface } from 'ui/svg/icons/types'
import { ColorsEnum, ILLUSTRATION_ICON_SIZE } from 'ui/theme'

export const TicketBooked: React.FunctionComponent<IconInterface> = ({
  size = ILLUSTRATION_ICON_SIZE,
  color = ColorsEnum.BLACK,
  testID,
}) => {
  const height = typeof size === 'string' ? size : (size * 156) / 200
  return (
    <Svg width={size} height={height} viewBox="0 0 200 156" testID={testID} aria-hidden>
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M72.113 133.998C68.456 136.105 63.1959 134.676 60.5451 130.092L54.9135 120.352C54.3689 119.41 54.5084 118.173 55.3173 117.331L55.3295 117.318C60.4686 111.889 61.2971 103.213 57.1932 96.1152C53.0893 89.0175 45.1498 85.3958 37.8721 87.1256L37.8549 87.1297C36.7123 87.4097 35.5863 86.9256 35.0328 85.9683L29.4012 76.2285C26.7502 71.6436 28.1411 66.3799 31.7982 64.2716L105.118 22.0028C108.776 19.8945 114.036 21.3235 116.687 25.9084L122.319 35.6482C122.863 36.5902 122.724 37.8268 121.915 38.6693L121.903 38.6821C116.764 44.1106 115.935 52.787 120.039 59.8848C124.141 66.9782 132.057 70.619 139.363 68.8738L139.377 68.8703C140.52 68.5902 141.646 69.0744 142.2 70.0317L145.015 74.9016L146.854 78.081C132.39 79.1768 121 91.2557 121 106C121 121.466 133.534 134 149 134C164.466 134 177 121.466 177 106C177 101.175 175.773 96.6259 173.612 92.6512C173.026 91.5726 171.676 91.1735 170.597 91.7599C169.519 92.3463 169.12 93.6961 169.706 94.7747C171.522 98.1158 172.554 101.938 172.554 106C172.554 119.011 162.011 129.554 149 129.554C135.989 129.554 125.446 119.011 125.446 106C125.446 92.989 135.989 82.4461 149 82.4461C153.009 82.4461 156.785 83.4449 160.075 85.2131C161.157 85.7943 162.504 85.3887 163.086 84.3072C163.667 83.2258 163.261 81.8779 162.18 81.2967C159.333 79.7668 156.187 78.7228 152.86 78.264L149.38 72.3856L146.564 67.5157C144.851 64.5534 141.423 63.1914 138.184 63.9813C133.272 65.1518 127.507 62.7365 124.403 57.3688C121.302 52.0054 122.105 45.7981 125.56 42.1437C127.868 39.7329 128.379 36.0656 126.683 33.1322L121.052 23.3924C117.252 16.8213 109.067 13.9161 102.599 17.6449L29.2785 59.9138C22.8104 63.6426 21.2375 72.1734 25.0369 78.7446L30.6685 88.4843C32.3809 91.4459 35.8082 92.808 39.0458 92.0192C43.9427 90.8588 49.7278 93.268 52.8289 98.6312C55.9298 103.994 55.1269 110.201 51.6725 113.856C49.3639 116.266 48.853 119.934 50.5492 122.868L56.1808 132.608C59.9803 139.179 68.1655 142.084 74.6336 138.355L113.323 115.993C114.527 115.297 114.939 113.758 114.242 112.555C113.546 111.352 112.004 110.941 110.8 111.637L72.113 133.998ZM147.409 79.0416C133.233 79.8647 121.996 91.6174 121.996 106C121.996 113.456 125.015 120.205 129.899 125.091C125.018 120.205 122 113.458 122 106.004C122 91.6225 133.237 79.8702 147.412 79.0462L147.409 79.0416ZM150.743 79.0551L150.757 79.0518C154.694 79.3045 158.41 80.4013 161.709 82.1737C161.818 82.2325 161.915 82.3055 161.998 82.3892C161.916 82.3074 161.82 82.2359 161.713 82.1781C158.41 80.403 154.687 79.3057 150.743 79.0551ZM111.811 93.6585C110.606 94.3533 109.065 93.941 108.369 92.7376L88.1482 57.7659C87.4524 56.5625 87.8653 55.0237 89.0705 54.3289C90.2757 53.6342 91.8167 54.0465 92.5125 55.2499L112.733 90.2216C113.429 91.425 113.016 92.9637 111.811 93.6585ZM172.529 92.8466C172.155 92.4702 171.563 92.3681 171.073 92.6346C170.477 92.9583 170.257 93.7036 170.581 94.2992C172.474 97.7822 173.549 101.767 173.549 106C173.549 119.561 162.561 130.549 149 130.549C142.217 130.549 136.078 127.801 131.636 123.356C136.079 127.803 142.22 130.554 149.004 130.554C162.565 130.554 173.554 119.565 173.554 106.004C173.554 101.771 172.479 97.7867 170.585 94.3037C170.261 93.7081 170.482 92.9628 171.077 92.639C171.566 92.3736 172.154 92.4738 172.529 92.8466ZM162.882 96.6812C163.722 97.5836 163.715 99.0401 162.868 99.9342L148.01 115.615L148.009 115.615C146.635 117.064 144.412 117.064 143.038 115.615L135.64 107.811C134.792 106.917 134.786 105.46 135.625 104.558C136.465 103.655 137.832 103.648 138.679 104.542L145.524 111.762L159.828 96.6663C160.675 95.7721 162.042 95.7788 162.882 96.6812Z"
      />
    </Svg>
  )
}
