import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button, Center, FormControl, Icon, Input, Stack } from 'native-base'
import reactotron from 'reactotron-react-native'
import { useAuthenticatedUser } from '../providers/AuthenticationProvider'
import { MaterialIcons } from '@expo/vector-icons'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const Schema = z.object({
  email: z.string().email(),
})

// infer type from Schema
type SchemaType = z.infer<typeof Schema>

const NavStack = createNativeStackNavigator()

function LoginScreen() {
  const { setUser } = useAuthenticatedUser()
  const [loading, setLoading] = React.useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaType>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(Schema),
  })

  const signIn = React.useCallback(
    async (data: SchemaType) => {
      try {
        setLoading(true)

        setUser({ hasUser: true, username: data.email })
      } catch (error) {
        reactotron.log?.('signInAnonymously error', error)
        console.error(error)
      } finally {
        setLoading(false)
      }
    },
    [setUser]
  )

  return (
    <Center flex={1}>
      <Stack space={2} width={'100%'} alignItems="center">
        <FormControl isInvalid={'email' in errors} alignItems="center">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <Input
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  w="75%"
                  maxW="300px"
                  size={'md'}
                  onChangeText={(value) => onChange(value.toLowerCase())}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Email"
                />
              )
            }}
            name="email"
          />
          <FormControl.ErrorMessage>
            {errors.email?.message}
          </FormControl.ErrorMessage>
        </FormControl>

        <Button
          onPress={handleSubmit(signIn)}
          isLoading={loading}
          isLoadingText="Reticulating Splines"
        >
          Sign In
        </Button>
      </Stack>
    </Center>
  )
}

export function AuthStack() {
  return (
    <NavStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NavStack.Screen name="Login" component={LoginScreen} />
    </NavStack.Navigator>
  )
}
