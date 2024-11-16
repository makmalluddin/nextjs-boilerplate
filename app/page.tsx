"use client";

import React, { useState, useEffect, useRef } from "react";

const OhmsLawSimulation: React.FC = () => {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(10);
  const [current, setCurrent] = useState(voltage / resistance);
  const circuitRef = useRef<HTMLDivElement>(null);
  const [electrons, setElectrons] = useState<Array<{ element: HTMLDivElement; position: number }>>([]);

  const calculateCurrent = () => {
    const calculatedCurrent = voltage / resistance;
    setCurrent(calculatedCurrent);
  };

  const updateElectronAnimation = () => {
    const desiredElectrons = Math.min(Math.ceil(current * 5), 20); // Max 20 electrons
    const newElectrons = [...electrons];
    const circuitElement = circuitRef.current;

    if (circuitElement) {
      while (newElectrons.length < desiredElectrons) {
        const electron = document.createElement("div");
        Object.assign(electron.style, {
          position: "absolute",
          width: "8px",
          height: "8px",
          background: "radial-gradient(circle at 30% 30%, #00ffff, #007bff)",
          borderRadius: "50%",
          boxShadow: "0 0 5px #00ffff",
          opacity: "0.8",
        });
        circuitElement.appendChild(electron);
        newElectrons.push({ element: electron, position: Math.random() * 100 });
      }

      while (newElectrons.length > desiredElectrons) {
        const electronToRemove = newElectrons.pop();
        electronToRemove?.element.remove();
      }
    }

    setElectrons(newElectrons);
  };

  const animateElectrons = () => {
    electrons.forEach((electron) => {
      electron.position = (electron.position + current * 2) % 100;

      const x =
        electron.position < 25
          ? 110 + (electron.position / 25) * 240
          : electron.position < 50
          ? 350
          : electron.position < 75
          ? 350 - ((electron.position - 50) / 25) * 240
          : 110;

      const y =
        electron.position < 25
          ? 80
          : electron.position < 50
          ? 80 + ((electron.position - 25) / 25) * 120
          : electron.position < 75
          ? 200
          : 200 - ((electron.position - 75) / 25) * 120;

      Object.assign(electron.element.style, { left: `${x}px`, top: `${y}px` });
    });

    const resistor = document.querySelector(".resistor") as HTMLElement;
    if (resistor) {
      resistor.style.filter = `drop-shadow(0 0 ${current * 2}px #ff6b6b)`;
    }

    requestAnimationFrame(animateElectrons);
  };

  useEffect(() => {
    calculateCurrent();
    updateElectronAnimation();
    animateElectrons();
  }, [voltage, resistance]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1>Simulasi Hukum Ohm</h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "400px",
            height: "300px",
            margin: "0 auto",
            position: "relative",
          }}
          ref={circuitRef}
        >
          <div
            style={{
              position: "absolute",
              left: "50px",
              top: "100px",
              width: "60px",
              height: "100px",
              background: "linear-gradient(to bottom, #666 0%, #666 45%, #333 45%, #333 55%, #666 55%, #666 100%)",
              border: "3px solid black",
              borderRadius: "5px",
            }}
          >
            <div
              style={{
                content: '""',
                position: "absolute",
                left: "25px",
                top: "-25px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "red",
              }}
            >
              +
            </div>
            <div
              style={{
                content: '""',
                position: "absolute",
                left: "27px",
                bottom: "-30px",
                fontSize: "24px",
                fontWeight: "bold",
                color: "blue",
              }}
            >
              -
            </div>
          </div>

          <div
            className="resistor"
            style={{
              position: "absolute",
              right: "50px",
              top: "100px",
              width: "100px",
              height: "40px",
              background: "repeating-linear-gradient(90deg, #f4a460, #f4a460 10px, #8b4513 10px, #8b4513 20px)",
              border: "3px solid black",
              borderRadius: "20px",
            }}
          ></div>

          <div
            style={{
              position: "absolute",
              background: "#333",
              boxShadow: "0 0 5px rgba(0,0,0,0.5)",
              top: "80px",
              left: "110px",
              width: "240px",
              height: "4px",
              background: "linear-gradient(to right, #333, #666, #333)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              background: "#333",
              boxShadow: "0 0 5px rgba(0,0,0,0.5)",
              bottom: "77px",
              left: "110px",
              width: "240px",
              height: "4px",
              background: "linear-gradient(to right, #333, #666, #333)",
            }}
          ></div>
        </div>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            background: "#fff",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div>
            <label>Tegangan (V):</label>
            <input
              type="range"
              min="0"
              max="24"
              step="0.1"
              value={voltage}
              onChange={(e) => setVoltage(parseFloat(e.target.value))}
              style={{
                width: "200px",
                height: "8px",
                background: "linear-gradient(to right, #007bff, #00ff88)",
                borderRadius: "4px",
              }}
            />
            <span style={{ marginLeft: "10px", fontWeight: "bold", color: "#007bff" }}>{voltage.toFixed(1)} V</span>
          </div>
          <div>
            <label>Hambatan (Ω):</label>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={resistance}
              onChange={(e) => setResistance(parseFloat(e.target.value))}
              style={{
                width: "200px",
                height: "8px",
                background: "linear-gradient(to right, #007bff, #00ff88)",
                borderRadius: "4px",
              }}
            />
            <span style={{ marginLeft: "10px", fontWeight: "bold", color: "#007bff" }}>{resistance.toFixed(1)} Ω</span>
          </div>
        </div>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "1.2em",
            background: "#e8f4ff",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <p>
            Arus (I) = <span>{current.toFixed(2)}</span> Ampere
          </p>
        </div>
      </div>
    </div>
  );
};

export default OhmsLawSimulation;
