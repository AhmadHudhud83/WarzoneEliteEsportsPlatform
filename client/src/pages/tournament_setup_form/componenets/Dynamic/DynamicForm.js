import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { json, useNavigate } from "react-router-dom";
import { useImperativeHandle, forwardRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//BY islam
export const DynamicForm = forwardRef(
  ({ isAgreed, setIsAgreed, request, tournamentObject, validationErrors }, ref) => {
    const params = useParams();
    const requiredParamsFunction = () => {//selecting the parameter based on the request
      if (request === "CREATE_TOURNAMENT") return "gameName";
      else if (request === "UPDATE_TOURNAMENT") return "tournamentId";
    };
    const _param = requiredParamsFunction();
    const requiredParam = params[_param];
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {//based on the request , update or create a new tournament
      e.preventDefault();
      if (request === "CREATE_TOURNAMENT") {
        console.log("THIS IS A CREATING TOURNAMENT REQUEST");
        axios
          .post("http://localhost:5000/api/tournaments/", tournamentObject)
          .then((res) => console.log(res))
          .catch((err) => console.error(err));

        navigate("/organizer/dashboard");
      } else if (request === "UPDATE_TOURNAMENT") {
        console.log("THIS IS AN UPDATING TOURNAMENT REQUEST");
        if (tournamentObject) {
          axios
            .put(
              `http://localhost:5000/api/tournaments/${requiredParam}`,
              tournamentObject
            )
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
        }
      }
    };

    const handleShowModal = () => {
      setShowModal(true);
    };
    // const handlePublishConfirmation = () => {
    //   if (isAgreed) {
    //     setShowModal(false);
    //     request.reqFunction(formData);
    //   } else {
    //     alert("Please agree to the terms before publishing.");
    //   }
    // };
    useImperativeHandle(ref, () => ({
      handleShowModal,
    }));
    const ModalInfoFunction = () => { //different modal based on the request , update existing tournament or creating a new tournament
      const modalObject = {};
      if (request === "CREATE_TOURNAMENT") {
        modalObject.header = "Publishing Your Tournament";
        modalObject.bodyParagraph1 =
          "When you publish a tournament, players will be able to register.";
        modalObject.bodyParagraph2 =
          "Are you sure you want to publish the tournament?";
        modalObject.contentParagraph1 =
          "Publishing this tournament will enable registration and allow players to join.";
        modalObject.contentParagraph2 =
          " By publishing you agree to our website's policy and community standards.";
      } else if (request === "UPDATE_TOURNAMENT") {
        modalObject.header = "Updating Your Tournament";
        modalObject.bodyParagraph1 =
          "Are you sure you want to save these changes?";
        modalObject.bodyParagraph2 = "Confirm to proceed with the update.";
        modalObject.contentParagraph1 =
          "Saving these changes will update the tournament details.";
        modalObject.contentParagraph2 =
          " By saving, you agree to our website's policy and community standards.";
      }
      return modalObject;
    };
    const modalObject = ModalInfoFunction();

    return (
      <div>
        <div className="publish-content p-5  ">
          <p>
            {modalObject.contentParagraph1}
            <br />
            {modalObject.contentParagraph2}
          </p>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="policyAgreement"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e)}
            // onMouseOver={() => console.log(formData)}
            />
            <label className="mx-4" htmlFor="policyAgreement">
              I agree to website's policy & community standards
            </label>
          </div>
          <div className="publish-buttons"></div>
        </div>

        { }

        <div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header className="bg-dark " closeButton>
              <Modal.Title className="bg-dark">
                {modalObject.header}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
              <p className="text-white">{modalObject.bodyParagraph1}</p>
              <p className="text-danger">{modalObject.bodyParagraph2}</p>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
              <button
                className="btn btn-secondary  me-3"
                onClick={() => setShowModal(false)}
                onMouseOver={() => console.log(requiredParam)}
              >
                Cancel
              </button>
              {/* <button
                className="btn btn-secondary"
                onClick={handlePublishConfirmation}
                style={{
                  background:
                    "linear-gradient(286.57deg, #6600D5 0%, #4221E3 49.09%, #005FFF 100%)",
                }}
              >
                Confirm
              </button> */}
              <form onSubmit={handleSubmit}>
                <button className="btn btn-danger" type="submit" disabled={Object.keys(validationErrors).length > 0}>
                  {request === "CREATE_TOURNAMENT" ? "PUBLISH" : "SAVE"}
                </button>
              </form>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
);
export default DynamicForm;
