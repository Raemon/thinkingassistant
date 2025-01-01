// import AppLayout from "./components/AppLayout";
// import Scorecard from "./components/Scorecard";
// import { ScoreCardWrapperProps } from "./components/Scorecard";

export const getColorA = (rating: number) => {
  if (rating <= 50) {
    // Transition from red to light gray
    const hue = rating * 0.35; // Red hue
    const saturation = 100 - (rating / 50) * 100; // Decrease saturation from 100% to 0%
    const lightness = 30 + (rating / 50) * 60; // Increase lightness from 30% to 90%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  } else {
    // Transition from light gray to dark green
    const hue = 120 * .65// Increase hue from 0 to 120
    const saturation = ((rating - 50) / 50) * 100; // Increase saturation from 0% to 100%
    const lightness = 90 - ((rating - 50) / 50) * 60; // Decrease lightness from 90% to 30%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
};

// type HomeProps = {
//   Component: React.ComponentType;
//   getColor?: (rating: number) => string;
//   height?: number;
//   background?: string;
//   color?: string;
//   shortBeta?: boolean;
//   ScoreCardComponent?: React.ComponentType;
//   scoreCardProps?: ScoreCardWrapperProps;
// }

// export const homes: HomeProps[] = [
//   { Component: AppLayout, getColor: getColorA, height: 20, background: "#fff", color: "black", shortBeta: true, scoreCardProps: { 
//     ScoreCardComponent: Scorecard, 
//     complexity: 0
//   } },
// ]