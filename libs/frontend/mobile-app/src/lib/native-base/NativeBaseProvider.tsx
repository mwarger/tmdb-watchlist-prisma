import React from 'react'

import { NativeBaseProvider, Box } from 'native-base'

import { extendTheme } from 'native-base'

// 1. Extend the theme
const customTheme = extendTheme({
  colors: {
    primary: {
      50: '#ffe2e7',
      100: '#ffb3bb',
      200: '#fc8393',
      300: '#f9526d',
      400: '#f6224b',
      500: '#dd0939',
      600: '#ad0320',
      700: '#7c000e',
      800: '#4d0002',
      900: '#200400',
    },
  },
  config: {
    initialColorMode: 'dark',
    // useSystemColorMode: true,
  },
  components: {
    Button: {
      // Can simply pass default props to change default behaviour of components.
      // baseStyle: {
      //   rounded: 'md',
      //   _light: {
      //     color: 'darkText',
      //     backgroundColor: 'lightText',
      //   },
      //   _dark: {
      //     color: 'lightText',
      //     backgroundColor: 'darkText',
      //   },
      // },
      defaultProps: {
        colorScheme: 'red',
      },
    },
    Heading: {
      baseStyle: {
        _light: {
          color: 'darkText',
        },
        _dark: {
          color: 'lightText',
        },
        fontWeight: 'normal',
      },
      //
      // baseStyle: ({ colorMode }: { colorMode: 'light' | 'dark' }) => {
      //   return {
      //     color: colorMode === 'dark' ? 'red.300' : 'blue.300',
      //     fontWeight: 'normal',
      //   }
      // },
    },
  },
})

// 2. Get the type of the CustomTheme
type CustomThemeType = typeof customTheme

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  type ICustomTheme = CustomThemeType
}

export interface NativeBaseProps {
  children: React.ReactNode
}

export function NativeBase(props: NativeBaseProps) {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Box safeArea style={{ flex: 1 }}>
        {props.children}
      </Box>
    </NativeBaseProvider>
  )
}

export default NativeBase
