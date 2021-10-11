import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import RefreshIcon from "@material-ui/icons/Refresh";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Icon } from "@material-ui/core";

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
      } else if (val?.getInLocation?.name?.includes(searchTerm)) {
        return val;
      }
    })
    .map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "col1",
    numeric: false,
    disablePadding: true,
    label: "",
  },
  {
    id: "col2",
    numeric: true,
    disablePadding: false,
    label: "GET IN LOCATION",
  },
  { id: "col3", numeric: true, disablePadding: false, label: "GET IN TIME" },
  {
    id: "col4",
    numeric: true,
    disablePadding: false,
    label: "GET OFF LOCATION",
  },
  { id: "col5", numeric: true, disablePadding: false, label: "GET OFF TIME" },
  { id: "col6", numeric: true, disablePadding: false, label: "TYPE" },
  { id: "col7", numeric: true, disablePadding: false, label: "" },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className=" bg-prussianBlue ">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ paddingLeft: "10px", color: "white" }}
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
}));

const JourneyHistoryOption = () => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("no");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [searchTerm, setSearchTerm] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get(
          "http://localhost:6500/matrix/api/passenger/journey-history",
          config
        )
        .then((res) => {
          setTableData(res?.data?.history.journeyHistory);
          console.log(res?.data?.history.journeyHistory);
        })
        .catch((err) => {
          alert(err?.response?.data?.desc);
        });
    };
    getHistory();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <div className=" rounded-lg  mt-3 mx-0 px-3 py-3 text-center border-0  shadow-md bg-blueSapphire bg-opacity-30">
        <div className="rounded-xl   mt-8 mx-0 px-3 py-3 text-center border-0  shadow-md bg-white ">
          <div className="rounded-lg flex bg-gray-100">
            <div className="flex-initial  text-center  ml-4 mt-4 py-2 m-2">
              Search By Get in Location:
            </div>
            <div className="flex-initial px-0 py-2 m-2">
              <input
                className="ml-0 mt-0  border-1 bg-gray-200 appearance-none border-2 border-gamboge rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-halloweenOrange"
                id="inline-full-name"
                type="text"
                placeholder="Search Here"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              ></input>
            </div>

            <div className="text-black  px-0 py-2 m-2">
              <Icon
                className="text-gray-500  hover:text-halloweenOrange"
                onClick={() => {
                  setSearchTerm("");
                }}
              >
                <RefreshIcon />
              </Icon>
            </div>
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
                    rowCount={tableData?.length}
                  />
                  <TableBody>
                    {stableSort(
                      tableData,
                      getComparator(order, orderBy),
                      searchTerm
                    )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .filter((val) => {
                        if (searchTerm === "") {
                          return val;
                        } else if (
                          val.getInLocation.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return val;
                        }
                        return null;
                      })
                      .map((item, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow tabIndex={1} key={item._id}>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              style={{ padding: "10px" }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell align="left">
                              {item?.getInLocation?.name}
                            </TableCell>
                            <TableCell align="left">
                              {item?.gettingTimeStamp}
                            </TableCell>
                            <TableCell align="left">
                              {item?.getOffLocation?.name}
                            </TableCell>
                            <TableCell align="left">
                              {item?.getOffTimeStamp}
                            </TableCell>
                            <TableCell align="left">
                              {item?.getInLocation?.type === "busStation" &&
                                "Bus"}
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              <button
                                className="focus:outline-none bg-gamboge font-semibold rounded py-2 px-4"
                                onClick={() => {}}
                              >
                                View More
                              </button>
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
                count={tableData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default JourneyHistoryOption;
