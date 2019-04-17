import React, { Component } from "react";

const warningprompts = props => {
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

          <div className="modal-body">{props.errormessage}</div>

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

export default warningprompts;
