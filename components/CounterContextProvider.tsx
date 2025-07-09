import React, { createContext, useContext, useState, ReactNode } from 'react';

type CounterContextType = {
  count: number;
  increment: (value: number) => void;
  decrement: (value: number) => void; 
  reset: () => void;
};

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const increment = (value: number) => {
    setCount(prevCount => prevCount + value);
  };

  const reset = () => {
    setCount(0);
  };

  const decrement = (value: number) => {
    setCount(prevCount => prevCount - value);
  }

  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
};
