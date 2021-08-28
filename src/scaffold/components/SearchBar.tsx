import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { AmazonIcon } from "resources/UnDrawnVectors";
import { ProductsAutocomplete } from "./ProductsAutocomplete";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    margin: "2px 2px 2px 2px",
    display: "flex",
    alignItems: "center",
    borderRadius: 25,
    width: 500,
    boxShadow: "0px 2px 15px 1px rgba(0, 0, 0, 0.1)",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export const SearchBar = () => {
  const [value, setValue] = useState<string>();
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={() =>
          value &&
          history.push({
            pathname: "/product",
            search: "?id=" + value,
          })
        }
      >
        <SearchIcon />
      </IconButton>
      <ProductsAutocomplete setValue={setValue} />
      {/* <InputBase
        className={classes.input}
        placeholder="Insert an Amazon Product Url"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(event) => setUrl(event.target.value)}
      /> */}
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
      >
        <AmazonIcon height={25} />
      </IconButton>
    </Paper>
  );
};
