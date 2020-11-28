import ListItem, { ListItemTypeMap } from '@material-ui/core/ListItem'
import { ExtendButtonBase } from '@material-ui/core/ButtonBase'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

type ListItemProps = ExtendButtonBase<ListItemTypeMap<{}, 'a'>>

export interface Props extends Omit<ListItemProps, 'component'> {
  href: string
}
export function ListItemLink(props: PropsWithChildren<Props>) {
  const { href, children, ...rest } = props
  return (
    <Link href={href}>
      <ListItem button component="a" {...rest}>
        {children}
      </ListItem>
    </Link>
  )
}
