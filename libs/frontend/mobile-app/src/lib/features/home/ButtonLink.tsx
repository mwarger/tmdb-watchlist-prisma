import React from 'react'
import { Button } from 'native-base'
import { useLink, UseLinkProps } from 'solito/link'

export function ButtonLink({ href, as, ...props }: ButtonLinkProps) {
  const linkProps = useLink({
    href,
    as,
  })

  return (
    <Button {...props} {...linkProps}>
      {props.children}
    </Button>
  )
}
type ButtonLinkProps = UseLinkProps & { children: React.ReactNode }
