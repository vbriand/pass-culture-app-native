import React from 'react'

import { Typo } from 'ui/theme'

export const InputLabel = Typo.Body as React.FC<{
  id?: string
  htmlFor: string
  children: React.ReactNode
}>
