import { IconButton } from "@material-ui/core";
import { Grid, Badge, useTheme } from "@material-ui/core";
import FeatherIcon from "feather-icons-react";
import { motion } from "framer-motion";

export interface AppBarButton {
  icon: string;
  color: string;
  value?: number;
}
interface Props {
  buttons: AppBarButton[];
}
export function AppBarOptions({ buttons }: Props) {
  const theme = useTheme();
  return (
    <Grid container justify="flex-end" spacing={1}>
      {buttons.map((button) => (
        <Grid item key={button.icon}>
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <IconButton
              style={{
                padding: 10,
                backgroundColor:
                  button.color === "light"
                    ? theme.palette.primary.light
                    : theme.palette.primary.main,
              }}
            >
              {button.value !== undefined ? (
                <Badge
                  badgeContent={button.value}
                  color="secondary"
                  style={{ color: "white" }}
                >
                  <FeatherIcon icon={button.icon} color="white" />
                </Badge>
              ) : (
                <FeatherIcon icon={button.icon} color="white" />
              )}
            </IconButton>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
