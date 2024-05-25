import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "./AnnouncementsPage.css";
const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([{}]);
  const [tournament, setTournament] = useState({});
  const [content, setContent] = useState("");
  const { tournamentId } = useParams();
  const fetchTournamentAnnouncement = () =>
    axios
      .get(
        `http://localhost:5000/api/tournaments/${tournamentId}/announcements`
      )
      .then((res) => {
        setAnnouncements(res.data.announcements);
        console.log(res.data);
      })
      .catch((e) => console.error(e));
  useEffect(() => {
    fetchTournamentAnnouncement();
    //get the name of the tournament

    axios
      .get(`http://localhost:5000/api/tournaments/${tournamentId}`)
      .then((res) => {
        setTournament(res.data);
        console.log(res.data);
      })
      .catch((e) => console.error(e));
  }, []);
  const announcementInputChangeHandler = (e) => {
    setContent(e.target.value);

    // console.log(content)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      return;
    }
    if (content.length < 4 || content.length > 300) {
      return;
    }
    axios
      .patch(
        `http://localhost:5000/api/tournaments/${tournamentId}/announcements`,

        {
          name: "Tournament Organization",
          content: content,
        }
      )
      .then((response) => {
        console.log("added announcement:", response);
        setAnnouncements([{}]);
        fetchTournamentAnnouncement();
        setContent("");
      })
      .catch((error) => {
        console.error("There was an error updating the announcement!", error);
      });
  };

  //sources  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date ;
  //https://stackoverflow.com/questions/39924309/javascript-iso-date-to-human-readable

  const local_date_format = (newDate) =>
    newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  announcements.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/tournaments/announcements/${id}`)
      .then((res) => {
        console.log("annoucement deleted !");
        setAnnouncements([{}]);
        fetchTournamentAnnouncement();
      })
      .catch((err) => {
        console.error("Error deleting tournament", err);
      });
  };
  const editHandler = (id) => {
    const announcement = announcements.find((ann)=>ann._id===id)//if the content is not edited then don't send patch request(optimization)
    if (!editingContent.trim()) {
      return;
    }
    if (editingContent.length < 4 || editingContent.length > 300) {
      return;
    }
    if(announcement.content===editingContent){
        return;
    }
    axios
      .patch(`http://localhost:5000/api/tournaments/announcements/${id}`, {
        name: "Tournament Player",
        content: editingContent,
      })
      .then((res) => {
        console.log("annoucement updated !", res.data);
        setAnnouncements([{}]);
        fetchTournamentAnnouncement();
      })
      .catch((err) => {
        console.error("Error updating tournament", err);
      });
  };
  //source : https://react-bootstrap.netlify.app/docs/components/modal/
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  const [editingContent, setEditingContent] = useState("");
  const [index, setIndex] = useState(0);
  return (
    <React.Fragment>
      <Modal
        size="lg"
        className="text-white"
        aria-labelledby="contained-modal-title-vcenter"
        show={modalShow}
        onHide={handleClose}
        centered
      >
        <Modal.Header className="bg-dark" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Announcement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <div className="d-flex justify-content-center p-4 ">
            <textarea
              placeholder="Edit announcement"
              className="bg-dark text-white p-4  w-100"
              value={editingContent}
              onChange={(e) => {
                setEditingContent(e.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <button onClick={handleClose} className="btn btn-secondary">
            Close
          </button>
          <button
            onClick={() => {
              handleClose();
              editHandler(index);
            }}
            className="btn btn-danger"
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
      <div className="container ">
        <h1 className="text-center p-5 pb-0 mb-5 ">{tournament.title}</h1>

        <ul className="list-group border rounded p-2">
          <form onSubmit={handleSubmit}>
            <div className="m-5 mb-3 w-50 d-flex ">
              <textarea
                type="text"
                className="form-control bg-white text-secondary"
                id="exampleFormControlInput1"
                placeholder="Send new announcement"
                value={content}
                onChange={announcementInputChangeHandler}
              />
              <button
                type="submit"
                className="btn btn-secondary h-50 mt-3 ms-3"
              >
                Send
              </button>
            </div>
          </form>
          {announcements.length !== 0 ? (
            announcements.map((announcement, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item bg-dark text-white p-4 m-4 d-flex border border-secondary rounded justify-content-between align-items-center"
                >
                  <div>
                    <h3 className="text-muted pb-2  ">{announcement.name}</h3>

                    <p className="text-white p-3 pb-0 fs-5   rounded ">
                      {announcement.content}
                    </p>
                    <hr />
                  </div>

                  <span className="badge  text-muted  fs-6 p-2">
                    {local_date_format(new Date(announcement.date))}
                    <div className="d-flex">
                      <button
                        onClick={() => handleDelete(announcement._id)}
                        className="btn btn-danger  mt-5 "
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          handleShow();
                          setEditingContent(announcement.content);
                          setIndex(announcement._id);
                        }}
                        className="btn btn-success   mt-5 mx-3 "
                      >
                        Edit
                      </button>
                    </div>
                  </span>
                </li>
              );
            })
          ) : (
            <h1 className="p-5 text-center border border-secondary m-4">
              No annoucements yet...
            </h1>
          )}
        </ul>
        <Link to="/organizer/dashboard" className="btn btn-danger mt-4 ">
          Back
        </Link>
      </div>
    </React.Fragment>
  );
};
export default AnnouncementsPage;
