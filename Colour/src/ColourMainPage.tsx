import { useNavigate } from "react-router-dom";
import FetchGrid from "./Grid"
import Pallet from "./Pallet"
import React from 'react';

const ColourPage: React.FC = () => {
    const navigate = useNavigate();
    function logOut() {
        localStorage.removeItem('token');
        navigate('/login');

    }

  return (
    <>
        <button onClick={()=>{logOut()}}>
            Log Out
        </button>
        <h1>Color Grid</h1>
        <FetchGrid />
        <h2>Color Pallet</h2>
        <Pallet />
    </>


  );
};

export default ColourPage;