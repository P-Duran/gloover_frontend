import { Grid, Typography } from "@material-ui/core";
import { Card } from "components/Card";
import { PredictiveAnalysis } from "resources/UnDrawnVectors";

export const WelcomeCard = () => {
  return (
    <>
      <Card
        xs={12}
        md={6}
        height={200}
        style={{
          backgroundColor: "rgb(117, 117, 253, 0.2)",
          boxShadow: "0px 2px 15px 1px rgb(117, 117, 253, 0.2)",
        }}
      >
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item xs={6}>
            <Typography variant="h5" align="left" style={{ color: "#3f3d56" }}>
              Welcome back
            </Typography>
            <Typography
              variant="body2"
              align="left"
              style={{ color: "#3f3d56" }}
            >
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there isn't anything
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ height: "100%", padding: 5 }}>
            <PredictiveAnalysis />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
