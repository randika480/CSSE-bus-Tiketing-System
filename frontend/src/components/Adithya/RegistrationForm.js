import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import { Formik } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

const validationSchema = Yup.object({
  username: Yup.string().trim().uppercase().required("User Name is required"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Please enter a valid password (min. 6 chars)")
    .required("Password is required"),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  accountType: Yup.string().required("User Account Type is required"),
  userType: Yup.string().required("User Type is required"),
  NIC: Yup.string().min(10, "Please enter a valid NIC (min. 10 chars)"),
  passportNo: Yup.string(),
  agreement: Yup.bool().oneOf(
    [true],
    "Please accept the agreement before proceeding"
  ),
});

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <div className="m-1 text-xl font-semibold">REGISTRATION</div>
        </Grid>
        <Grid item xs={12} md={11}>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmpassword: "",
              accountType: "",
              userType: "",
              NIC: "",
              passportNo: "",
              agreement: false,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setIsLoading(true);
              await axios
                .post("http://localhost:6500/matrix/api/auth/passenger", values)
                .then((res) => {
                  console.log(res.data);
                  setIsLoading(false);
                  if (res.data.role === "passenger") {
                    window.location = `/passenger`;
                  }
                })
                .catch((err) => {
                  alert(err?.response?.data?.desc);
                  setIsLoading(false);
                });
            }}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (
                    values.accountType === "Permanent" &&
                    values.userType === "Foreigner"
                  ) {
                    alert(
                      "Please select valid account type and user type accordingly."
                    );
                  } else if (!values.NIC && !values.passportNo) {
                    alert("Please enter valid NIC or Passport no.");
                  } else {
                    handleSubmit();
                  }
                }}
              >
                <div className="m-1 lg:pl-6">
                  <Grid item xs={12} sm={9}>
                    <div className="lg:my-10 md:my-9 sm:my-6">
                      <label
                        className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                        htmlFor={"username"}
                      >
                        Username
                      </label>
                      <input
                        className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                          errors.username && touched.username
                            ? "border-red-500"
                            : "border-gray-600"
                        } text-base`}
                        id="username"
                        type="text"
                        placeholder="Enter you username"
                        onChange={handleChange("username")}
                        value={values.username}
                      />
                      {errors.username && touched.username ? (
                        <div className="text-red-500 text-xs mt-1 md:text-sm">
                          {errors.username}
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div className="lg:my-10 md:my-9 sm:my-6">
                      <label
                        className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                        htmlFor={"email"}
                      >
                        Email
                      </label>
                      <input
                        className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                          errors.email && touched.email
                            ? "border-red-500"
                            : "border-gray-600"
                        } text-base`}
                        id="email"
                        type="text"
                        placeholder="John@cargils.com"
                        onChange={handleChange("email")}
                        value={values.email}
                      />
                      {errors.email && touched.email ? (
                        <div className="text-red-500 text-xs mt-1 md:text-sm">
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div className="lg:my-10 md:my-9 sm:my-6">
                      <label
                        className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                        htmlFor={"password"}
                      >
                        Password
                      </label>
                      <input
                        className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                          errors.password && touched.password
                            ? "border-red-500"
                            : "border-gray-600"
                        } text-base`}
                        id="password"
                        type="password"
                        placeholder="*********"
                        onChange={handleChange("password")}
                        value={values.password}
                      />
                      {errors.password && touched.password ? (
                        <div className="text-red-500 text-xs mt-1 md:text-sm">
                          {errors.password}
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div className="lg:my-10 md:my-9 sm:my-6">
                      <label
                        className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                        htmlFor={"confirmpassword"}
                      >
                        Confirm Password
                      </label>
                      <input
                        className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                          errors.confirmpassword && touched.confirmpassword
                            ? "border-red-500"
                            : "border-gray-600"
                        } text-base`}
                        id="confirmpassword"
                        type="password"
                        placeholder="Re-enter password"
                        onChange={handleChange("confirmpassword")}
                        value={values.confirmpassword}
                      />
                      {errors.confirmpassword && touched.confirmpassword ? (
                        <div className="text-red-500 text-xs mt-1 md:text-sm">
                          {errors.confirmpassword}
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div className=" lg:my-10 md:my-9 sm:my-6">
                      <label
                        className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                        htmlFor={"address"}
                      >
                        Account Type
                      </label>
                      <FormControl component="fieldset" size="small">
                        <RadioGroup
                          row
                          aria-label="gender"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="Permanent"
                            control={<Radio size="small" required={true} />}
                            label="Permanent"
                            id="accountType"
                            onChange={handleChange("accountType")}
                          />
                          <p className=" text-sm font-extralight">
                            **Permanent accounts are for Sri Lankan Citizens
                            only
                          </p>
                          <FormControlLabel
                            value="Temporary"
                            control={<Radio size="small" required={true} />}
                            label="Temporary"
                            id="accountType"
                            onChange={handleChange("accountType")}
                          />
                        </RadioGroup>
                      </FormControl>

                      {errors.accountType && touched.accountType ? (
                        <div className="text-red-500 text-xs mt-1 md:text-sm">
                          {errors.accountType}
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                  {values.accountType && (
                    <Grid item xs={12} sm={9}>
                      <div className=" lg:my-10 md:my-9 sm:my-6">
                        <label
                          className="block text-sm font-medium leading-149 mb-3 md:text-lg"
                          htmlFor={"phone"}
                        >
                          User Type
                        </label>
                        <FormControl component="fieldset" size="small">
                          <RadioGroup
                            row
                            aria-label="gender"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Local"
                              control={<Radio size="small" required={true} />}
                              label="Local (Sri Lankan Citizen)"
                              id="userType"
                              onChange={handleChange("userType")}
                            />
                            {values.accountType === "Temporary" && (
                              <FormControlLabel
                                value="Foreigner"
                                control={<Radio size="small" required={true} />}
                                label="Foreigner"
                                id="userType"
                                onChange={handleChange("userType")}
                              />
                            )}
                          </RadioGroup>
                          {values.userType === "Foreigner" && (
                            <input
                              className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                errors.passportNo && touched.passportNo
                                  ? "border-red-500"
                                  : "border-gray-600"
                              } text-base`}
                              id="passportNo"
                              type="text"
                              placeholder="Passport no."
                              onChange={handleChange("passportNo")}
                              value={values.passportNo}
                            />
                          )}
                          {values.userType === "Local" && (
                            <>
                              <input
                                className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                  errors.NIC && touched.NIC
                                    ? "border-red-500"
                                    : "border-gray-600"
                                } text-base`}
                                id="NIC"
                                type="text"
                                placeholder="NIC no."
                                onChange={handleChange("NIC")}
                                value={values.NIC}
                              />
                              {errors.NIC && touched.NIC ? (
                                <div className="text-red-500 text-xs mt-1 md:text-sm">
                                  {errors.NIC}
                                </div>
                              ) : null}
                            </>
                          )}
                        </FormControl>

                        {errors.phone && touched.phone ? (
                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                            {errors.phone}
                          </div>
                        ) : null}
                      </div>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={9}>
                    <div>
                      <label>
                        <input
                          className={`focus:outline-none mr-4 border-b focus:border-blue-900 ${
                            errors.agreement && touched.agreement
                              ? "border-red-500"
                              : "border-gray-600"
                          } text-base`}
                          id="agreement"
                          type="checkbox"
                          onChange={handleChange("agreement")}
                          value={values.agreement}
                        />
                        Do you agree with our privacy policies
                      </label>
                      {errors.agreement && touched.agreement ? (
                        <div className="text-red-500 text-xs mt-1 md:text-sm">
                          {errors.agreement}
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <div className=" lg:my-10 md:my-9 sm:my-6">
                      {isLoading ? (
                        <PulseLoader loading={isLoading} size={12} />
                      ) : (
                        <button
                          type="submit"
                          className="w-full focus:outline-none bg-yellow-500 text-snow-900 text-base rounded border hover:border-transparent h-10 sm:h-12"
                          style={{
                            boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                          }}
                        >
                          SIGN UP
                        </button>
                      )}
                    </div>
                  </Grid>
                </div>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationForm;
