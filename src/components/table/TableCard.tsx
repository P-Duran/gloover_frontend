import { Card } from "components/Card";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
  withStyles,
  TableCell,
  TableBody,
  Toolbar,
  Box,
  CardMedia,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { AnimatedTooltip } from "components/tootltip/AnimatedTooltip";
import {
  capitalizeFirstLetter,
  ellipsisText,
  isImage,
} from "utils/StringUtils";
import { IconButton } from "@material-ui/core";
import FeatherIcon from "feather-icons-react";

const useStyles = makeStyles((theme) => ({
  chart: {
    height: 400,
    [theme.breakpoints.up("sm")]: {
      height: 200,
    },
    [theme.breakpoints.up("xs")]: {
      height: 200,
    },
    [theme.breakpoints.up("md")]: {
      height: 400,
    },
  },
  table: {},
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "rgb(244, 246, 248)",
    color: theme.palette.common.black,
    fontWeight: 550,
    border: "none",
  },
  body: {
    fontSize: 14,
    border: "none",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    border: "none",
  },
}))(TableRow);

interface Props {
  data: any[];
  title: string;
}
export const TableCard = ({ data, title }: Props) => {
  const [header, setHeader] = useState<string[]>([]);
  const classes = useStyles();

  const extractHeader = (data: any[]) => {
    const newHeader: Set<string> = new Set<string>();
    data.forEach((element) =>
      Object.keys(element).forEach((key) => newHeader.add(key))
    );
    setHeader([...newHeader]);
  };

  const buildHeader = (header: string[]) => {
    return (
      <TableRow>
        {[
          ...header.map((element, index) => (
            <StyledTableCell
              align="left"
              style={{ borderRadius: index === 0 ? "20px 0 0 20px" : 0 }}
            >
              {capitalizeFirstLetter(element)}
            </StyledTableCell>
          )),
          <StyledTableCell
            align="left"
            style={{ borderRadius: "0 20px 20px 0" }}
          />,
        ]}
      </TableRow>
    );
  };

  const buildRows = (data: any[], header: string[]) => {
    return data.map((element, index) => (
      <StyledTableRow key={index}>
        {[
          ...header.map((key) => (
            <StyledTableCell scope="row">
              {isImage(element[key].toString()) ? (
                <AnimatedTooltip
                  placement="right"
                  interactive
                  content={
                    <CardMedia
                      component="img"
                      image={element[key][0]}
                      height="140"
                    />
                  }
                >
                  <img alt="guaca" src={element[key][0]} height={40} />
                </AnimatedTooltip>
              ) : (
                ellipsisText(element[key].toString())
              )}
            </StyledTableCell>
          )),
          <StyledTableCell scope="row">
            <IconButton style={{ padding: 7 }}>
              <FeatherIcon icon="more-vertical" />
            </IconButton>
          </StyledTableCell>,
        ]}
      </StyledTableRow>
    ));
  };

  useEffect(() => {
    extractHeader(data);
  }, [data]);

  return (
    <Card xs={12} sm={12} md={12}>
      <TableContainer>
        <Toolbar>
          <Box fontWeight={550} fontSize={20} textAlign="left">
            {title}
          </Box>
        </Toolbar>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>{buildHeader(header)}</TableHead>
          <TableBody>{buildRows(data, header)}</TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
