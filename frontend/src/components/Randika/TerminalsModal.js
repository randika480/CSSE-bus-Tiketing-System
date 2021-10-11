import React from "react";
import { Modal } from "react-responsive-modal";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
  const stabilizedThis = array.map((el, index) => [el, index]);
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
    label: "",
  },
  {
    id: "col2",
    numeric: false,
    disablePadding: true,
    label: "Terminal",
  },
  { id: "col3", numeric: true, disablePadding: false, label: "Distance" },
];
//define table head
function EnhancedTableHead(props) {
  return (
    <TableHead className="bg-prussianBlue ">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            size="small"
            style={{ color: "white" }}
          >
            {headCell.label}
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
    minWidth: 300,
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
    width: 10,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 50,
  },
}));

const TerminalModal = ({ setModalVisible, modalVisible, currentTerminal }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    <Modal
      open={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      center
      styles={{
        modal: {
          borderRadius: "10px",
          maxWidth: "500px",
          width: "100%",
          marginTop: "5vw",
        },
      }}
      focusTrapped={true}
    >
      <div className="w-full p-3 h-max mb-3 pt-0">
        <div className="w-full h-max bg-white shadow-2xl p-2">
          <h1 className="text-center font-bold font-sans">Distances</h1>
          <div className="w-full m-auto h-4/5 ">
            <div>
              <div>
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
                          rowCount={currentTerminal.length}
                        />
                        <TableBody>
                          {stableSort(
                            currentTerminal,
                            getComparator(order, orderBy)
                          )
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )

                            .map((row, index) => {
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow hover tabIndex={-1} key={index}>
                                  <TableCell
                                    align="left"
                                    style={{ paddingLeft: "45px" }}
                                  >
                                    <h1 className="font-bold text-md">
                                      {index + 1}
                                    </h1>
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                    align="left"
                                    style={{ paddingLeft: "20px" }}
                                  >
                                    <h1 className="font-bold text-md">
                                      {row.name}
                                    </h1>
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{ paddingLeft: "45px" }}
                                  >
                                    <h1 className="font-bold text-md">
                                      {row.distance}KM
                                    </h1>
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
                      count={currentTerminal.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TerminalModal;
