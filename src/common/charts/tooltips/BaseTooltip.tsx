import { makeStyles } from "@material-ui/core";
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

export const BaseTooltip = ({ children }: any) => {
  const classes = useStyles();

  return (
    <motion.div className={classes.paper} animate={{ scale: 5 }}>
      {children}
    </motion.div>
  );
};
