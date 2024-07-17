"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import {invertColor, padZero, filterAlpha} from './utils';

export default function Home() {
  const [currentColor, setCurrentColor] = useState('#FFFFFF');
  const [allColors, setAllColors] = useState(null);
  const [opacity, setOpacity] = useState(100);


useEffect(() => {
  fetch("https://unpkg.com/color-name-list@10.24.0/dist/colornames.json")
  .then(response => response.json())
  .then(data => setAllColors(data))
},[])

  
function handleChange(value) {
  setCurrentColor(value);
}

function handleInvert() {
  let newColor = invertColor(currentColor);
  setCurrentColor(newColor);
  setOpacity(100);
}

function handleOpacity(value: number){
  let newColor = filterAlpha(currentColor)(value);
  setOpacity(value);
  setCurrentColor(newColor);
}


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    {!allColors ? (
      <h3>Loading...</h3>
      ) : (
      <>
        <h3>Current Color:</h3>
        <div className='colorDiv' style={{ backgroundColor: currentColor }}>{currentColor}</div>
        <button onClick={handleInvert} className="invertButton">Invert</button>
        <p>Opacity(%):</p>
        <input type="number" value={opacity} min="1" max="100" onChange={(e) => handleOpacity(e.target.value)} />
        <div className="colorBlock_container">
            {allColors && allColors.slice(0,100).map((color) => <div style={{ backgroundColor: color.hex}} onClick={() => handleChange(color.hex)} key={color.hex} className='colorBlock'>{color.name}</div>)}
        </div>
      </>
    )}
    </main>
  );
}
