import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Redirect, Route, Switch } from 'react-router';
import { drawerWidth } from 'constants/sizes';
import { LateralMenu } from './components/LateralMenu';
import { CustomAppBar } from 'scaffold/components/CustomAppBar';
import { Dashboard } from 'pages/dashboard/Dashboard';
import { ProductPage } from 'pages/product/ProductPage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    border: '0',
    paddingLeft: '20px',
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
    overflow: "hidden"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

function Scaffold({ window }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  const drawer = LateralMenu();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <CustomAppBar handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/products">
            TODO Products
          </Route>
          <Route path="/reviews">
            TODO Reviews
          </Route>
          <Route path="/statistics">
            TODO Statistics
          </Route>
          <Route path="/model">
            TODO model
          </Route>
          <Route path="/product">
            <ProductPage />
          </Route>
          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </main>
    </div >
  );
}

Scaffold.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Scaffold;
