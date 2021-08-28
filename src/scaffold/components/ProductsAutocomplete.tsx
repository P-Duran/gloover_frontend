/* eslint-disable no-use-before-define */
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Avatar,
  Box,
  Dialog,
  InputBase,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import FeatherIcon from "feather-icons-react";
import Button from "@material-ui/core/Button";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { GlobalContext } from "context/GlobalContextProvider";
import { scrapeProduct } from "model/api/scraper/ScraperApi";
import { ProgressContext } from "context/ProgressContextProvider";
import { useHistory } from "react-router-dom";
import { AnimatedTooltip } from "common/tootltip/AnimatedTooltip";
const useStyles = makeStyles((theme) => ({
  addAvatar: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
  },
}));

interface Props {
  setValue: Dispatch<SetStateAction<string | undefined>>;
}

interface Option {
  title: string;
  id: string;
  img?: string;
  searchValue?: string;
}

interface DialogValue {
  url?: string;
  maxRequests: number;
}
export const ProductsAutocomplete = ({ setValue }: Props) => {
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState<DialogValue>({
    maxRequests: 10,
  });

  const { setProductsProgress } = useContext(ProgressContext);
  const { products } = useContext(GlobalContext);
  const history = useHistory();
  const classes = useStyles();

  const handleClose = () => {
    setDialogValue({
      maxRequests: 10,
    });
    toggleOpen(false);
  };

  const filterOptions = createFilterOptions({
    stringify: (option: Option) => option.searchValue ?? "",
  });

  return (
    <React.Fragment>
      <Autocomplete
        // value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            newValue === "id@addNew" && setValue(newValue);
          } else if (newValue?.id !== "id@addNew") {
            setValue(newValue?.id);
            history.push({
              pathname: "/product",
              search: "?id=" + newValue?.id,
            });
          } else {
            toggleOpen(true);
          }
        }}
        filterOptions={(options, state) => {
          const filter = filterOptions(options, state);
          filter.push({
            id: "id@addNew",
            title: "Add New Product",
          });
          return filter;
        }}
        id="free-solo-dialog-demo"
        options={Object.values(products).map((p) => {
          return {
            title: p.name,
            id: p.asin,
            img: p.images[0],
            searchValue: p.name + p.asin,
          } as Option;
        })}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        getOptionLabel={(option) =>
          option.id === "id@addNew" ? "" : option.id
        }
        renderOption={(option) =>
          option.id !== "id@addNew" ? (
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={option.title} src={option.img} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <AnimatedTooltip
                    content={option.title}
                    disableChildrenAnimation
                    enterDelay={1000}
                  >
                    {option.title.split(" ").slice(0, 2).join(" ")}
                  </AnimatedTooltip>
                }
                secondary={option.id}
              />
            </ListItem>
          ) : (
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={"aaaa"} className={classes.addAvatar}>
                  <FeatherIcon icon="package" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={option.title} />
            </ListItem>
          )
        }
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params;
          return (
            <InputBase
              {...params.InputProps}
              {...rest}
              placeholder="Insert Amazon Asin"
              onSubmit={() => console.log("submiit")}
              style={{ paddingLeft: 5 }}
            />
          );
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: { borderRadius: 25, padding: 10, minWidth: 500 },
        }}
      >
        <form>
          <DialogTitle id="form-dialog-title">
            <Box display="flex" flexDirection="row" alignItems="center">
              <Avatar style={{ marginRight: 10 }}>
                <FeatherIcon icon="package" />
              </Avatar>
              Add a New Product
            </Box>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              *The url has to contain the asin of the product
            </DialogContentText>

            <Box
              display="flex"
              flexDirection="column"
              p={0.6}
              borderRadius={25}
            >
              <Typography>Max Requests</Typography>
              <InputBase
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.maxRequests}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    maxRequests: parseInt(event.target.value),
                  })
                }
                placeholder="Write here..."
                type="number"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              p={0.6}
              borderRadius={25}
            >
              <Typography>Product URL</Typography>
              <InputBase
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue.url ?? ""}
                onChange={(event) => {
                  setDialogValue({ ...dialogValue, url: event.target.value });
                }}
                placeholder="Write here..."
                inputProps={{
                  pattern: "[a-z]{1,15}",
                }}
                type="text"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                dialogValue.url &&
                  // dialogValue.url.includes("www.amazon.com") &&
                  // dialogValue.url.includes("/dp/") &&
                  scrapeProduct({
                    url: dialogValue.url,
                    max_requests: dialogValue.maxRequests,
                    trigger: "date",
                    spider_name: "amazon",
                  })
                    .then((response) => {
                      const match = dialogValue.url
                        ? dialogValue.url.match("/dp/([^/]+)")
                        : "Invalid ASIn";
                      setProductsProgress((oldVal) => {
                        oldVal[response.data.id] = match
                          ? match[1]
                          : "Invalid ASIn";
                        return oldVal;
                      });
                      handleClose();
                    })
                    .catch((error) => console.error(error));
              }}
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
