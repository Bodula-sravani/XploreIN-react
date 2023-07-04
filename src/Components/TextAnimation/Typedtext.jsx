import React from "react";
import { useState, useEffect } from "react";
import "./Typedtext.css";

export const Typedtext = () => {
  const [repeatedLetters, setRepeatedLetters] = useState(1);
  const interval = setInterval(() => {
    setRepeatedLetters((l) => l + 1);
  }, 500);
  const Children = "XploreIN";

  useEffect(() => {
    if (Children.length == repeatedLetters) clearInterval(interval);
  }, [Children, interval, repeatedLetters]);

  useEffect(() => {
    return () => clearInterval(interval);
  }, [interval]);

  return (
    <div className="theme">
      <h1 className="heading">{Children.substring(0, repeatedLetters)}</h1>
      <p className="desc">
        Embark on new adventures with XploreIN – your ultimate travel companion.
      </p>
    </div>
  );
};
