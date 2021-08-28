import { Box, makeStyles } from "@material-ui/core";
import { PaletteColor } from "@material-ui/core/styles/createPalette";
interface StyleProps {
  colors?: PaletteColor;
  size?: number;
  floating?: boolean;
}

const useStyles = makeStyles((theme) => ({
  circle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    bottom: 0,
    position: ({ floating }: StyleProps) => (floating ? "absolute" : undefined),
    height: ({ size }: StyleProps) => size ?? 40,
    width: ({ size }: StyleProps) => size ?? 40,
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
  size?: number;
  floating?: boolean;
}
export const CircularIcon = ({ colors, size, floating, children }: Props) => {
  const classes = useStyles({ colors, size, floating });
  return <Box className={classes.circle}>{children}</Box>;
};
