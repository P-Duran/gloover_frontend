import {
  IconButton,
  Typography,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Grid,
  Box,
  makeStyles,
  fade,
  useTheme,
  Divider,
} from "@material-ui/core";
import { PaletteColor } from "@material-ui/core/styles/createPalette";
import { Skeleton } from "@material-ui/lab";
import { Card } from "common/Card";
import { AnimatedTooltip } from "common/tootltip/AnimatedTooltip";
import FeatherIcon from "feather-icons-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { RankingElement } from "types/RankingTypes";
interface StyleProps {
  rankingColors?: PaletteColor;
  elementColors?: PaletteColor;
}
const useStyles = makeStyles((theme) => ({
  topFeatures: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 40,
    width: 40,
    borderRadius: 100,
    padding: 10,
    background: ({ rankingColors }: StyleProps) =>
      rankingColors ? rankingColors.light : theme.palette.secondary.light,
    color: ({ rankingColors }: StyleProps) =>
      rankingColors ? rankingColors.main : theme.palette.secondary.main,
  },
  rankTooltip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 40,
    minWidth: 70,
    borderRadius: 25,
    padding: 10,
    background: ({ elementColors }: StyleProps) =>
      elementColors ? elementColors.light : theme.palette.success.light,
    color: ({ elementColors }: StyleProps) =>
      elementColors ? elementColors.main : theme.palette.success.main,
  },
}));

interface Props {
  title: string;
  titleIcon: JSX.Element;
  rankingTooltip: JSX.Element | string;
  elements: RankingElement[];
  elementsBadgetContent?: (e: RankingElement) => string;
  elementsIcon?: string;
  elementTooltipGenerator: (e: RankingElement) => string;
  sortFunction?: (a: RankingElement, b: RankingElement) => number;
  elementColors?: PaletteColor;
  rankingColors?: PaletteColor;
}
export const RankingCard = ({
  elements,
  title,
  titleIcon,
  rankingTooltip,
  elementTooltipGenerator,
  elementColors,
  rankingColors,
  elementsIcon,
  elementsBadgetContent = (e) => e.value.toFixed(1) + "%",
  sortFunction = (a, b) => b.value - a.value,
}: Props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ elementColors, rankingColors });
  const theme = useTheme();
  const alwaysVisible = 3;
  const rankingElements = elements.sort(sortFunction);

  const generateListItems = (from: number, to: number) => {
    return rankingElements.length > 0
      ? rankingElements.slice(from, to).map((e, i) => (
          <ListItem key={i}>
            <ListItemText primary={e.title} secondary={e.subtitle} />
            <AnimatedTooltip content={elementTooltipGenerator(e)}>
              <Box className={classes.rankTooltip}>
                {elementsBadgetContent(e)}
                <FeatherIcon
                  icon={elementsIcon}
                  size={12}
                  style={{
                    marginLeft: 5,
                  }}
                  color={fade(
                    elementColors
                      ? elementColors.main
                      : theme.palette.success.main,
                    0.3
                  )}
                  fill={fade(
                    elementColors
                      ? elementColors.main
                      : theme.palette.success.main,
                    0.3
                  )}
                />
              </Box>
            </AnimatedTooltip>
          </ListItem>
        ))
      : Array(3)
          .fill(0)
          .map((n, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={<Skeleton variant="text" width="30%" />}
                secondary={<Skeleton variant="text" />}
              />
              <Skeleton
                variant="rect"
                height={40}
                width={70}
                style={{ marginLeft: 10, borderRadius: 25 }}
              />
            </ListItem>
          ));
  };

  return (
    <Card xs={12} sm={12} md={4} style={{ minHeight: 355 }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item container xs={10} alignItems="center">
          <AnimatedTooltip content={rankingTooltip}>
            <Box mr={2} className={classes.topFeatures}>
              {titleIcon}
            </Box>
          </AnimatedTooltip>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <IconButton onClick={() => setOpen(!open)}>
          <motion.div
            animate={{ rotate: open ? 0 : 180 }}
            whileHover={{ scale: 1.1 }}
          >
            <FeatherIcon icon={"chevron-up"} />
          </motion.div>
        </IconButton>
      </Grid>

      <List>
        {generateListItems(0, alwaysVisible)}
        <Collapse in={open}>
          <Divider></Divider>
          {generateListItems(
            alwaysVisible,
            Math.min(alwaysVisible * 2, elements.length - 1)
          )}
        </Collapse>
      </List>
    </Card>
  );
};
