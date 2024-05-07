import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useImperativeHandle,forwardRef } from "react";
import axios from "axios";
//BY islam
export const PublishForm =forwardRef( ({ formData, setFormData },ref) => {
  
 
  const [isAgreed, setIsAgreed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate()
//   <button
//   className="btn btn-primary m-4"
//   onClick={() => setShowModal(true)}
//   disabled={!isAgreed}
// >
//   Publish
// </button>
const handleShowModal = () => {
  setShowModal(true);
};
  const handlePublishConfirmation = () => {
    if (isAgreed) {
      setShowModal(false);
      axios.post("http://localhost:5000/tournaments",formData).then((res)=>console.log(res.data)).catch((e)=>console.error(e))
      
    } else {
      alert("Please agree to the terms before publishing.");
    }
  };
  useImperativeHandle(ref, () => ({
    handleShowModal
    
  }))
  const handleCheckbox = (event) => {
    setIsAgreed(event.target.checked);
  };

  return (
    
    <div className="publish-tournament-container    ">
 
      <div className="publish-content p-5  ">
        <p>
          Publishing this tournament will enable registration and allow players
          to join.
          <br />
          By publishing you agree to our website's policy and community
          standards.
        </p>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="policyAgreement"
            checked={isAgreed}
            onChange={handleCheckbox}
          />
          <label className="mx-4" htmlFor="policyAgreement">
            I agree to website's policy & community standards
          </label>
        </div>
        <div className="publish-buttons">
         
        </div>
      </div>

      {}
      <div className="modal-container">
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Publishing Your Tournament</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p class="text-success">
              {" "}
              When you publish a tournament, players will be able to register.{" "}
            </p>
            <p class="text-success">
              Are you sure you want to publish the tournament?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary me-3"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handlePublishConfirmation}>
              Publish
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
})
