import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import TokenIcon from "../../svg/tokenIcon";
import ProfileSVG from "../../svg/profile-avatar";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import Alert from "@material-ui/lab/Alert";

const PassengerProfileOption = () => {
  const [profileData, setProfileData] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [triggerDataFetch, setTriggerDataFetch] = useState(false);
  const [confirmationModalOpen, setConfirmationModelOpen] = useState(false);

  useEffect(() => {
    const getProfileData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get("http://localhost:6500/matrix/api/passenger/get-profile", config)
        .then((res) => {
          setProfileData(res?.data?.profile);
          console.log(res?.data?.profile);
        })
        .catch((err) => {
          alert(err?.response?.data?.desc);
        });
    };
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
          localStorage.setItem(
            "passengerTokenID",
            res?.data?.passengerToken?._id
          );
          console.log(res?.data?.passengerToken);
        })
        .catch((err) => {
          alert(err?.response?.data?.desc);
        });
    };

    if (localStorage.getItem("userRole") === "passenger") {
      getProfileData();
      getTokenData();
    }
  }, [triggerDataFetch]);

  const updateHandler = async () => {};

  const deleteHandler = async () => {};

  return (
    <div>
      {profileData && (
        <>
          <div className="flex ">
            <div>
              <ProfileSVG width={190} height={190} />
            </div>
            <div className="mx-24 grid grid-cols-2 gap-x-6 font-semibold">
              <div className="my-4 ">UserName</div>
              <div className="my-4">{profileData.username}</div>
              <div className="my-4">Email</div>
              <div className="my-4">{profileData.email}</div>
              <div className="my-4">Account Type</div>
              <div className="my-4">{profileData.accountType}</div>
              <div className="my-4">User Type</div>
              <div className="my-4">{profileData.userType}</div>
              <div className="my-4">NIC</div>
              <div className="my-4">
                {profileData?.NIC ? (
                  profileData?.NIC
                ) : (
                  <p className="text-ferrariRed">Not available.</p>
                )}
              </div>
              <div className="my-4">Passport</div>
              <div className="my-4">
                {profileData?.passportNo ? (
                  profileData?.passportNo
                ) : (
                  <p className="text-ferrariRed">Not available.</p>
                )}
              </div>
            </div>
          </div>
          <div className="grid w-1/3 grid-cols-2 gap-2 mt-2">
            {isEdit ? (
              <button
                onClick={() => {
                  setIsEdit(false);
                  setTriggerDataFetch(!triggerDataFetch);
                }}
                className="focus:outline-none bg-gray-400 font-semibold text-lg rounded py-2 px-6 mt-4"
                style={{
                  boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                }}
              >
                CANCEL
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEdit(true);
                }}
                className="focus:outline-none bg-gamboge font-semibold text-lg rounded py-2 px-6 mt-4"
                style={{
                  boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                }}
              >
                EDIT
              </button>
            )}
            {isEdit ? (
              <button
                type="submit"
                className="focus:outline-none bg-gamboge ml-8 text-white font-semibold text-lg rounded py-2 px-6 mt-4"
                style={{
                  boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                }}
                onClick={updateHandler}
              >
                SAVE
              </button>
            ) : (
              <button
                type="submit"
                className="focus:outline-none bg-ferrariRed ml-8 text-white font-semibold text-lg rounded py-2 px-6 mt-4"
                style={{
                  boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                }}
                onClick={() => {
                  setConfirmationModelOpen(true);
                }}
              >
                DELETE
              </button>
            )}
          </div>
          <div className="my-8 border-t-2">
            {tokenData && (
              <div className=" mx-14 mt-4 text-lg font-semibold">
                <div>Travel Token</div>
                <div className="mx-8 flex max-w-max mt-8  px-8 py-4 rounded-xl border bg-lightSilver">
                  <div>
                    <TokenIcon />
                  </div>
                  <div className="ml-8 space-y-2">
                    <div>Token Key: {tokenData._id}</div>
                    <div>Balance: {tokenData.accountBalance}</div>
                    <div>
                      Status:{" "}
                      <p
                        className={`inline font-mono ${
                          tokenData.tokenStatus === "Active"
                            ? "text-green-700"
                            : " text-ferrariRed"
                        }`}
                      >
                        {" "}
                        {tokenData.tokenStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PassengerProfileOption;
