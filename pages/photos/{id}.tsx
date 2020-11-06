import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import NextLink from 'next/link'
import { NextPage } from 'next'
import Avatar from '@material-ui/core/Avatar'

interface Props {
  photo: {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
)
const Index: NextPage<Props> = ({ photo }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <List>
        {photos.map((photo) => (
          <NextLink key={photo.id.toString()} href={`/photos/${photo.id}`}>
            <ListItem button component="a">
              <ListItemAvatar>
                <Avatar alt={photo.title} src={photo.thumbnailUrl} />
              </ListItemAvatar>
              <ListItemText primary={photo.title} />
            </ListItem>
          </NextLink>
        ))}
      </List>
    </div>
  )
}
Index.getInitialProps = async ({req}) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${req.}`)
  return {
    photo: await res.json(),
  }
}

export default Index
