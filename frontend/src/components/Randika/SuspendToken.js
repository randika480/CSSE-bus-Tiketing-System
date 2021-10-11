import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import Button from "@material-ui/core/Button";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import Icon from "@material-ui/core/Icon";

const SuspendToken = ({ setModalVisible, modalVisible, tokenID }) => {
  const [isAdded, setIsAdded] = useState(false);

  // suspend tokens
  const suspend = async () => {
    const TID = tokenID;

    try {
      await axios
        .put(`http://localhost:6500/matrix/api/manager/suspendToken/${TID}`)
        .then(() => {
          setIsAdded(true);
          setTimeout(() => {
            setModalVisible(false);
            window.location.reload(false);
          }, 2000);
        });
    } catch (err) {
      alert("error :" + err);
    }
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
      <div className="px-4 pt-6 pb-4 md:pb-7 md:px-8">
        <h6 className="ml-4 mt-0 mb-1 font-black text-2xl text-center">
          Suspend Token
        </h6>
        <hr></hr>
        <div className="text-center text-ferrariRed m-5 ">
          <Icon>
            <HighlightOffOutlinedIcon style={{ fontSize: 60 }} />
          </Icon>
        </div>

        <h6 className="text-center text-lg">
          Do you need to suspend this token?? This process cannot be undone.
        </h6>
        {isAdded && <Alert severity="success">Token Suspended</Alert>}
        <div className="text-center mt-8 grid grid-cols-2 gap-3">
          <div className="text-right">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => {
                suspend();
              }}
            >
              Agree
            </Button>
          </div>
          <div className="text-left">
            <Button
              autoFocus
              variant="contained"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SuspendToken;
