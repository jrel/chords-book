import List from '@material-ui/core/List'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { NextPage } from 'next'
import React from 'react'

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
)
const Index: NextPage<Props> = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <List>
        {/* {photos.map((photo) => (
          <NextLink key={photo.id.toString()} href={`/photos/${photo.id}`}>
            <ListItem button component="a">
              <ListItemAvatar>
                <Avatar alt={photo.title} src={photo.thumbnailUrl} />
              </ListItemAvatar>
              <ListItemText primary={photo.title} />
            </ListItem>
          </NextLink>
        ))} */}
      </List>
    </div>
  )
}
Index.getInitialProps = async () => {
  return {}
}

export default Index
