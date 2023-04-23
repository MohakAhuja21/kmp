import React, { useEffect, useState } from "react";
import { useForm } from "@formspree/react";
import "./Contact.css";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [message, setMessage] = useState("");
  const [option, setOption] = useState("");

  const [state, handleSubmit] = useForm("meqwvzlp"); //for sending email with formSpree
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    switch (e.target.value) {
      case "sell_online":
        setMessage(
          "I am a Pharmaceutical distributor/wholesaler and i am interested in selling online at your platform. Tell me how to get started."
        );
        break;
      case "third_party_manufacturer":
        setMessage(
          "I am a Third-Party Manufacturer and i am interested in partnering with you to sell my pharmaceutical products online through your distribution channel and website."
        );
        break;
      case "wholesaler":
        setMessage(
          "I am a wholesaler and I want to buy in bulk at Good Price. Can you send me your Rate List for that purpose. Thanks"
        );
        break;
      case "chemist":
        setMessage("I am a chemist, and i want to talk regarding");
        break;
      default:
        setMessage("");
        break;
    }
  };

  function validateName() {
    if (!name) {
      setNameError("Name is a required field");
    } else {
      setNameError("");
    }
  }

  function validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !regex.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  }
  

  function validatePhone() {
    const regex = /^\d+$/;
    if (!phone) {
      setPhoneError("Please enter your phone number");
    } else if (!regex.test(phone)) {
      setPhoneError("Please enter a valid phone number");
    } else {
      setPhoneError("");
    }
  }

  function onSubmit(event) {
    event.preventDefault();
    validateName();
    validateEmail();
    validatePhone();

    if (!nameError && !emailError && !phoneError) {
      handleSubmit(event);
      setIsFormSubmitted(true);
    }
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
  })

  return (
    <div className="contact-section">
       {/* If the form is submitted successfully, show a success message */}
      <h1>Connect With Us</h1>
      <form onSubmit={onSubmit} className="contact-form">
        <label className="label-text">
          <input
            type="text"
            className="contact-form-text"
            name="name"
            value={name}
            placeholder="Enter Your Full Name*"
            onChange={(e) => setName(e.target.value)}
            onBlur={validateName}
            required
          />
          <span style={{ color: "red" }}>{nameError}</span>
        </label>

        <label className="label-text">
          <input
            type="email"
            name="email"
            placeholder="Enter Your Business or Personal Email"
            className="contact-form-text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
          <span style={{ color: "red" }}>{emailError}</span>
        </label>

        <label className="label-text">
          <input
            type="tel"
            className="contact-form-text"
            name="phone"
            value={phone}
            placeholder="91*"
            onChange={(e) => setPhone(e.target.value)}
            onBlur={validatePhone}
            required
          />
          <span style={{ color: "red" }}>{phoneError}</span>
        </label>

        <label className="label-text">
          <select
            className="contact-form-text"
            value={option}
            onChange={handleOptionChange}
            required
          >
            <option value="">Select an option*</option>
            <option value="sell_online">
              I am a Pharmaceutical distributor/wholesaler and i want to sell
              online
            </option>
            <option value="third_party_manufacturer">
              Partner as a Third-Party Manufacturer
            </option>
            <option value="wholesaler">I am a wholesaler</option>
            <option value="chemist">I am a chemist</option>
          </select>
        </label>

        <label className="label-text">
          <textarea
            name="message"
            id="textMessage"
            placeholder="Any Message U Want To Give or Any Valuable Suggestion, We Are Listening* !"
            cols="30"
            rows="3"
            className="contact-form-text"
            defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <span id="message"></span>
        </label>

        <button type="submit" className="btn">
          Submit
        </button>
        {isFormSubmitted && (
        <p style={{ color: "green", textAlign:"left" }}>
          Thanks for contacting us!<br></br>
          We'll get back to you soon.
        </p>
      )}
      </form>
    </div>
  );
}

export default ContactForm;
