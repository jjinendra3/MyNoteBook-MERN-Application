import React from "react";
function Alert(props) {
  let first_word;
  console.log(props.alert);
  if (props.alert !== null) {
    let str = props.alert.type;
    first_word = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div
      className="foralert"
      style={{
        height: "50px",
      }}
    >
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {first_word}:{props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
