import React, { Component } from "react";

const restpasswordprompts = props => {
  // console.log(props);
  if (!props.show) return null;
  return (
    <div className="modal" id="myModal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{props.header}</h4>
            {props.userRegistered ? (
              <button
                type="button"
                onClick={() => {
                  props.submit();
                }}
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  props.close();
                }}
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            )}
          </div>

          <div className="modal-body">
            {props.errormessage}
            <div className="container">
              <div className="justify-content-center row regi">
                <div className="card-group">
                  <div className="p-4">
                    <div className="card-body">
                      <div>
                        <p style={{ color: "red" }}>{props.errorMessage}</p>
                        <div className="mb-3 input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-share" aria-hidden="true" />
                            </span>
                          </div>
                          <input
                            placeholder="Verification Code"
                            type="text"
                            className={
                              props.errorfileds[1] && props.error
                                ? "form-control error-border-color"
                                : "form-control"
                            }
                            value={props.verificationCode}
                            onChange={e => {
                              props.inputChange(e, "verificationCode");
                            }}
                          />
                        </div>

                        <div className="mb-3 input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fa fa-lock" aria-hidden="true" />
                            </span>
                          </div>
                          <input
                            placeholder="Password"
                            type="password"
                            className={
                              props.errorfileds[2] && props.error
                                ? "form-control error-border-color"
                                : "form-control"
                            }
                            value={props.password}
                            onChange={e => {
                              props.inputChange(e, "password");
                            }}
                          />
                        </div>

                        <button
                          className="mt-3 btn btn-primary btn-block"
                          onClick={() => {
                            props.ResetPassword();
                          }}
                        >
                          submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            {props.userRegistered ? (
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  props.submit();
                }}
              >
                OK
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  props.close();
                }}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default restpasswordprompts;
