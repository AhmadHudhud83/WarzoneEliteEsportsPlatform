import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditeSupervisor() {
  const { supervisorId } = useParams();
  const [supervisor, setSupervisor] = useState(null);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "name") {
      if (value.length < 4) {
        setNameError("Name must be at least 4 characters long");
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        setNameError("Name must contain only alphabetic characters");
      } else {
        setNameError("");
      }
    }

    if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(value)) {
        setPasswordError(
          "Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, and 1 number."
        );
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:5000/supervisor/update",
        {
          id: supervisorId,
          ...formData,
        }
      );
      alert(response.data);
      navigate("/organizer/dashboard/supervisors");
    } catch (error) {
      console.error("Error updating supervisor:", error);
      alert(
        "Failed to update supervisor. Please check the fields according to the required conditions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSupervisor = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/supervisor/get?id=${supervisorId}`
        );
        if (response.data !== "user not found") {
          setSupervisor(response.data);
          setFormData({
            name: response.data.name,
            email: response.data.email,
            password: "",
          });
        }
      } catch (error) {
        console.error("Error fetching supervisor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupervisor();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <div className="text-center mt-5">
          <></>
        </div>
      ) : supervisor !== null ? (
        <div className="mt-5">
          <h1 className="text-center">Edit Supervisor</h1>
          <form onSubmit={handleSubmit} className="col-md-6 mx-auto mt-5">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
              {nameError && <div className="text-danger">{nameError}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
                onChange={handleChange}
              />
              {passwordError && (
                <div className="text-danger">{passwordError}</div>
              )}
            </div>
            <div className="d-flex justify-content-end">
              <div className="p-2">
                <Link
                  to="/organizer/dashboard/supervisors"
                  className="btn btn-outline-light btn-secondary"
                >
                  Back
                </Link>
              </div>
              <div className="p-2">
                <button
                  type="submit"
                  className="btn btn-outline-light btn-primary mr-2"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <h2 className="text-center mt-5">User not found</h2>
      )}
    </div>
  );
}

export default EditeSupervisor;
