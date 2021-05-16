import {
  CardMedia,
  Grid,
  IconButton,
  Box,
  GridSize,
  makeStyles,
} from "@material-ui/core";
import { Card } from "components/Card";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: "300px",
    paddingTop: "56.25%", // 16:9
  },
}));

interface Props {
  images: string[];
  height?: string | number;
  xs?: GridSize;
}
export const Carousel = ({ images, height, xs = 3 }: Props) => {
  const [index, setIndex] = useState(0);
  const classes = useStyles();

  return (
    <>
      <div style={{ height: height }}>
        <img
          alt="product"
          src={images[0]}
          style={{ maxWidth: "100%", maxHeight: "80%" }}
        />
      </div>
      {/* <CardMedia
        component="img"
        image={images[index]}
        className={classes.media}
      /> */}
      <Grid container justify="space-between" style={{ position: "relative" }}>
        <Box
          bgcolor="rgba(0,0,0,0.8)"
          borderRadius={10}
          position="absolute"
          right={10}
          bottom={5}
          zIndex="tooltip"
        >
          {images.length > 1 && (
            <Grid container>
              <IconButton
                style={{
                  color: "white",
                  fontSize: 15,
                }}
                onClick={() => setIndex((index + 1) % images.length)}
              >
                {"<"}
              </IconButton>
              <IconButton
                style={{
                  color: "white",
                  fontSize: 15,
                }}
                onClick={() =>
                  setIndex(index - 1 < 0 ? images.length - 1 : index - 1)
                }
              >
                {">"}
              </IconButton>
            </Grid>
          )}
        </Box>
      </Grid>
    </>
  );
};
