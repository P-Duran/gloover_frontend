import { Box, makeStyles } from "@material-ui/core";
import { PaletteColor } from "@material-ui/core/styles/createPalette";
interface StyleProps {
  colors?: PaletteColor;
}

const useStyles = makeStyles((theme) => ({
  circle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 40,
    width: 40,
    borderRadius: 100,
    padding: 10,
    background: ({ colors }: StyleProps) =>
      colors ? colors.light : theme.palette.secondary.light,
    color: ({ colors }: StyleProps) =>
      colors ? colors.main : theme.palette.secondary.main,
  },
}));
interface Props {
  colors?: PaletteColor;
  children?: React.ReactChild;
}
export const CircularIcon = ({ colors, children }: Props) => {
  const classes = useStyles({ colors });
  return <Box className={classes.circle}>{children}</Box>;
};
