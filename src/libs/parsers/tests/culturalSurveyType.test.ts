import { CulturalSurveyTypeCodeKey } from 'api/gen'
import { mapCulturalSurveyTypeToIcon } from 'libs/parsers/culturalSurveyType'
import CulturalSurveyIcons from 'ui/svg/icons/culturalSurvey'

describe('culturalSurveyType', () => {
  it('should have default icon as FestivalIcon', () => {
    const result = mapCulturalSurveyTypeToIcon('__unknown_key__' as CulturalSurveyTypeCodeKey)
    expect(result).toBe(CulturalSurveyIcons.FestivalIcon)
  })
})
