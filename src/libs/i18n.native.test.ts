import { t } from '@lingui/macro'
import { act } from 'react-test-renderer'

import { activate } from './i18n'

describe('i18n', () => {
  describe('t', () => {
    // Skip this test because lingui is not used and this test is flaky
    it.skip('translates to french by default', () => {
      act(() => {
        activate('fr')
      })
      expect(t`Welcome to pass Culture`).toEqual('Bienvenue à pass Culture')
    })
  })
})
