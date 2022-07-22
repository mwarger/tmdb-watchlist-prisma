import React from 'react'
import { render } from '@testing-library/react-native'

import NativeBase from './NativeBaseProvider'

describe('NativeBase', () => {
  it('should render successfully', () => {
    const { container } = render(<NativeBase />)
    expect(container).toBeTruthy()
  })
})
