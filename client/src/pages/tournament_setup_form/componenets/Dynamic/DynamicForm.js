import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { json, useNavigate } from "react-router-dom";
import { useImperativeHandle, forwardRef } from "react";
import axios from "axios";
//BY islam
export const DynamicForm = forwardRef(
  ({ setFormData,formData, isAgreed, setIsAgreed, request }, ref) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleShowModal = () => {
      setShowModal(true);
    };
    const handlePublishConfirmation = () => {
      if (isAgreed) {
        setShowModal(false);
        request.reqFunction(formData);
      } else {
        alert("Please agree to the terms before publishing.");
      }
    };
    useImperativeHandle(ref, () => ({
      handleShowModal,
    }));
    const undefinedAttributeValidation = (att, tournamentObject, fieldName) => {
      if ( att !== undefined) {
        return tournamentObject.append(fieldName, att);
      }else if(fieldName==="sponsors"){
        tournamentObject.append(fieldName,"sponsors")
      }
    };
    //assigning optional + required attributes to the tournament object to send to the backend
// useEffect(()=>{
//   const newSponsor = JSON.stringify(formData.sponsors)
//   setFormData({...formData,sponsors:newSponsor})
// },[])

    const optionalAttributes = [
      { fieldName: "about", attribute: formData.about },
      { fieldName: "rules", attribute: formData.rules },
      { fieldName: "prize", attribute: formData.prize },
      { fieldName: "description", attribute: formData.description },
      { fieldName: "schedule", attribute: formData.schedule },
      { fieldName: "platform", attribute: formData.platform },
      {
        fieldName: "registeration_status",
        attribute: formData.registeration_status,
      },
      { fieldName: "tournament_status", attribute: formData.tournament_status },
    //  { fieldName: "sponsors", attribute: newSponsor },
      
    ];
    
    const requiredAttributes = [
  
      { filedName: "game", attribute: formData.game },
      { filedName: "title", attribute: formData.title },
      { filedName: "start_date", attribute: formData.start_date },
      { filedName: "start_time", attribute: formData.start_time },
      { filedName: "cover_image_url", attribute: formData.cover_image_url },
      { filedName: "contact_details", attribute: formData.contact_details },
      { filedName: "max_participants", attribute: formData.max_participants },
    ];
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("sponsors:",formData.sponsors)
      console.log(typeof(formData.sponsors))
      const newSponsor = JSON.stringify(formData.sponsors)
      const tournamentObject = new FormData();
      requiredAttributes.map((item, index) => {
        return tournamentObject.append(item.filedName, item.attribute);
      });

      optionalAttributes.map((item, index) => {
        return undefinedAttributeValidation(
          item.attribute,
          tournamentObject,
          item.fieldName
        );
      });

      tournamentObject.append('sponsors', newSponsor);// newSponsor );
      //tournamentObject.append("sponsors",formData.sponsors)
      //const body =JSON.stringify(tournamentObject)
      axios
        .post("http://localhost:5000/api/tournaments", (tournamentObject))
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    };
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
              onMouseOver={() => console.log(formData)}
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
            publish
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
