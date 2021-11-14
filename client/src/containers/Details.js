import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";

function Home() {
    const [execTime, setExecTime] = useState(0);
    const navigate = useNavigate()

    const loadTime = () => {
        const url = 'http://localhost:8000/db/time';

        fetch(url)
        .then(data => {
            data.json().then(time => {
                setExecTime(time);
            })
        })
    }

    useEffect(() => {
        loadTime();
    }, []);


  const handleBack = () => {
    navigate('/dashboard');
  }

  return (
      <div>
          <Button block size="lg" onClick={handleBack}>
              Back
          </Button>
          <br />
          The loading of data took {execTime} milliseconds.
      </div>
  );
}

export default Home;