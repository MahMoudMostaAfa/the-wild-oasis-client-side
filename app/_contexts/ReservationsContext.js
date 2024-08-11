"use client";
import { createContext, useContext, useState } from "react";

const ReservationsContext = createContext();
const initalState = {
  to: undefined,
  from: undefined,
};
function ReservationsProvider({ children }) {
  const [range, setRange] = useState(initalState);
  const resetRange = () => setRange(initalState);
  return (
    <ReservationsContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationsContext.Provider>
  );
}

function useReservations() {
  const context = useContext(ReservationsContext);
  if (context === undefined) {
    throw new Error(
      "useReservations must be used within a ReservationsProvider"
    );
  }
  return context;
}
export { ReservationsProvider, useReservations };
