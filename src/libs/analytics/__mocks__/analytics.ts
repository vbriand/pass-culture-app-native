import {
  analytics as actualAnalytics,
  idCheckAnalytics as actualIdCheckAnalytics,
} from '../analytics'

export const analytics: typeof actualAnalytics = {
  disableCollection: jest.fn(),
  enableCollection: jest.fn(),
  logAccessExternalOffer: jest.fn(),
  logAllModulesSeen: jest.fn(),
  logAllTilesSeen: jest.fn(),
  logBookingConfirmation: jest.fn(),
  logBookingDetailsScrolledToBottom: jest.fn(),
  logBookingError: jest.fn(),
  logBookingImpossibleiOS: jest.fn(),
  logBookingOfferConfirmDates: jest.fn(),
  logBookingProcessStart: jest.fn(),
  logBookingsScrolledToBottom: jest.fn(),
  logCampaignTrackerEnabled: jest.fn(),
  logCancelBooking: jest.fn(),
  logCancelSignup: jest.fn(),
  logClickBookOffer: jest.fn(),
  logClickBusinessBlock: jest.fn(),
  logClickExclusivityBlock: jest.fn(),
  logClickSeeMore: jest.fn(),
  logClickSocialNetwork: jest.fn(),
  logConfirmBookingCancellation: jest.fn(),
  logConsultAccessibility: jest.fn(),
  logConsultAvailableDates: jest.fn(),
  logConsultDescriptionDetails: jest.fn(),
  logConsultItinerary: jest.fn(),
  logConsultOffer: jest.fn(),
  logConsultWholeOffer: jest.fn(),
  logConsultWhyAnniversary: jest.fn(),
  logConsultWithdrawal: jest.fn(),
  logDiscoverOffers: jest.fn(),
  logHasActivateGeolocFromTutorial: jest.fn(),
  logHasAddedOfferToFavorites: jest.fn(),
  logHasAppliedFavoritesSorting: jest.fn(),
  logHasChangedPassword: jest.fn(),
  logHasRefusedCookie: jest.fn(),
  logHasSkippedTutorial: jest.fn(),
  logHelpCenterContactSignupConfirmationEmailSent: jest.fn(),
  logIdCheck: jest.fn(),
  logLocationToggle: jest.fn(),
  logLogin: jest.fn(),
  logLogout: jest.fn(),
  logMailTo: jest.fn(),
  logNoSearchResult: jest.fn(),
  logNotificationToggle: jest.fn(),
  logOfferSeenDuration: jest.fn(),
  logOpenExternalUrl: jest.fn(),
  logOpenLocationSettings: jest.fn(),
  logOpenNotificationSettings: jest.fn(),
  logProfilScrolledToBottom: jest.fn(),
  logProfilSignUp: jest.fn(),
  logRecommendationModuleSeen: jest.fn(),
  logReinitializeFilters: jest.fn(),
  logResendEmailResetPasswordExpiredLink: jest.fn(),
  logResendEmailSignupConfirmationExpiredLink: jest.fn(),
  logScreenView: jest.fn(),
  logSearchQuery: jest.fn(),
  logSearchScrollToPage: jest.fn(),
  logSeeMyBooking: jest.fn(),
  logShareOffer: jest.fn(),
  logSignUpBetween14And15Included: jest.fn(),
  logSignUpLessThanOrEqualTo13: jest.fn(),
  logUseFilter: jest.fn(),
  setUserId: jest.fn(),
}

export const idCheckAnalytics: typeof actualIdCheckAnalytics = {
  cameraUnavailable: jest.fn(),
  cancelSignUp: jest.fn(),
  endCheckTokens: jest.fn(),
  externalLink: jest.fn(),
  fileSizeExceeded: jest.fn(),
  getJouveToken: jest.fn(),
  getLicenceToken: jest.fn(),
  hasValidSession: jest.fn(),
  idDocumentAcquisitionType: jest.fn(),
  identityError: jest.fn(),
  idValid: jest.fn(),
  invalidAge: jest.fn(),
  invalidDate: jest.fn(),
  invalidDocument: jest.fn(),
  invalidTwice: jest.fn(),
  missingDocument: jest.fn(),
  permissionsBlocked: jest.fn(),
  processCompleted: jest.fn(),
  startCheckTokens: jest.fn(),
  wrongSideDocument: jest.fn(),
}