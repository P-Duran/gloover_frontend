import { Box, Divider, Grid, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import { StatistierItem } from "types/StatisterTypes";
import { Card } from "common/Card";
import { PercentagePie } from "common/charts/PercentagePie";
import { CircularIcon } from "common/CircularIcon";
import { LateralMenu } from "./components/LateralMenu";
import { SentenceBarChar } from "./components/SentenceBarChart";
import { SentencesCarousel } from "./components/SentencesCarousel";
import { SentenceLineChar } from "./components/SentenceLineChart";
interface Props {
  items: StatistierItem[];
}

export const Statister = ({ items }: Props) => {
  const [selected, setSelected] = useState<StatistierItem>();
  const theme = useTheme();
  return (
    <Card sm={12}>
      <Box display="flex" flexDirection="row">
        <LateralMenu
          items={items}
          selected={selected}
          setSelected={setSelected}
        ></LateralMenu>
        <Grid
          container
          style={{ padding: 10, height: window.innerHeight * 0.8 }}
        >
          <Grid
            item
            container
            xs={12}
            md={6}
            justify="center"
            alignItems="center"
            style={{ height: 100 }}
          >
            <CircularIcon size={100} colors={theme.palette.orange}>
              <CircularIcon size={80}>
                <Typography variant="h4">
                  {((selected?.data.score ?? 0) * 10).toFixed(2)}
                </Typography>
              </CircularIcon>
            </CircularIcon>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={6}
            justify="center"
            alignItems="center"
            style={{ height: 100 }}
          >
            <PercentagePie
              maxWidth={100}
              value={selected?.data.positiviness ?? 0}
              total={100}
            ></PercentagePie>
          </Grid>
          <Divider style={{ width: "100%", margin: "20px 0 20px 0" }} />
          <Grid
            item
            xs={12}
            md={6}
            style={{ height: window.innerHeight * 0.4 }}
          >
            <SentenceBarChar featureId={selected?.id}></SentenceBarChar>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ height: window.innerHeight * 0.4 }}
          >
            <SentenceLineChar featureId={selected?.id}></SentenceLineChar>
          </Grid>
          <Divider style={{ width: "100%", margin: "20px 0 20px 0" }} />
          <Grid
            item
            xs={12}
            md={12}
            style={{ height: window.innerHeight * 0.3 }}
          >
            <SentencesCarousel featureId={selected?.id}></SentencesCarousel>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
