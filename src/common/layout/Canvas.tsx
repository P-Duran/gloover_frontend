import { Grid, GridSpacing } from "@material-ui/core";

interface Props {
  spacing: GridSpacing;
  children: JSX.Element[] | JSX.Element;
}
export const Canvas = ({ spacing = 0, children }: Props) => {
  return (
    <Grid container spacing={spacing}>
      {children}
    </Grid>
  );
};
