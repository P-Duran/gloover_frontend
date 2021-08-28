import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { drawerWidth } from "constants/sizes";
import { AppBarOptions, AppBarButton } from "scaffold/components/AppBarOptions";
import { SearchBar } from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "transparent",
    color: "grey",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

interface Props {
  handleDrawerToggle: () => void;
}

const options: AppBarButton[] = [
  { icon: "bell", color: "light", value: 3 },
  { icon: "settings", color: "light" },
  { icon: "user", color: "main" },
];
export function CustomAppBar({ handleDrawerToggle }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <SearchBar />
        <AppBarOptions buttons={options} />
      </Toolbar>
    </AppBar>
  );
}

CustomAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  handleDrawerToggle: PropTypes.func,
};
