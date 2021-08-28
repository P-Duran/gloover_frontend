import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import { CircularIcon } from "common/CircularIcon";
import FeatherIcon from "feather-icons-react";
import React from "react";
import { StatistierItem } from "types/StatisterTypes";
import { titleCase } from "utils/StringUtils";

const useStyles = makeStyles((theme) => ({
  lateralMenu: {
    width: 200,
    paddingRight: 25,
    borderRight: "1px solid " + theme.palette.grey[200],
    height: window.innerHeight*0.8,
    overflow: "auto",
  },
}));
interface Props {
  items: StatistierItem[];
  selected?: StatistierItem;
  setSelected: (e: any) => any;
}

export const LateralMenu = ({ items, selected, setSelected }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box>
      <Box
        height={40}
        marginBottom={3}
        width="100%"
        borderRadius={25}
        border={"1px solid " + theme.palette.grey[300]}
        paddingX={1}
        style={{
          color: theme.palette.grey[600],
          backgroundColor: "rgb(244, 246, 248)",
          justifyContent: "space-between",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        Search
        <Box display="flex" flexDirection="row">
          <FeatherIcon icon="search" size={20}></FeatherIcon>
        </Box>
      </Box>
      <List className={classes.lateralMenu}>
        {items
          .sort((a, b) => b.data.score - a.data.score)
          .map((item) => (
            <ListItem
              key={item.id}
              button
              selected={selected?.id === item.id}
              onClick={() => setSelected(item)}
            >
              <ListItemIcon>
                <CircularIcon size={35} colors={theme.palette.primary}>
                  {(item.data.score * 10).toFixed(2)}
                </CircularIcon>
              </ListItemIcon>
              <ListItemText>
                <Typography variant="body1">{titleCase(item.title)}</Typography>
              </ListItemText>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};
