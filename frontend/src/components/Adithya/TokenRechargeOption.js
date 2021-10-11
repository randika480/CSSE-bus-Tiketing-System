import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import TokenIcon from "../../svg/tokenIcon";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import axios from "axios";

const TokenRechargeOption = () => {
  const [tokenData, setTokenData] = useState(null);
  const [triggerDataFetch, setTriggerDataFetch] = useState(false);

  const [paymentType, setPaymentType] = useState("");
  const [cardName, setCardName] = useState("");
  const [rechargedAmount, setRechargedAmount] = useState(null);
  const [cardNo, setCardNo] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const getTokenData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get("http://localhost:6500/matrix/api/passenger/get-token", config)
        .then((res) => {
          setTokenData(res?.data?.passengerToken);
          console.log(res?.data?.passengerToken);
          setPaymentType("");
          setCardName("");
          setRechargedAmount("");
          setCardNo("");
          setExpMonth("");
          setExpYear("");
          setCvv("");
        })
        .catch((err) => {
          console.log(err?.response?.data?.desc);
        });
    };
    if (localStorage.getItem("userRole") === "passenger") {
      getTokenData();
    }
  }, [triggerDataFetch]);

  const rechargeHandler = async () => {
    if (cardName && rechargedAmount && cardNo && expMonth && expYear && cvv) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      const data = { rechargedAmount, paymentType };

      await axios
        .put(
          "http://localhost:6500/matrix/api/passenger/recharge",
          data,
          config
        )
        .then((res) => {
          console.res(res.data);
          setTokenData(res?.data?.updatedToken);
          console.log(res?.data?.updatedToken);
          setTriggerDataFetch(!triggerDataFetch);
        })
        .catch((err) => {
          console.log(err?.response?.data?.desc);
          setTriggerDataFetch(!triggerDataFetch);
        });
    } else {
      alert("Please enter valid data");
    }
  };

  return (
    <>
      {tokenData && (
        <>
          <div className="ml-24 font-semibold text-xl ">
            Current Balance : LKR. {tokenData.accountBalance}
          </div>
          <div className="flex mx-14 mt-4 text-lg font-semibold">
            <div className="mt-8 p-4 border rounded w-1/2">
              <div>Payment Type</div>
              <FormControl component="fieldset" size="small">
                <RadioGroup
                  row
                  aria-label="gender"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    control={<Radio size="small" required={true} />}
                    label="VISA"
                    value="VISA"
                    onChange={() => {
                      setPaymentType("VISA");
                    }}
                  />

                  <FormControlLabel
                    control={<Radio size="small" required={true} />}
                    label="MASTER"
                    value="MASTER"
                    onChange={() => {
                      setPaymentType("MASTER");
                    }}
                  />
                </RadioGroup>
              </FormControl>
              <div className="mt-4 space-y-6">
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Recharge Amount"
                  type="number"
                  required
                  InputLabelProps={{ style: { fontWeight: 600 } }}
                  onChange={(e) => {
                    setRechargedAmount(e.target.value);
                  }}
                  value={rechargedAmount}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Card Name."
                  required
                  type="text"
                  InputLabelProps={{ style: { fontWeight: 600 } }}
                  onChange={(e) => {
                    setCardName(e.target.value);
                  }}
                  value={cardName}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  size="small"
                  label="Card no."
                  required
                  type="number"
                  InputLabelProps={{ style: { fontWeight: 600 } }}
                  onChange={(e) => {
                    setCardNo(e.target.value);
                  }}
                  value={cardNo}
                />
                <div className="flex space-x-2">
                  <TextField
                    variant="outlined"
                    label="Exp. Year"
                    required
                    size="small"
                    type="number"
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    onChange={(e) => {
                      setExpYear(e.target.value);
                    }}
                    value={expYear}
                  />
                  <TextField
                    variant="outlined"
                    label="Exp. Month"
                    size="small"
                    required
                    type="number"
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    onChange={(e) => {
                      setExpMonth(e.target.value);
                    }}
                    value={expMonth}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    label="CVV"
                    required
                    type="number"
                    InputLabelProps={{ style: { fontWeight: 600 } }}
                    onChange={(e) => {
                      setCvv(e.target.value);
                    }}
                    value={cvv}
                  />
                </div>
                <button
                  onClick={rechargeHandler}
                  className="bg-gamboge text-white hover:bg-halloweenOrange font-semibold w-1/3 px-4 py-2 rounded-lg text-lg"
                >
                  CONFIRM
                </button>
              </div>
            </div>
            <img
              src="https://i.ibb.co/r0C8tLQ/puzzle-payment-processed.png"
              alt="reg-page-img"
              width="30%"
            />
          </div>
        </>
      )}
    </>
  );
};

export default TokenRechargeOption;
