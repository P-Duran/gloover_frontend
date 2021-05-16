import { makeStyles, Tooltip } from "@material-ui/core";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 25,
    backgroundColor: theme.palette.common.white,
    boxShadow: "0px 2px 15px 1px rgba(0, 0, 0, 0.1)",
    padding: "20px 30px 20px 30px",
    scale: 0.2,
    color: theme.palette.common.black,
  },
  tooltip: {
    padding: 0,
    margin: 7,
    backgroundColor: "transparent",
    fontSize: theme.typography.pxToRem(15),
  },
}));
interface Props {
  children: JSX.Element | string;
  content: any;
  interactive?: boolean;
  disableChildrenAnimation?: boolean;
  enterDelay?: number;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
}
export const AnimatedTooltip = ({
  children,
  content,
  interactive,
  placement,
  disableChildrenAnimation,
  enterDelay,
}: Props) => {
  const classes = useStyles();
  return (
    <Tooltip
      placement={placement}
      interactive={interactive}
      leaveDelay={interactive ? 100 : undefined}
      enterDelay={enterDelay}
      enterNextDelay={enterDelay}
      classes={classes}
      title={
        <motion.div className={classes.paper} animate={{ scale: 5 }}>
          {content}
        </motion.div>
      }
    >
      <motion.div whileHover={{ scale: disableChildrenAnimation ? 1.0 : 1.1 }}>
        {children}
      </motion.div>
    </Tooltip>
  );
};
