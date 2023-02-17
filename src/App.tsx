import React, { useEffect, useRef, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { FaGithub, FaDiscord, FaSteam } from 'react-icons/fa';
import './App.css';

import { motion } from 'framer-motion';

import quotes from './assets/quotes.json';
const getQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};


function App() {

  //cursor
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

// Set cursor variant to change color on hover text
const [cursorVariant, setCursorVariant] = useState("default");

// Variant animation
const variants = {
  default: {
    x: mousePosition.x - 8,
    y: mousePosition.y - 8,
    zIndex: 100,
  }
};

  //countdown
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date("Aug 17, 2023 00:00:00") - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
  
      return timeLeft;
    };
  
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //check if typing is finished
  const [isTypingFinished, setIsTypingFinished] = useState(false);

  //get random quote
  const [Quote, setQuote] = useState(getQuote());
  const handleQuote = () => {
    // shuffle array and pick random
    const randomQuote = getQuote();
    setQuote(randomQuote);
  };

  return (
 
    <div className={`App ${isTypingFinished ? 'App-loaded' : ''}`}>

<motion.div
       className="cursor"
       variants={variants}
       animate={cursorVariant}
     ></motion.div>

      <div className="container" onLoad={handleQuote}>
      <h1 className={`big-text ${isTypingFinished ? 'big-text-done' : ''}`}>
      <Typewriter
          options={{
            delay:125
          }}
  onInit={(typewriter) => {
    typewriter.typeString('<span class="text-primary">Damn.</span>black')
      .callFunction(() => {
        setIsTypingFinished(true);
      })
      .start();
  }}
/>
      </h1>

      <div className='quote-container'>
        <h1 className={`quote ${isTypingFinished ? 'quote-done' : ''}`}>{Quote}</h1>
      </div>

      <div className='btn-container'>

      <a href='https://github.com/damn1611' target='_blank' rel='noopener noreferrer' className={`btn btn-outline tertiary btn-md lg:btn-lg my-custom-btn ${isTypingFinished ? 'btn-done' : ''}`}>
        <FaGithub style={{ fontSize: '1.8em' }} />
      </a>

      <a href='https://discord.gg/kyoko' target='_blank' rel='noopener noreferrer' className={`btn btn-outline tertiary btn-md lg:btn-lg my-custom-btn ${isTypingFinished ? 'btn-done' : ''}`}>
        <FaDiscord style={{ fontSize: '1.8em' }} />
      </a>

      <a href='https://steamcommunity.com/id/Damn1611/' target='_blank' rel='noopener noreferrer' className={`btn btn-outline tertiary btn-md lg:btn-lg my-custom-btn ${isTypingFinished ? 'btn-done' : ''}`}>
        <FaSteam style={{ fontSize: '1.8em' }}/>
      </a>

      </div>

      <div className='countdown-container'>
      <div className={`countdown-main ${isTypingFinished ? 'countdown-main-done' : ''}`}>
      <span>{timeLeft?.days}</span>
        <span> days </span>
      <span>{timeLeft?.hours}</span>
        <span> hours </span>
        <span>{timeLeft?.minutes}</span>
        <span> minutes </span>
        <span>{timeLeft?.seconds}</span>
        <span> seconds</span>
      </div>
      </div>

      </div>
    </div>

  );
}

export default App;