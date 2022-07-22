import React from 'react'
import { render } from '@testing-library/react-native'

import { MovieDetailScreen } from './DetailScreen'

describe('DetailScreen', () => {
  it('should render successfully', () => {
    const { container } = render(<MovieDetailScreen />)
    expect(container).toBeTruthy()
  })
})
