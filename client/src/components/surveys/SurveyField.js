// SurveyField contains logic to render a single
// label and text input
import React from 'react';

//export default (props) => {
export default ( { input, label, meta,   meta: { error, touched } } ) => {
    //console.log("les props: ", meta  ) //tout, incluant nom..
    //console.log("les props input: ", input) // tous les eventhandlers
  return (

    <div>
      {/* <input  {...input} /> */}
      <label style={{   fontSize: '110%' }}>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
     <div className="red-text" style={{ marginBottom: '20px', fontSize: '80%' }}>
        {touched && error}
      </div>
    </div>
  );
};


//: { error, touched }
