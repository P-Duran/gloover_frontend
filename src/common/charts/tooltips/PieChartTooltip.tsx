import { makeStyles, Grid, Box } from "@material-ui/core";
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

interface Props {
  data: any;
  color: string;
}
export const PieChartTooltip = ({ data, color }: Props) => {
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
          {Object.keys(products).length > 0 &&
            Object.keys(products).includes(data.label) && (
              <img
                alt="img"
                src={
                  Object.keys(products).length > 0 &&
                  Object.keys(products).includes(data.label)
                    ? products[data.label].images[0]
                    : undefined
                }
                height="60"
              />
            )}
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
            <Grid item>{data.label}</Grid>
          </Grid>
          <Grid item>
            <Box px={0.3} fontWeight={600} fontSize={20} textAlign="center">
              {data.value}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </motion.div>
  );
};
