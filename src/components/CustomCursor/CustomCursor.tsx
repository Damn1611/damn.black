import React, { useEffect, useState } from "react";
import "./CustomCursor.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    const onMouseDown = () => setActive(true);
    const onMouseUp = () => setActive(false);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      className={`custom-cursor${active ? " active" : ""}`}
      style={{ left: position.x, top: position.y }}
    />
  );
};

export default CustomCursor;
