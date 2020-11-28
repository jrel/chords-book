import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { useState, Fragment } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { GetStaticProps, NextPage } from 'next'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import StarIcon from '@material-ui/icons/Star'

import {
  Avatar,
  Collapse,
  Divider,
  Fade,
  IconButton,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'
import { ListItemLink } from '../src/components/LinkListItem'

interface Props {
  categories: Array<string>
  avatar: boolean
}

const useStyles = makeStyles((theme: Theme) => {
  const transition = {
    duration: theme.transitions.duration.shortest,
  }
  return createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    expanded: {},
    button: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', transition),
      '&$expanded': {
        transform: 'rotate(180deg)',
      },
    },
  })
})
const Index: NextPage<Props> = ({ categories, avatar }) => {
  const classes = useStyles()
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className={classes.root}>
      <List>
        {categories.map((category) => (
          <Fragment key={category}>
            <Fade key={`divider-0-${category}`} in={category === active}>
              <Divider />
            </Fade>
            <ListItem
              key={`category-${category}`}
              button
              onClick={() =>
                setActive((current) => (current !== category ? category : null))
              }
            >
              {avatar ? (
                <ListItemAvatar>
                  <Avatar>
                    <Typography variant="button">
                      {category.toUpperCase()}
                    </Typography>
                  </Avatar>
                </ListItemAvatar>
              ) : (
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
              )}
              <ListItemText primary={category} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  className={clsx(classes.button, {
                    [classes.expanded]: category === active,
                  })}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse
              key={`children-${category}`}
              in={active === category}
              timeout="auto"
              unmountOnExit
            >
              {categories.map((category) => (
                <List key={category} component="div" disablePadding>
                  <ListItemLink href="/about">
                    <ListItemText inset primary={category} />
                  </ListItemLink>
                </List>
              ))}
            </Collapse>
            <Fade key={`divider-1-${category}`} in={category === active}>
              <Divider />
            </Fade>
          </Fragment>
        ))}
      </List>
    </div>
  )
}
export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      categories: ['a', 'b', 'c'],
      avatar: false,
    },
  }
}

export default Index
