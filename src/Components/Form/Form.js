import { useEffect, useRef, useState } from "react";
import "./style.css";
import { defaultErrors, isValidEmail } from "./helpers";
import useStateRef from "../../Hooks/useStateRef";

export default function Form() {
  const [errors, setErrors, errorsRef] = useStateRef(defaultErrors);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const [isSubmited, setIsSubmited] = useState(null);

  const nameInpRef = useRef(null);
  const emailInpRef = useRef(null);
  const dateInpRef = useRef(null);
  const colorInpRef = useRef(null);
  const salaryInpRef = useRef(null);
  const salaryRangeRef = useRef(null);

  useEffect(() => {
    setIsSubmitEnabled(calculateErrors(errors) == 0);
  }, [errors]);

  function calculateErrors(errors) {
    let count = 0;
    for (let key in errors) {
      count += errors[key].length;
    }
    return count;
  }

  function clearErrors(key) {
    setErrors({ ...errors, [key]: [] });
  }

  function addValidationError(key, value) {
    setErrors((prev) => {
      return { ...prev, [key]: [...prev[key], value] };
    });
  }

  function validateName(val) {
    clearErrors("name");
    if (val.length < 5 || val.length > 32)
      addValidationError("name", "Name should be between 5 and 32 characters");
    if (/\d/.test(val))
      addValidationError("name", "Name should not contain digits");
  }

  function validateEmail(val) {
    clearErrors("email");
    if (!isValidEmail(val)) addValidationError("email", "Email is not valid");
  }

  function validateDate(val) {
    clearErrors("date");
    if (new Date() < new Date(val))
      addValidationError("date", "Date can not be greater then date now");
    if (new Date(val).getFullYear() < new Date().getFullYear() - 100)
      addValidationError("date", "Date can not be greater then 100 years");
  }

  function validateSalary(val) {
    clearErrors("salary");
    if (val > 100000) addValidationError("salary", "Salary cant exide 100000");
    salaryRangeRef.current.innerText = val;
  }

  function validateColor(val) {
    clearErrors("salary");
    if (val == "Black") addValidationError("color", "Color can not be black");
    salaryRangeRef.current.innerText = val;
  }

  function submit() {
    if (nameInpRef.current.value == "")
      addValidationError("name", "This field can not be empty");
    if (emailInpRef.current.value == "")
      addValidationError("email", "This field can not be empty");
    if (dateInpRef.current.value == "")
      addValidationError("date", "This field can not be empty");
    if (salaryInpRef.current.value == "")
      addValidationError("salary", "This field can not be empty");

    let errorsCount = calculateErrors(errorsRef());

    setIsSubmited(errorsCount == 0);
    setTimeout(() => setIsSubmited(null), 3000);
  }

  function ErrorList({ errors }) {
    if (errors.length == 0) return null;
    return (
      <ul className="formErrors">
        {errors.map((el, i) => (
          <li key={i}>{el}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="formContainer">
      <div className="inputContainer">
        <div className="title">Name</div>
        <input
          ref={nameInpRef}
          onChange={(e) => validateName(e.target.value)}
        />
        <ErrorList errors={errors.name} />
      </div>
      <div className="inputContainer">
        <div className="title">Email</div>
        <input
          ref={emailInpRef}
          onChange={(e) => validateEmail(e.target.value)}
        />
        <ErrorList errors={errors.email} />
      </div>
      <div className="inputContainer">
        <div className="title">Date of birth</div>
        <input
          ref={dateInpRef}
          type="date"
          onChange={(e) => validateDate(e.target.value)}
        />
        <ErrorList errors={errors.date} />
      </div>
      <div className="inputContainer">
        <div className="title">Favorite color</div>
        <select
          ref={colorInpRef}
          type="date"
          onChange={(e) => validateColor(e.target.value)}
        >
          <option>Red</option>
          <option>Blue</option>
          <option>Green</option>
          <option>Black</option>
        </select>
        <ErrorList errors={errors.color} />
      </div>
      <div className="inputContainer">
        <div className="title">Salary</div>
        <input
          ref={salaryInpRef}
          onChange={(e) => validateSalary(e.target.value)}
          type="range"
          name="salary"
          min="20000"
          max="150000"
        />
        {/* <input type="date" onChange={(e) => validateDate(e.target.value)} /> */}
        <div ref={salaryRangeRef}>20000</div>
        <ErrorList errors={errors.salary} />
      </div>
      <div className="inputContainer">
        <button onClick={submit} disabled={!isSubmitEnabled}>
          Sumbmit
        </button>
      </div>

      {isSubmited !== null
        ? isSubmited
          ? "Form got submited"
          : "Failed to submit form"
        : ""}
    </div>
  );
}
