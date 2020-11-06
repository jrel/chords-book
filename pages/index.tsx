import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React, { useMemo, useState } from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { NextPage } from 'next'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  Collapse,
  Divider,
  Fade,
  IconButton,
  ListItemSecondaryAction,
} from '@material-ui/core'
import clsx from 'clsx'

interface Props {
  categories: Array<string>
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
const Index: NextPage<Props> = ({ categories }) => {
  const classes = useStyles()
  const [active, setActive] = useState<string | null>(null)

  const CategoryListItem = useMemo(
    () => ({ category }) => (
      <ListItem>
        <ListItemText primary={category} />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            className={clsx(classes.button, {
              [classes.expanded]: category === active,
            })}
            onClick={() =>
              setActive((current) => (current !== category ? category : null))
            }
          >
            <ExpandMoreIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ),
    [classes, setActive]
  )

  const CollapseCategories = useMemo(
    () => ({ active }) => (
      <Collapse in={active}>
        <List>
          {categories.map((category) => (
            <ListItem key={category}>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    ),
    [categories]
  )

  const categoriesToRender = useMemo(
    () =>
      categories.reduce<
        Array<{
          type: string
          key: string
          category: typeof categories[number]
        }>
      >(
        (carry, category) =>
          carry.concat([
            {
              type: 'divider',
              key: `divider-0-${category}`,
              category,
            },
            { type: 'category', key: category, category },
            {
              type: 'children',
              key: `children-${category}`,
              category,
            },
            {
              type: 'divider',
              key: `divider-1-${category}`,
              category,
            },
          ]),

        []
      ),
    [categories, active]
  )
  return (
    <div className={classes.root}>
      <List>
        {categoriesToRender.map(({ key, type, category }) => {
          switch (type) {
            case 'divider':
              return (
                <Fade key={key} in={category === active}>
                  <Divider />
                </Fade>
              )
            case 'category':
              return <CategoryListItem key={key} category={category} />
            case 'children':
              return (
                <CollapseCategories key={key} active={category === active} />
              )
          }
        })}
      </List>
    </div>
  )
}
Index.getInitialProps = async () => {
  return {
    categories: ['a', 'b', 'c'],
  }
}

export default Index
