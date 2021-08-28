import { Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import { Card } from "common/Card";
import { Product } from "types/ProductTypes";
import Rating from "@material-ui/lab/Rating";
import { AnimatedTooltip } from "common/tootltip/AnimatedTooltip";
import { ellipsisText } from "utils/StringUtils";

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: "0px 2px 15px 1px rgb(117, 117, 253, 0.2)",
    width: "100%",
    height: 250,
    [theme.breakpoints.down("md")]: {
      height: "100%",
    },
  },
}));
interface Props {
  product: Product;
}
export const ProductImageCard = ({ product }: Props) => {
  const classes = useStyles();
  return (
    <>
      <Card xs={12} md={9} className={classes.card}>
        <Grid
          container
          justify="space-between"
          alignItems="center"
          style={{ height: "100%" }}
        >
          <Grid item xs={12} md={8} container>
            <Grid
              item
              container
              justify="center"
              alignContent="flex-start"
              direction="column"
              style={{ height: 40 }}
            >
              <AnimatedTooltip
                disableChildrenAnimation
                content={product.rating}
              >
                <Rating
                  name="read-only"
                  precision={0.1}
                  readOnly
                  value={product.rating}
                />
              </AnimatedTooltip>
              <Divider orientation="vertical" style={{ margin: 10 }} />
              <Typography
                variant="h6"
                align="left"
                style={{ color: "#3f3d56" }}
              >
                {product.price}
              </Typography>
            </Grid>
            <Typography variant="h6" align="left" style={{ color: "#3f3d56" }}>
              {product.name.split(",")[0]}
            </Typography>

            <Typography
              variant="body2"
              align="left"
              style={{ color: "#3f3d56" }}
            >
              {ellipsisText(product.product_description, 1000, 400, true)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} style={{ height: "100%", padding: 5 }}>
            <img alt={product.name} src={product.images[0]} height={200} />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};
