import { useState, useEffect } from "react";
export const Nextweek = () => {
  const today = new Date();
  const nextWeek = today.getTime() + 7 * 24 * 60 * 60 * 1000;
  return nextWeek;
};

export const AddMonths = (date, months) => {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() !== d) {
    date.setDate(0);
  }
  return date.getTime() + 7 * 24 * 60 * 60 * 1000;
};
export const GenerateRandomNDigits = (n) => {
  return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
};

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export const Rating = (data) => {
  var stars = [0, 0, 2, 3, 5],
    count = 0,
    sum = stars.reduce(function (sum, item, index) {
      count += item;
      return sum + item * (index + 1);
    }, 0);

  console.log(sum / count);
};
export const Wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};
