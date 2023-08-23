import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  let [loading, setLoading] = useState(true);
  return (
    <>
        <div className="container-spinning">
          <div className="sweet-loading">
            <ClipLoader
              color="#000000"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      
    </>
  );
};

export default Spinner;
