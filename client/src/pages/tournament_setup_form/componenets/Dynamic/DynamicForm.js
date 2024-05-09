import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useImperativeHandle,forwardRef } from "react";
import axios from "axios";
//BY islam
export const DynamicForm =forwardRef( ({ formData,isAgreed,setIsAgreed,request },ref) => {
  
 
  
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
      request.reqFunction(formData)
      
    } else {
      alert("Please agree to the terms before publishing.")
    }
  };
  useImperativeHandle(ref, () => ({
    handleShowModal
    
  }))


  return (
    
    <div className="publish-tournament-container    ">
 
      <div className="publish-content p-5  ">
        <p>
         {request.content.paragraphOne}
          <br />
          {request.content.paragraphTwo}
        </p>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="policyAgreement"
            checked={isAgreed}
           onChange={e=>setIsAgreed(e)}
        
          />
          <label className="mx-4" htmlFor="policyAgreement">
            I agree to website's policy & community standards
          </label>
        </div>
        <div className="publish-buttons">
         
        </div>
      </div>

      {}
      <div className="modal-container  ">
        <Modal     show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header className="bg-dark" closeButton>
            <Modal.Title className="bg-dark">{request.modalInfo.header}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark">
            <p className="text-white">
            {request.modalInfo.bodyParagraphOne}
           
            </p>
            <p className="text-danger">
            {request.modalInfo.bodyParagraphTwo}
            </p>
          </Modal.Body>
          <Modal.Footer className="bg-dark">
            <button
              className="btn btn-secondary  me-3"
              onClick={() => setShowModal(false)}
             
            >
              Cancel
            </button>
            <button className="btn btn-secondary" onClick={handlePublishConfirmation} style={{background:"linear-gradient(286.57deg, #6600D5 0%, #4221E3 49.09%, #005FFF 100%)"}}>
              Confirm
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
})
export default DynamicForm