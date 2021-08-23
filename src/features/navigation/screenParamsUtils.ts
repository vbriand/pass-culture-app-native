import { AllNavParamList, RouteParams, ScreenNames } from 'features/navigation/RootNavigator'

type ScreensRequiringParsing = Extract<
  ScreenNames,
  | 'AfterSignupEmailValidationBuffer'
  | 'BookingDetails'
  | 'Home'
  | 'Login'
  | 'Offer'
  | 'ReinitializePassword'
  | 'ResetPasswordExpiredLink'
  | 'Venue'
  | 'Search'
>

type ParamsList = Required<AllNavParamList>

type ParamsParsers = {
  [Screen in ScreensRequiringParsing]: {
    [Param in keyof Required<RouteParams<ParamsList, Screen>>]: (
      value: string
    ) => RouteParams<ParamsList, Screen>[Param]
  }
}

export const screenParamsParser: ParamsParsers = {
  AfterSignupEmailValidationBuffer: {
    email: decodeURIComponent,
    token: identityFn,
    expiration_timestamp: Number,
  },
  BookingDetails: {
    id: Number,
  },
  Login: {
    preventCancellation: parseObject,
    followScreen: identityFn,
    followParams: parseObject,
  },
  Offer: {
    id: Number,
    from: identityFn,
    moduleName: identityFn,
  },
  Home: {
    entryId: identityFn,
  },
  ReinitializePassword: {
    token: identityFn,
    email: decodeURIComponent,
    expiration_timestamp: Number,
  },
  ResetPasswordExpiredLink: {
    email: decodeURIComponent,
  },
  Venue: {
    id: (value) => (value ? Number(value) : 0),
  },
  Search: {
    aroundRadius: JSON.parse,
    beginningDatetime: parseDataWithISODates,
    date: parseDataWithISODates,
    endingDatetime: parseDataWithISODates,
    geolocation: JSON.parse,
    hitsPerPage: JSON.parse,
    locationType: JSON.parse,
    offerCategories: JSON.parse,
    offerIsDuo: JSON.parse,
    offerIsFree: JSON.parse,
    offerIsNew: JSON.parse,
    offerTypes: JSON.parse,
    place: JSON.parse,
    priceRange: JSON.parse,
    query: JSON.parse,
    showResults: JSON.parse,
    tags: JSON.parse,
    timeRange: JSON.parse,
    venueId: JSON.parse,
  },
}

// We allow to use `any` (instead of `string`) in order to support enum members
// like Referrals, ScreenNames, etc... Waiting for a better typing solution.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function identityFn(value: any) {
  return value
}

function parseObject(value?: string) {
  if (!value) return undefined
  try {
    return JSON.parse(value)
  } catch {
    return undefined
  }
}

const DATE_ISO8601_FORMAT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{2,6}Z$/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseDataWithISODates(data: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function reviver(key: string, value: any) {
    return typeof value === 'string' && DATE_ISO8601_FORMAT.test(value) ? new Date(value) : value
  }

  return JSON.parse(typeof data === 'string' ? data : JSON.stringify(data), reviver)
}

type ScreensRequiringStringifying = Extract<ScreenNames, 'Search'>
type ParamsStringifiers = {
  [Screen in ScreensRequiringStringifying]: {
    [Param in keyof Required<RouteParams<ParamsList, Screen>>]: (
      value: RouteParams<ParamsList, Screen>[Param]
    ) => string
  }
}

export const screenParamsStringifier: ParamsStringifiers = {
  Search: {
    aroundRadius: JSON.stringify,
    beginningDatetime: JSON.stringify,
    date: JSON.stringify,
    endingDatetime: JSON.stringify,
    geolocation: JSON.stringify,
    hitsPerPage: JSON.stringify,
    locationType: JSON.stringify,
    offerCategories: JSON.stringify,
    offerIsDuo: JSON.stringify,
    offerIsFree: JSON.stringify,
    offerIsNew: JSON.stringify,
    offerTypes: JSON.stringify,
    place: JSON.stringify,
    priceRange: JSON.stringify,
    query: JSON.stringify,
    showResults: JSON.stringify,
    tags: JSON.stringify,
    timeRange: JSON.stringify,
    venueId: JSON.stringify,
  },
}