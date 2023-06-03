import React, { useState } from "react";
import QRCode from "react-qr-code";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ACTION = {
  QR: "qr",
  SHORTEN: "shorten",
};

const InputSection = () => {
  const [urlInput, setUrlInput] = useState("");
  const [action, setAction] = useState(ACTION.QR);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const setToInitial = () => {
    setError("");
    setShortenedUrl("");
  };
  const getShortenedURL = async () => {
    let response = null;
    try {
      setToInitial();
      setLoading(true);
      setAction(ACTION.SHORTEN);
      response = await axios.post("https://url-2-qr.herokuapp.com/shorten", {
        actualUrl: urlInput,
      });
      setShortenedUrl(response.data.shortenedUrl);
    } catch (error) {
      console.log(resperror.response);
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 shadow p-5 justify-content-center">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Throw your url here.."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
//             <button
//               className="btn m-1 ml-0 btn-primary"
//               onClick={getShortenedURL}
//             >
//               Shorten URL
//             </button>
            <button
              className="btn m-1 btn-primary"
              onClick={(e) => setAction(ACTION.QR)}
            >
              Generate QR
            </button>
          </div>
        </div>
        <div className="col-md-6 bg-white shadow">
          <div className="p-5 justify-content-center d-flex">
            {action === ACTION.QR ? (
              <QRCode value={urlInput} size={100} />
            ) : (
              <span>
                <h3 className="text-dark">Shortened Url : </h3>
                {shortenedUrl ? (
                  <a className="text-decoration-none" href={shortenedUrl}>
                    {shortenedUrl}
                  </a>
                ) : (
                  <>
                    {isLoading ? (
                      <div className="text-center">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="fa-pulse"
                        />
                      </div>
                    ) : (
                      <span className="text-danger">{"*" + error}</span>
                    )}
                  </>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default InputSection;
