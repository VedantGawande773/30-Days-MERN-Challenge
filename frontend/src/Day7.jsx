import React, { useState } from "react";

const Day7 = () => {

  const [formData , setFormData] = useState({name:"",car:"",color:""})

  const handleChange = ((event) => {
    const {name, value} = event.target;
     setFormData((prevFromData) => ({...prevFromData, [name]:value}))
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Name: ${formData.name}, Car: ${formData.car}, Color: ${formData.color}`);
    setFormData({ name: "", car: "", color: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text"
         name="name" 
        value={formData.name}
        onChange={handleChange}
         />
        <br />
        <label>Car:</label>
        <input type="text" 
        name="car"
        value={formData.car}
        onChange={handleChange} />
        <br />
        <label>Color: </label>
        <input type="text"
         name="color"
         value={formData.color}
         onChange={handleChange}
          />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Day7;
