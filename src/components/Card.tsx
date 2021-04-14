import { makeStyles, Paper, Grid, GridSize } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px 30px 20px 30px",
    textAlign: "center",
    height: (props: any) => props.height,
    width: (props: any) => props.width,
    borderRadius: 25,
    boxShadow: "0px 2px 15px 1px rgba(0, 0, 0, 0.1)",
  },
}));

interface Props {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  height?: any;
  width?: any;
  children?: JSX.Element;
}
export const Card = ({ xs, sm, md, height, width, children }: Props) => {
  const classes = useStyles({ height, width });
  return (
    <Grid item xs={xs} sm={sm} md={md}>
      <Paper className={classes.paper}>{children}</Paper>
    </Grid>
  );
};
