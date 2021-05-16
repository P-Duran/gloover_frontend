import { Box, makeStyles } from "@material-ui/core";
interface StyleProps {
  color?: string;
  backgroundColor?: string;
  padding?: string | number;
  borderRadius?: string | number;
  size?: "small" | "medium" | "big";
}
const getSizes = (size: "small" | "medium" | "big" | undefined) => {
  switch (size) {
    case "small":
      return 25;
    case "medium":
      return 40;
    case "big":
      return 50;
    default:
      return;
  }
};
const useStyles = makeStyles((theme) => ({
  chip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: ({ size }: StyleProps) => getSizes(size),
    width: ({ size }: StyleProps) => getSizes(size),
    borderRadius: ({ borderRadius }: StyleProps) => borderRadius,
    padding: ({ padding }: StyleProps) => padding,
    backgroundColor: ({ backgroundColor }: StyleProps) =>
      backgroundColor ? backgroundColor : theme.palette.grey[200],
    color: ({ color }: StyleProps) => (color ? color : theme.palette.grey[900]),
  },
}));

interface Props {
  padding?: string | number;
  borderRadius?: string | number;
  backgroundColor?: string;
  color?: string;
  children?: React.ReactNode;
  size?: "small" | "medium" | "big";
  style?: React.CSSProperties;
}

export const Chip = ({
  padding = 10,
  borderRadius = 25,
  color,
  backgroundColor,
  children,
  size,
  style,
}: Props) => {
  const classes = useStyles({
    padding,
    color,
    backgroundColor,
    borderRadius,
    size,
  });
  return (
    <Box style={style} className={classes.chip}>
      {children}
    </Box>
  );
};
