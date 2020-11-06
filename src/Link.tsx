import React from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link'

interface Props {
  href: NextLinkProps['href']
  children: MuiLinkProps['children'],
}
export default function ({ href, children }: Props) {
  return (
    <NextLink href={href}>
      <MuiLink>{children}</MuiLink>
    </NextLink>
  )
}
