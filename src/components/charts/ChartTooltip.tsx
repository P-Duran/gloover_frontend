import { makeStyles, Grid, Box } from "@material-ui/core";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 25,
    backgroundColor: "white",
    boxShadow: "0px 2px 15px 1px rgba(0, 0, 0, 0.1)",
    padding: "20px 30px 20px 30px",
    scale: 0.2,
  },
}));

interface Props {
  data: any;
  color: string;
}
export const ChartTooltip = ({ data, color }: Props) => {
  const classes = useStyles();
  return (
    <motion.div className={classes.paper} animate={{ scale: 5 }}>
      <Grid container spacing={1}>
        <Grid
          container
          item
          direction={"row"}
          alignContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Box
              height={15}
              width={15}
              borderRadius={100}
              style={{ backgroundColor: color }}
            />
          </Grid>
          <Grid item>{data.label}</Grid>
        </Grid>
        <Box px={0.3} fontWeight={600} fontSize={16} textAlign="center">
          {data.value}
        </Box>
      </Grid>
    </motion.div>
  );
};
