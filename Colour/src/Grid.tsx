import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useGetColor() {
  const [colors, setColor] = useState<string[]>([]);
  const fetchColours = () => {
    axios.get('https://bootcamp2025.depster.me/api/colors', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    })
      .then(res => setColor(res.data.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchColours();
  }, []);

  console.log('Colors state:', colors);

  return { colors, fetchColours };

}

function getSavedColors(): string[] {
    const data = localStorage.getItem('savedColors');
    return data ? JSON.parse(data) : [];
}

function addColor(color: string) {
    const saved = getSavedColors();       
    if (!saved.includes(color)) {        
      saved.push(color);
      saveColors(saved);                  
    }
}

function saveColors(colors: string[]) {
    localStorage.setItem('savedColors', JSON.stringify(colors));
    window.dispatchEvent(new Event('newColorAddedToPallet'));
}

const FetchGrid: React.FC = () => {

  const {colors, fetchColours} = useGetColor();
  return (
    <div>
      <button onClick={fetchColours}>Reroll Colours</button>
      <div className="grid">
        {colors.map((color, index) => (
          <div
            key={index}
            className="grid-item"
            style={{
              backgroundColor: color,
              padding: "10px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {color}
            <button
              style={{
                width: "40%",
                height: "25%",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => addColor(color)}
            >
              {" "}
              Save Colour
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchGrid;