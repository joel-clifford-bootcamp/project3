// import React from "react";
import React, { useState } from "react";
import "./style.css";
import profilePicture from "./placeholder.png";
import placeholder from "./placeholder2.jpg";
// import { Foo, Bar } from "../Rating";



// This file exports the UserCard and RecentActivityCard components
export function UserCard(props) {

  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  };
    
  return (
  <div>
    <div className="row">
    <div className="valign-wrapper">
      <div className="col s12 m6 offset-m4">
        <div className="card profile-image align-center">
            <label htmlFor="upload-button">
              {image.preview ? (
                <img src={image.preview} className="profilePic" alt="dummy" width="300" height="300" />
              ) : (
                <>
                  <h5 className="text-center profileInstructions">click <span className="clickHere"> here </span> to upload profile photo</h5>
                </>
              )}
            </label>
            <input
              type="file"
              id="upload-button"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <br />
        </div>
        
      </div>
    </div>
    <div className="row">
      <div className="col s12 m6 offset-m4">
        <h3 className="userName">User Name</h3>
        <h6 className="userEmail"><a href="mailto:user@email.com" target="_blank">user@email.com</a></h6>
      </div>
    </div>
    </div>
  </div>
  );
}

// export function RecentActivityCard(props) {
//   return (
//     <div>
//       {/* <div className="row"> */}
//       {/* <div className="col s12 m4"> */}
//       <div className="col mb-6 sm-12">
//         <div
//           className="card sticky-action recentCard z-depth-5"
//           style={{
//             // width: "20rem",
//             // height: "auto",
//             // margin: "auto",
//             // padding: "10px",
//             textAlign: "center",
//           }}
//         >
//           <div className="card-content">
//             <span className="card-title">
//               <h5>Ride across town</h5>
//             </span>
//           </div>
//           <div className="card-image" style={{ margin: "10px" }}>
//             <a className="btn-floating halfway-fab waves-effect waves-light red">
//               <i className="material-icons">add</i>
//             </a>
//             <img
//               className="responsive-img activityImage"
//               src="http://via.placeholder.com/100x100"
//               width="100"
//               height="100"
//               alt="activity_card_image"
//             />
//           </div>
//           <div
//             className="card-content"
//             style={{ padding: "10px", margin: "10px" }}
//           >
//               <div className="rating">
//                 <span className="1star">☆</span><span className="2star">☆</span><span className="3star">☆</span><span className="4star">☆</span><span className="5star">☆</span>
//               </div>
//               {/* <Foo />
//               <Bar /> */}
//             <p className="grey-text text-darken-1">
//               This location is perfect for a weekend away.
//             </p>
//           </div>
//           <div className="card-action" style={{ padding: "10px" }}>
//             <a
//               className="cardLink black-text"
//               href="#"
//               style={{ color: "000000", padding: "10px" }}
//             >
//               Open
//             </a>
//             <a
//               className="cardLink black-text"
//               href="#"
//               style={{ color: "000000", padding: "10px" }}
//             >
//               Share
//             </a>
//           </div>
//         </div>
//       </div>
//       {/* </div> */}
//     </div>
//   );
// }
