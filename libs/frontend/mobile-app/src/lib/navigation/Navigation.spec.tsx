import React from 'react'
import { render } from '@testing-library/react-native'

import Navigation from './Navigation'

describe('Navigation', () => {
  it('should render successfully', () => {
    const { container } = render(<Navigation />)
    expect(container).toBeTruthy()
  })
})
