// ❗ The ✨ TASKS inside this component are NOT IN ORDER.
// ❗ Check the README for the appropriate sequence to follow.
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const e = { // This is a dictionary of validation error messages.
  // username
  usernameRequired: 'username is required',
  usernameMin: 'username must be at least 3 characters',
  usernameMax: 'username cannot exceed 20 characters',
  // favLanguage
  favLanguageRequired: 'favLanguage is required',
  favLanguageOptions: 'favLanguage must be either javascript or rust',
  // favFood
  favFoodRequired: 'favFood is required',
  favFoodOptions: 'favFood must be either broccoli, spaghetti or pizza',
  // agreement
  agreementRequired: 'agreement is required',
  agreementOptions: 'agreement must be accepted',
}

const initialValues = () => ({
  username: '',
  favLanguage: '',
  favFood: '',
  agreement: false
})

// ✨ TASK: BUILD YOUR FORM SCHEMA HERE
// The schema should use the error messages contained in the object above.

export default function App() {
  const [formData, setFormData] = useState(initialValues)
  const [valErrors, setValErrors] = useState(null)
  const [activeSubmit, setActiveSubmit] = useState(null)
  const [message, setMessage] = useState(e)
  // ✨ TASK: BUILD YOUR STATES HERE
  // You will need states to track (1) the form, (2) the validation errors,
  // (3) whether submit is disabled, (4) the success message from the server,
  // and (5) the failure message from the server.
  // ✨ TASK: BUILD YOUR EFFECT HERE
  // Whenever the state of the form changes, validate it against the schema
  // and update the state that tracks whether the form is submittable.
  useEffect(() => {

  }, [])

  const onChange = evt => {
    // ✨ TASK: IMPLEMENT YOUR INPUT CHANGE HANDLER
    // The logic is a bit different for the checkbox, but you can check
    // whether the type of event target is "checkbox" and act accordingly.
    // At every change, you should validate the updated value and send the validation
    // error to the state where we track frontend validation errors.
    console.log('changing')
  const { name, type, value, checked } = evt.target;

  const updatedData = type === 'checkbox' ? checked: value;

  setFormData({...formData, [name]: updatedData})
  }

  const onSubmit = evt => {
    // ✨ TASK: IMPLEMENT YOUR SUBMIT HANDLER
    // Lots to do here! Prevent default behavior, disable the form to avoid
    // double submits, and POST the form data to the endpoint. On success, reset
    // the form. You must put the success and failure messages from the server
    // in the states you have reserved for them, and the form
    // should be re-enabled.
    evt.preventDefault()
    console.log('submitted!')
    axios
        .post('https://webapis.bloomtechdev.com/registration', formData)
        .then(res => {
          setActiveSubmit(res.data)
          console.log('success!', res)
        })
        .catch(err => console.error(err))
  }

  return (
    <div> {/* TASK: COMPLETE THE JSX */}
      <h2>Create an Account</h2>
      <form onSubmit={onSubmit} >
        <h4 className="success">Success! Welcome, new user!</h4>
        <h4 className="error">Sorry! Username is taken</h4>

        <div className="inputGroup">
          <label htmlFor="username">Username:</label>
          <input value={formData.username} id="username" name="username" type="text" onChange={onChange} placeholder="Type Username" />
          <div className="validation">{message.usernameRequired} </div>
        </div>

        <div className="inputGroup">
          <fieldset>
            <legend>Favorite Language:</legend>
            <label>
              <input type="radio" name="favLanguage" value="javascript" checked={formData.favLanguage === "javascript"} onChange={onChange} />
              JavaScript
            </label>
            <label>
              <input type="radio" name="favLanguage" value="rust" checked={formData.favLanguage === "rust"} onChange={onChange} />
              Rust
            </label>
          </fieldset>
          <div className="validation">{message.favLanguageRequired}</div>
        </div>

        <div className="inputGroup">
          <label htmlFor="favFood">Favorite Food:</label>
          <select value={formData.favFood} onChange={onChange} id="favFood" name="favFood">
            <option value="">-- Select Favorite Food --</option>
            <option value="pizza">Pizza</option>
            <option value="spaghetti">Spaghetti</option>
            <option value="broccoli">Broccoli</option>
          </select>
          <div className="validation">{message.favFoodRequired}</div>
        </div>

        <div className="inputGroup">
          <label>
            <input checked={formData.agreement} onChange={onChange} id="agreement" type="checkbox" name="agreement" />
            Agree to our terms
          </label>
          <div className="validation">{message.agreementRequired}</div>
        </div>

        <div>
          <input type="submit" disabled={false} />
        </div>
      </form>
    </div>
  )
}
