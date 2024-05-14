import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { json, useNavigate } from "react-router-dom";
import { useImperativeHandle, forwardRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//BY islam
export const DynamicForm = forwardRef(
  ({  isAgreed, setIsAgreed, request,tournamentObject }, ref) => {
    const params = useParams()
    const requiredParam = params[request.requiredParam];
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
      e.preventDefault();
      if(request.type==="CREATE_TOURNAMENT"){
        console.log("THIS IS A CREATING TOURNAMENT REQUEST")
        axios
        .post("http://localhost:5000/api/tournaments/", tournamentObject)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
      }else{
        console.log("THIS IS AN UPDATING TOURNAMENT REQUEST")
        if(tournamentObject){
          axios
          .put(`http://localhost:5000/api/tournaments/${requiredParam}`, tournamentObject)
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
        }
       
      }
      
    }
      
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
              onChange={(e) => setIsAgreed(e)}
             // onMouseOver={() => console.log(formData)}
            />
            <label className="mx-4" htmlFor="policyAgreement">
              I agree to website's policy & community standards
            </label>
          </div>
          <div className="publish-buttons"></div>
        </div>
        
        {}
  
  
     
        <div className="modal-container  ">
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header className="bg-dark" closeButton>
              <Modal.Title className="bg-dark">
                {request.modalInfo.header}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark">
              <p className="text-white">{request.modalInfo.bodyParagraphOne}</p>
              <p className="text-danger">
                {request.modalInfo.bodyParagraphTwo}
              </p>
            </Modal.Body>
            <Modal.Footer className="bg-dark">
              <button
                className="btn btn-secondary  me-3"
                onClick={() => setShowModal(false)}
                onMouseOver={()=>console.log(request.requiredParam)}
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
          <button className="btn btn-primary" type="submit">
        
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
