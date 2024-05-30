import "./ContactUs.css";
import axios from "axios";
import { useState } from "react";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    goal: "",
    industry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/contactus", formData);
      console.log("Contact saved successfully:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  return (
    <div className="contactuscontainer">
      <div className="container mt-5">
        <div className="card bg-dark text-white">
          <div className="card-body">
            <h1 className="card-title text-center">Let's talk!</h1>
            <p className="text-center">Please provide all information below</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  name="company"
                  onChange={handleChange}
                  value={formData.company}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="goal">What's your main goal?</label>
                <textarea
                  className="form-control"
                  id="goal"
                  name="goal"
                  rows={4}
                  required
                  onChange={handleChange}
                  value={formData.goal}
                />
              </div>
              <fieldset className="form-group">
                <legend>What is your industry?</legend>
                {["brands", "game-developer", "sport-organization", "influencer", "other"].map((industry) => (
                  <div className="form-check" key={industry}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="industry"
                      id={industry}
                      value={industry}
                      required
                      onChange={handleChange}
                      checked={formData.industry === industry}
                    />
                    <label className="form-check-label" htmlFor={industry}>
                      {industry.charAt(0).toUpperCase() + industry.slice(1).replace("-", " ")}
                    </label>
                  </div>
                ))}
              </fieldset>
              <button type="submit" className="btn btn-primary btn-block">Submit</button>
              
            </form>
          </div>
        </div>
        <footer className="text-center mt-4">
          <p>© 2024 Warzone Elite, Inc.</p>
        </footer>
      </div>
    </div>
  );
};
