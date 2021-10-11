import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import ReplayIcon from "@material-ui/icons/Replay";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator, searchTerm) {
  const stabilizedThis = array
    .filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (val.VRN.includes(searchTerm.toLowerCase())) {
        return val;
      }
      return null;
    })
    .map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
//intialize table columns
const headCells = [
  {
    id: "col1",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "col2",
    numeric: true,
    disablePadding: false,
    label: "Activation Status",
  },
  { id: "col3", numeric: true, disablePadding: false, label: "Type" },
  { id: "col4", numeric: true, disablePadding: false, label: "VRN" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  //define table head
  return (
    <TableHead className=" bg-blueSapphire">
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={index}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ color: "white" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const Inquaries = () => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setsearchTerm] = useState("");
  const [Transporters, setTransporters] = useState([]);

  //fetch all transporters
  const getTransporters = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/manager/getTransporters")
        .then((res) => {
          setTransporters(res.data.Transporters);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    getTransporters();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="w-11/12 h-auto p-4 mt-2 m-auto pt-5 rounded-xl bg-blueSapphire bg-opacity-30">
      <h1 className="text-4xl text-center text-prussianBlue font-bold mb-5">
        Transporters
      </h1>

      <div className="w-full h-auto bg-white p-3 rounded-xl">
        <div className="w-full h-16 mb-1 p-1 bg-blueSapphire bg-opacity-30 rounded-lg">
          {" "}
          <div className="w-max h-16" style={{ float: "left" }}>
            {" "}
            <input
              type="text"
              className="w-60 h-11 p-5 rounded-3xl m-2 mt-0"
              id="code"
              placeholder="Search Here"
              value={searchTerm}
              onChange={(event) => {
                setsearchTerm(event.target.value);
              }}
              style={{ float: "left" }}
            ></input>
          </div>
          {/* display only when search term not null */}
          {searchTerm && (
            <ReplayIcon
              style={{ float: "left" }}
              className="m-3"
              onClick={() => {
                setsearchTerm("");
              }}
            />
          )}
        </div>

        <div className={classes.root}>
          <Paper className={classes.paper}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={Transporters.length}
                />
                <TableBody>
                  {stableSort(
                    Transporters,
                    getComparator(order, orderBy),
                    searchTerm
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .filter((val) => {
                      //filter items
                      if (searchTerm === "") {
                        return val;
                      } else if (val.VRN.includes(searchTerm.toLowerCase())) {
                        return val;
                      }
                      return null;
                    })
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover tabIndex={-1} key={index}>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="left"
                            style={{ paddingLeft: "20px" }}
                          >
                            <h1 className="font-bold text-md">{row._id}</h1>
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ paddingLeft: "45px" }}
                          >
                            <h1 className="font-bold text-md">
                              {row.activationStatus}
                            </h1>
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ paddingLeft: "35px" }}
                          >
                            <h1 className="font-bold text-md">{row.type}</h1>
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ paddingLeft: "35px" }}
                          >
                            <h1 className="font-bold text-md">{row.VRN}</h1>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={Transporters.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Inquaries;
