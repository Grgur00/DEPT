import React, { useState} from "react";


function getSavedColors(): string[] {
    const data = localStorage.getItem('savedColors');
    return data ? JSON.parse(data) : [];
}
function removeColor(color: string) {
    const saved = getSavedColors();
    const updatedColors = saved.filter(c => c !== color);
    localStorage.setItem('savedColors', JSON.stringify(updatedColors));
    
}
const Pallet: React.FC = () => {
    const [palletColors, setPalletColors] = useState<string[]>(getSavedColors());
    const updatePallet = () => {
        setPalletColors(getSavedColors());
    }
    return (
        <div className="pallet">
            {palletColors.map((color, index) => (
                <div
                    key={index}
                    className="pallet-item"
                    style={{
                        backgroundColor: color,
                        padding: '10px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {color}
                    <button
                    style={{width: '40%', 
                            height: '25%',
                            border: 'none', 
                            cursor: 'pointer'
                    }} onClick={() => {removeColor(color); updatePallet()}}> Remove Colour 
                </button>
                </div>
            ))}
        </div>
    );
}
export default Pallet;