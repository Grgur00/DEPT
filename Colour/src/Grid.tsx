import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useGetColor() {
    const [colors, setColor] = useState<string[]>([]);
    useEffect(() => {
        const auth = {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzIsImVtYWlsIjoiZ3JndXJpbm92aWMuYUBnbWFpbC5jb20iLCJpYXQiOjE3NDkxNTcyMTUsImV4cCI6MTc0OTI0MzYxNX0.UpD2RNS6wa-4TJmnI0lSzXTYLcSRerpgLbb9NZ8A7p8'
            }
        };

        axios.get('https://bootcamp2025.depster.me/api/colors', auth)
        .then(response => {
            setColor(response.data.data);
        })
        .catch(error => {
            console.error('Error fetching color:', error);
        });
    }, []);
    
        console.log('Colors state:', colors);

    return colors;
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
}

const FetchGrid: React.FC = () => {
  const colors = useGetColor();
  return (
    <div>
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