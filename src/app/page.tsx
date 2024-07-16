"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [currentColor, setCurrentColor] = useState(null);
  let [allColors, setAllColors] = useState(null);


  useEffect(() => {
    fetch("https://unpkg.com/color-name-list@10.24.0/dist/colornames.json")
    .then(response => response.json())
    .then(data => setAllColors(data))
  },[])

  function invertColor(hex:string, bw: boolean = false):string {
if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
        console.log(hex, r, g, b);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    let result = '#' + padZero(r) + padZero(g) + padZero(b);
    console.log('converted ' + result, r, g, b);
    setCurrentColor(result);
    return result;
}

function padZero(str: string, len: number = 2):number {
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
function handleChange(value) {
  setCurrentColor(value);
}

function handleInvert(e) {
  invertColor(currentColor);
}


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='colorDiv' style={{ backgroundColor: currentColor }}>{currentColor}</div>
      <button onClick={handleInvert}>Invert</button>
      <div className="colorBlock_container">
        {allColors && allColors.map((color) => <div style={{ backgroundColor: color.hex}} onClick={() => handleChange(color.hex)} key={color.hex} className='colorBlock'>{color.name}</div>)}
      </div>
    </main>
  );
}
