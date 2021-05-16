import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { useTheme } from "@material-ui/core/styles";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  item: {
    margin: "5px 0 5px 0",
    borderRadius: 10,
  },
  active: {
    backgroundColor: "red",
  },
}));

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  selectionRoutes?: string[];
}

const menuItems: MenuItem[] = [
  {
    label: "Home",
    icon: "home",
    route: "/dashboard",
  },
  {
    label: "Products",
    icon: "package",
    route: "/products",
    selectionRoutes: ["/products", "/product"],
  },
  {
    label: "Reviews",
    icon: "message-circle",
    route: "/reviews",
  },
  {
    label: "Statistics",
    icon: "bar-chart",
    route: "/statistics",
  },
  {
    label: "Model",
    icon: "git-merge",
    route: "/model",
  },
];

export function LateralMenu() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();

  const handleClick = (route: string) => {
    if (location.pathname !== route) {
      history.push(route);
    }
  };
  return (
    <div>
      <div className={classes.toolbar} />
      <List>
        {menuItems.map((menuItem) => (
          <motion.div
            key={menuItem.label}
            whileHover={{
              scale: location.pathname === menuItem.route ? 1 : 1.05,
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ListItem
              button
              selected={
                menuItem.selectionRoutes
                  ? menuItem.selectionRoutes.includes(location.pathname)
                  : location.pathname === menuItem.route
              }
              onClick={() => handleClick(menuItem.route)}
            >
              <ListItemIcon>
                <FeatherIcon
                  icon={menuItem.icon}
                  color={
                    (
                      menuItem.selectionRoutes
                        ? menuItem.selectionRoutes.includes(location.pathname)
                        : location.pathname === menuItem.route
                    )
                      ? theme.palette.common.white
                      : theme.palette
                  }
                />
              </ListItemIcon>
              <ListItemText>{menuItem.label}</ListItemText>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </div>
  );
}
