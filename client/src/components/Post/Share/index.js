import React from "react";
import "./index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function index(props) {
  function copylinkfn() {
    navigator.clipboard.writeText(props.url);
    toast("Copied to Clipboard", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    });
  }
  return (
    <div>
      <div class="container d-flex justify-content-center mt-100">
        {" "}
        <button
          type="button"
          class="btn btn-primary mx-auto"
          data-toggle="modal"
          data-target="#exampleModal2"
        >
          {" "}
          Share on social media{" "}
        </button>{" "}
      </div>
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content col-9">
            <div class="modal-header">
              <h5 class="modal-title">Share</h5>{" "}
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                {" "}
                <span aria-hidden="true">&times;</span>{" "}
              </button>
            </div>
            <div class="modal-body">
              <div class="icon-container1 d-flex">
                <div class="smd">
                  {" "}
                  <i
                    class=" img-thumbnail fa fa-twitter fa-2x"
                    style={{ color: "#4c6ef5", backgroundColor: "aliceblue" }}
                  ></i>
                  <p>Twitter</p>
                </div>
                <div class="smd">
                  {" "}
                  <i
                    class="img-thumbnail fa fa-facebook fa-2x"
                    style={{ color: "#3b5998", backgroundColor: "#eceff5" }}
                  ></i>
                  <p>Facebook</p>
                </div>
                <div class="smd">
                  {" "}
                  <i
                    class="img-thumbnail fa fa-reddit-alien fa-2x"
                    style={{ color: "#FF5700", backgroundColor: "#fdd9ce" }}
                  ></i>
                  <p>Reddit</p>
                </div>
              </div>
              <div class="icon-container2 d-flex">
                <div class="smd">
                  {" "}
                  <i
                    class="img-thumbnail fa fa-whatsapp fa-2x"
                    style={{ color: "#25D366", backgroundColor: "#cef5dc" }}
                  ></i>
                  <p>Whatsapp</p>
                </div>
                <div class="smd">
                  {" "}
                  <i
                    class="img-thumbnail fa fa-telegram fa-2x"
                    style={{ color: "#4c6ef5", backgroundColor: "aliceblue" }}
                  ></i>
                  <p>Telegram</p>
                </div>
                <div class="smd">
                  {" "}
                  <i
                    class="img-thumbnail fa fa-weixin fa-2x"
                    style={{ color: "#7bb32e", backgroundColor: "#daf1bc" }}
                  ></i>
                  <p>WeChat</p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div className="copylink">
                <label style={{ fontWeight: "600" }}>
                  Page Link <span class="message"></span>
                </label>
                <br />
                <div class="row1">
                  {" "}
                  <input
                    class="col-11 ur"
                    type="url"
                    placeholder={props.url}
                    id="myInput"
                    aria-describedby="inputGroup-sizing-default"
                    disabled
                    style={{ height: "40px" }}
                  />{" "}
                  <button class="cpy" onClick={copylinkfn}>
                    <i class="fa fa-clone"></i>
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
