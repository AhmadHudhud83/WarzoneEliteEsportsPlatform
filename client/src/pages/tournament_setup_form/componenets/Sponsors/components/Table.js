import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSponsorsDetails } from "../Sponsors";
//exporting data
const Table = () => {
  const {
    formData,
    setFormData,
    SponsorsfiledNames,
    setValidationErrors,
    validationErrors,
    role,
  } = useContext(useSponsorsDetails);

  //sources : https://react-bootstrap.netlify.app/docs/components/modal/


  //SPONSOR VALIDATION , CANCELED .....
  // useEffect(()=>{
  //   if(formData.sponsors.length===0){
  //     setValidationErrors({...validationErrors,sponsors:"Atleast add one sponsor !"})
  //   }else{

  //       const newError = {...validationErrors}
  //       if(newError.sponsors){
  //         delete newError.sponsors
  //       }
  //       setValidationErrors(newError)

  //   }

  // },[setValidationErrors,validationErrors])
  //states for adding sponsor , and it's modal
  const [addingSponsor, setaAddingSponsor] = useState({ brand: "", email: "" });

  const [showAddingModal, setShowAddingModal] = useState(false);

  const sponsorBrandHandler = (e) => {
    setaAddingSponsor({ ...addingSponsor, brand: e.target.value });
    console.log(addingSponsor);
  };
  const sponsorEmailHandler = (e) => {
    setaAddingSponsor({ ...addingSponsor, email: e.target.value });
    console.log(addingSponsor);
  };
  const addInputHandler = () => {
    //duplicate chcker
    const sponsorExists = formData.sponsors.find(
      (s) => s.email === addingSponsor.email && s.brand === addingSponsor.brand
    );
    if (!sponsorExists) {
      const updatedSponsorsArray = [
        ...formData.sponsors,
        { email: addingSponsor.email, brand: addingSponsor.brand },
      ];

      const updatedFormData = { ...formData, sponsors: updatedSponsorsArray };

      setFormData(updatedFormData);
    } else {
      alert("duplicated sponsors not allowed");
    }
    console.log(formData);
    setaAddingSponsor({ brand: "", email: "" });
  };

  const handleCloseAddingModal = () => setShowAddingModal(false);
  const handleShowAddingModal = () => setShowAddingModal(true);

  //delete handler
  const deleteHandler = (targetIndex) => {
    const newArray = formData.sponsors.filter(
      (item, index) => index !== targetIndex
    );

    const updatedFormData = { ...formData, sponsors: newArray };
    setFormData(updatedFormData);
    console.log(formData);
  };

  //===========================================================================
  //states for editing sponsor and editing modal
  const [showEditingModal, setShowEditingModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); //to keep track of the selected sponsor index
  const [editedSponsor, setEditedSponsor] = useState({ brand: "", email: "" }); //state for the current edited sponsor
  const handleCloseEditingModal = () => setShowEditingModal(false);
  //index as the main parameter for each sponsor field to send the deafult values in the inputs, and to update the selected sponsor info
  const handleShowEditingModal = (index) => {
    setEditingIndex(index);
    //targetted sponsor
    const sponsorToEdit = formData.sponsors[index];
    setEditedSponsor({
      brand: sponsorToEdit.brand,
      email: sponsorToEdit.email,
    });
    setShowEditingModal(true);
  };

  //===============================================================

  const modals = [
    {
      //=======================Adding modal====================
      emailName: "email",
      brandName: "brand",
      title: "Add Sponsor",
      firstButtonLabel: "Close",
      secondButtonLabel: "Add",
      show: showAddingModal,
      onHide: handleCloseAddingModal,
      brandValue: addingSponsor.brand,
      emailValue: addingSponsor.email,
      brandOnChange: (e) => sponsorBrandHandler(e),
      emailOnChange: (e) => sponsorEmailHandler(e),
      disabled: addingSponsor.brand === "" || addingSponsor.email === "",
      onClick: () => {
        addInputHandler(addingSponsor);
        handleCloseAddingModal();
      },
    },
    {
      //===============Editing Modal=============================
      title: "Edit Sponsor",
      firstButtonLabel: "Discard",
      secondButtonLabel: "Save",
      show: showEditingModal,
      onHide: handleCloseEditingModal,
      brandValue: editedSponsor.brand,
      emailValue: editedSponsor.email,
      brandOnChange: (e) =>
        setEditedSponsor({
          ...editedSponsor,
          brand: e.target.value,
        }),
      emailOnChange: (e) =>
        setEditedSponsor({
          ...editedSponsor,
          email: e.target.value,
        }),
      disabled: editedSponsor.brand === "" || editedSponsor.email === "",
      onClick: () => {
        //at editing modal trigger , to fix update same sponsor bug that alerts the warning if its the defaul valuem
        //index parameter is important for that role
        const sponsorExists = formData.sponsors.find(
          (sponsor, index) =>
            index !== editingIndex && //is this current selected sponsor ? if it is it then never mind updating it to same value again
            //but if not , then this means there is another value in the formData.sponsors that will be same as current value , then deny it
            sponsor.email === editedSponsor.email &&
            sponsor.brand === editedSponsor.brand
        );
        if (sponsorExists) {
          alert("This sponsor already exists!");
          handleCloseEditingModal();
        } else {
          const updatedSponsorsArray = [...formData.sponsors];
          updatedSponsorsArray[editingIndex] = { ...editedSponsor };
          const updatedFormData = {
            ...formData,
            sponsors: updatedSponsorsArray,
          };
          setFormData(updatedFormData);
          handleCloseEditingModal();
        }
        setEditedSponsor({ brand: "", email: "" });
        setEditingIndex(null);
      },
    },
  ];
  //================================return statement=========================================
  return (
    <React.Fragment>
      <div className="p-4 mt-4">
        {/* =================================================MODALS========================================================= */}

        {modals.map((item, index) => {
          return (
            <Modal
              key={index}
              variant="dark"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={item.show}
              onHide={item.onHide}
            >
              <Modal.Header className="bg-dark" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  {item.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-dark">
                <div className="input-group mb-3 ms-auto">
                  <div className="input-group mb-3 ">
                    <input
                      name={item.brandName}
                      type="text"
                      className="form-control bg-dark text-white "
                      placeholder="Sponsor Brand"
                      aria-label="Sponsor Brand"
                      defaultValue={item.brandValue}
                      onChange={(e) => item.brandOnChange(e)}
                    />
                  </div>
                  <div className="input-group mb-3 ">
                    <input
                      name={item.emailName}
                      type="text"
                      className="form-control bg-dark text-white "
                      placeholder="Sponsor Email"
                      aria-label="Sponsor Email"
                      defaultValue={item.emailValue}
                      onChange={(e) => item.emailOnChange(e)}
                    />
                  </div>
                  <div className="d-flex justify-content-center ms-auto">
                    <button
                      className="btn btn-danger btn-sm px-4 me-4 rounded"
                      onClick={item.onHide}
                    >
                      {item.firstButtonLabel}
                    </button>
                    <button
                      onClick={item.onClick}
                      className="btn btn-danger btn-sm  px-4 border rounded border-danger"
                      type="button"
                      id="button-addon1"
                      style={{ boxShadow: "none" }}
                      disabled={item.disabled}
                    >
                      {item.secondButtonLabel}
                    </button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          );
        })}
        {/* ==========================================================================================THE TABLE ======================================= */}
        <div className="d-flex ">
          <h4 className="text-white mb-4 ">Sponsors</h4>
          {role === "admin" ? (
            <button
              className="btn btn-danger ms-auto px-5 my-2 "
              onClick={handleShowAddingModal}
            //  onMouseOver={console.log(formData)} ///////////////////////////////////////////////////////////
            >
              ADD SPONSOR
            </button>
          ) : (
            <></>//if the role isn't admin, then do not show the functionalaties , because table gonna be reused for showing to paricipants
          )}
        </div>

        <table className="table table-dark table-striped border border-secondary border-1">
          <thead>
            <tr>
              <th scope="col">{SponsorsfiledNames[0]} </th>
              <th scope="col">{SponsorsfiledNames[1]}</th>

              {role === "admin" ? <th scope="col">Action</th> : <></>}
            </tr>
          </thead>
          <tbody>
            {formData.sponsors.length > 0 ? (
              formData.sponsors.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{item.brand}</th>
                    <td>{item.email}</td>
                    {role === "admin" ? (
                      <td>
                        <div className="d-flex">
                          <Link
                            onClick={() => deleteHandler(index)}
                            className="me-5 btn  "
                          >
                            <i className="fa-solid fa-trash fa-lg" />
                          </Link>
                          <Link
                            onClick={() => handleShowEditingModal(index)}
                            className="btn "
                          >
                            <i className="fa-solid fa-pen fa-lg " />
                          </Link>
                        </div>
                      </td>
                    ) : (
                      <></>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="3">
                  <h4 className="text-start p-3 px-4">
                    No Sponsors Available...
                  </h4>
                  <p className="text-danger mx-4">
                    {validationErrors.sponsors}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
export default Table;
