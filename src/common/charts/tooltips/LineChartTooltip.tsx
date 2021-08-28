import { makeStyles, Grid, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { GlobalContext } from "context/GlobalContextProvider";
import { motion } from "framer-motion";
import { useContext } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 25,
    backgroundColor: "white",
    boxShadow: "0px 2px 15px 1px rgba(0, 0, 0, 0.1)",
    padding: "20px 30px 20px 30px",
    scale: 0.2,
  },
}));

export const LineChartTooltip = ({ data, color }: any) => {
  const classes = useStyles();
  const { products } = useContext(GlobalContext);

  return (
    <motion.div className={classes.paper} animate={{ scale: 5 }}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          {products[data.serieId] && (
            <img
              alt="img"
              src={products[data.serieId]?.images[0]}
              height="60"
            />
          )}
        </Grid>
        <Grid
          item
          container
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
          <Grid item>{data.serieId}</Grid>
        </Grid>

        <Grid item>
          <Box fontWeight={600}>{data.data.xFormatted}</Box>
        </Grid>
        <Grid item>
          <Rating
            name="read-only"
            precision={0.1}
            readOnly
            size="small"
            value={data.data.yFormatted}
          />
        </Grid>
      </Grid>
    </motion.div>
  );
};
