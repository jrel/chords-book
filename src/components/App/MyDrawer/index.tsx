import React, { useCallback, useState } from 'react'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MailIcon from '@material-ui/icons/Mail'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import Drawer from '@material-ui/core/Drawer'
import { Backdrop } from '@material-ui/core'

interface State {
  isOpen: boolean
  isClosed: boolean
  open: () => void
  close: () => void
  togle: () => void
}
const DrawerStateContext = React.createContext<State>(null)

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  paper: {
    width: drawerWidth,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer - 1,
    color: '#fff',
  },
}))
interface Props {
  children: JSX.Element
}
const MyDrawerProvider = ({ children }: Props) => {
  const classes = useStyles()

  const [isOpen, setOpen] = useState(false)

  const state: State = {
    isOpen: isOpen,
    isClosed: !isOpen,
    open: useCallback(() => setOpen(true), []),
    close: useCallback(() => setOpen(false), []),
    togle: useCallback(() => setOpen((state) => !state), []),
  }
  return (
    <DrawerStateContext.Provider value={state}>
      <>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={isOpen}
          classes={{
            paper: classes.paper,
          }}
        >
          <div className={classes.header}>
            <IconButton onClick={state.close}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        {children}
        <Backdrop
          className={classes.backdrop}
          open={isOpen}
          onClick={state.close}
        ></Backdrop>
      </>
    </DrawerStateContext.Provider>
  )
}

export default MyDrawerProvider
export const MyDrawerConsumer = DrawerStateContext.Consumer
export const useDrawer = () => {
  return React.useContext(DrawerStateContext)
}
