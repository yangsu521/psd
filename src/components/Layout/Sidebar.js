import sidebarBgImage from '../../assets/img/sidebar/sidebar-4.jpg';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import {
  MdAccountCircle,
  MdArrowDropDownCircle,
  MdBorderAll,
  MdBrush,
  MdChromeReaderMode,
  MdDashboard,
  MdExtension,
  MdGroupWork,
  MdInsertChart,
  MdKeyboardArrowDown,
  MdNotificationsActive,
  MdPages,
  MdRadioButtonChecked,
  MdSend,
  MdStar,
  MdTextFields,
  MdViewCarousel,
  MdViewDay,
  MdViewList,
  MdWeb,
  MdWidgets,
} from 'react-icons/md';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import Collapse from '@material-ui/core/Collapse';
import { NavLink } from 'react-router-dom';

import bn from '../../utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navComponents = [
  { to: '/buttons', name: 'buttons', exact: false, Icon: MdRadioButtonChecked },
  {
    to: '/button-groups',
    name: 'button groups',
    exact: false,
    Icon: MdGroupWork,
  },
  { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
  { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
  {
    to: '/dropdowns',
    name: 'dropdowns',
    exact: false,
    Icon: MdArrowDropDownCircle,
  },
  { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
  { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
  { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
  { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
];

const navContents = [
  { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
  { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
];

const pageContents = [
  { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
  {
    to: '/login-modal',
    name: 'login modal',
    exact: false,
    Icon: MdViewCarousel,
  },
];

const navItems = [
  { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/types', name: 'Types', exact: false, Icon: MdWeb },
];

const bem = bn.create('sidebar');
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
function Sidebar() {
  const classes = useStyles();

  return (
    <aside className={bem.b()} data-image={sidebarBgImage}>
      <div className={bem.e('background')} style={sidebarBackground} />
      <div className={bem.e('content')}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              List Items
            </ListSubheader>
          }
          className={classes.root}
        >
          {navItems.map(({ to, name, exact, Icon }, index) => {
            return (
              // <ListItem button>
              //   <NavLink
              //     id={`navItem-${name}-${index}`}
              //     className="text-uppercase"
              //     to={to}
              //     activeStyle={{ color: 'red' }}
              //     exact={exact}
              //   >
              //     {/* <ListItemIcon>
              //       <SendIcon />
              //     </ListItemIcon> */}
              //     <ListItemText primary={name} />
              //   </NavLink>
              // </ListItem>
              <MenuItem>
                <NavLink to={to}>
                  
                  {/* <ListItemText primary={name} /> */}
                  <Typography >
                  <ListItemIcon>
                    <SendIcon fontSize="small" />
                  </ListItemIcon>
                    {name}
                  </Typography>
                </NavLink>
              </MenuItem>

            );
          })}
        </List>

      </div>
    </aside>
  );
}

export default Sidebar;
