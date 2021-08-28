import { Card } from "common/Card";
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
  Collapse,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { titleCase} from "utils/StringUtils";
import { IconButton } from "@material-ui/core";
import FeatherIcon from "feather-icons-react";
import { RowData, TableData } from "types/TableCardTypes";

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
  table: {
    width: "100%",
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    whiteSpace: "nowrap",
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
    borderLeft: "6px solid transparent",
    border: "none",
    "&:hover": {
      borderLeft: "6px solid rgb(117, 117, 253, 0.4)",
      cursor: "pointer",
    },
  },
}))(TableRow);

interface Props {
  data: TableData;
  title: string;
  columnToShow?: string[];
  onClick?: (e: RowData) => void;
}
export const TableCard = ({
  data,
  title,
  columnToShow,
  onClick = () => null,
}: Props) => {
  const [header, setHeader] = useState<string[]>([]);
  const classes = useStyles();

  const extractHeader = (
    data: TableData,
    columnToShow: string[] | undefined
  ) => {
    const newHeader: Set<string> = new Set<string>();
    data.forEach((element) =>
      Object.keys(element.data)
        .filter((e) => (columnToShow ? columnToShow.includes(e) : true))
        .sort((a, b) =>
          columnToShow ? columnToShow.indexOf(a) - columnToShow.indexOf(b) : 0
        )
        .forEach((key) => newHeader.add(key))
    );
    setHeader([...newHeader]);
  };

  const buildHeader = (header: string[]) => {
    return (
      <TableRow>
        {[
          <StyledTableCell
            key="icon"
            padding="checkbox"
            align="left"
            style={{ borderRadius: "20px 0 0 20px" }}
          />,
          ...header.map((element, index) => (
            <StyledTableCell key={element + index} align="left">
              {titleCase(element)}
            </StyledTableCell>
          )),
          <StyledTableCell
            key="icon"
            padding="checkbox"
            align="right"
            style={{ borderRadius: "0 20px 20px 0" }}
          />,
        ]}
      </TableRow>
    );
  };

  const buildRows = (data: TableData, header: string[]) => {
    return data.map((element, index) => (
      <Row key={index} element={element} header={header} onClick={onClick} />
    ));
  };

  useEffect(() => {
    extractHeader(data, columnToShow);
  }, [columnToShow, data]);

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

interface RowProps {
  element: RowData;
  header: string[];
  onClick: (e: RowData) => void;
}
const Row = ({ element, header, onClick }: RowProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <StyledTableRow onClick={() => onClick(element)}>
        {[
          <StyledTableCell
            padding="checkbox"
            align="left"
            scope="row"
            key="icon"
          >
            {element.expandedData && (
              <IconButton
                style={{ padding: 7 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(!open);
                }}
              >
                <FeatherIcon icon="chevron-down" />
              </IconButton>
            )}
          </StyledTableCell>,
          ...header.map((key) => (
            <StyledTableCell scope="row" key={key}>
              {element.data[key]}
            </StyledTableCell>
          )),
          <StyledTableCell
            padding="checkbox"
            align="right"
            scope="row"
            key="icon"
          >
            <IconButton
              style={{ padding: 7 }}
              onClick={(e) => e.stopPropagation()}
            >
              <FeatherIcon icon="more-vertical" />
            </IconButton>
          </StyledTableCell>,
        ]}
      </StyledTableRow>
      {element.expandedData && (
        <StyledTableRow>
          <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open}>{element.expandedData}</Collapse>
          </StyledTableCell>
        </StyledTableRow>
      )}
    </>
  );
};
