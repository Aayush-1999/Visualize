import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles,withStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './SideDrawer.styles';

const useStyles = makeStyles(styles);

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.7)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

function SideDrawer(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const list1=t('SideDrawer.list1',{returnObjects: true})
  const list2=t('SideDrawer.list2',{returnObjects: true})
  const list= (
    <div>
      <List>
        {list1.map((text, index) => (
          <ListItem button key={text} component={RouterLink} to={'/'+text} >
            <ListItemIcon>
              {index % 2 === 0 ? 
              <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}  
      </List>
      <Divider />
      <List>
        {list2.map((text, index) => (
          <ListItem button key={text} component={RouterLink} to={'/'+text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  const listWithTooltip= (
    <div>
      <List>
        {list1.map((text, index) => (
          <CustomTooltip title={text}  key={text} arrow id={text} placement='right' >
            <ListItem button key={text} component={RouterLink} to={'/'+text} >
              <ListItemIcon>
                {index % 2 === 0 ? 
                <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </CustomTooltip>
        ))}  
      </List>
      <Divider />
      <List>
        {list2.map((text, index) => (
          <Tooltip title={text} key={text} arrow id={text} placement='right' >
            <ListItem button key={text} component={RouterLink} to={'/'+text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </div>
  )

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.show,
        [classes.drawerClose]: !props.show,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.show,
          [classes.drawerClose]: !props.show,
        }),
      }}
    >
      <div className={classes.toolbar}>
          <IconButton onClick={props.onClickHandler}>
            <ChevronLeftIcon />
          </IconButton>
      </div>
      <Divider />
      {props.show?list:listWithTooltip}
    </Drawer>
  );
}

export default SideDrawer;