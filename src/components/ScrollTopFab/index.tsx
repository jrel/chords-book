import React from 'react'
import Fab from '@material-ui/core/Fab'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Zoom from '@material-ui/core/Zoom'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

interface Props {
  window?: () => Window
  scrollIntoViewBehavior?: ScrollIntoViewOptions['behavior']
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
)

const ScrollTopFab = ({ window, scrollIntoViewBehavior = 'smooth' }: Props) => {
  const classes = useStyles()
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const doc = (event.target as HTMLDivElement).ownerDocument || document
    const anchor = doc.querySelector('body')

    if (anchor) {
      anchor.scrollIntoView({ behavior: scrollIntoViewBehavior })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  )
}

export default ScrollTopFab
