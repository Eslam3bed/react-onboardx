
// File: src/index.tsx

import React, { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';

// Types
type Step = {
  id: string;
  content: string;
  note?: any;
};

type OnboardingState = {
  currentStepIndex: number;
  steps: Step[];
  isActive: boolean;
  isCompleted: boolean;
};

type OnboardingContextType = {
  state: OnboardingState;
  nextStep: () => void;
  prevStep: () => void;
  complete: () => void;
  reset: () => void;
  setActive: (isActive: boolean) => void;
};

// Create context
const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

// Provider component
export const OnboardingProvider: React.FC<{
  children: ReactNode;
  steps: Step[];
}> = ({ children, steps }) => {
  const [state, setState] = useState<OnboardingState>({
    currentStepIndex: 0,
    steps,
    isActive: false,
    isCompleted: false,
  });

  const nextStep = () => {
    setState(prev => ({
      ...prev,
      currentStepIndex: Math.min(prev.currentStepIndex + 1, prev.steps.length - 1),
    }));
  };

  const prevStep = () => {
    setState(prev => ({
      ...prev,
      currentStepIndex: Math.max(prev.currentStepIndex - 1, 0),
    }));
  };

  const complete = () => {
    setState(prev => ({ ...prev, isCompleted: true, isActive: false }));
  };

  const reset = () => {
    setState(prev => ({ ...prev, currentStepIndex: 0, isCompleted: false, isActive: true }));
  };

  const setActive = (isActive: boolean) => {
    setState(prev => ({ ...prev, isActive }));
  };

  return (
    <OnboardingContext.Provider value={{ state, nextStep, prevStep, complete, reset, setActive }
    }>
      {children}
    </OnboardingContext.Provider>
  );
};

// Hook for using the onboarding context
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

// OnboardingStep component
export const OnboardingStep: React.FC<{
  stepIndex: number;
  children: ReactNode;
}> = ({ stepIndex, children }) => {
  const { state } = useOnboarding();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.currentStepIndex === stepIndex && state.isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [state.currentStepIndex, state.isActive, stepIndex]);

  return (
    <div ref={ref} className={state.currentStepIndex === stepIndex && state.isActive ? 'highlight' : ''} >
      {children}
    </div>
  );
};

// OnboardingTooltip component
export const OnboardingTooltip: React.FC = () => {
  const { state, nextStep, prevStep, complete } = useOnboarding();
  const currentStep = state.steps[state.currentStepIndex];

  if (!state.isActive || state.isCompleted) return null;

  return (
    <div className="onboarding-tooltip" >
      <div className="onboarding-content" > {currentStep.content} </div>
      {currentStep.note && <div className="onboarding-note" > {currentStep.note} </div>}
      <div className="onboarding-controls" >
        <button onClick={prevStep} disabled={state.currentStepIndex === 0} > Previous </button>
        < button onClick={nextStep} disabled={state.currentStepIndex === state.steps.length - 1} > Next </button>
        < button onClick={complete} > Finish </button>
      </div>
    </div>
  );
};

// Sync function
export const syncOnboardingState = (serverState: Partial<OnboardingState>) => {
  const { state, setActive } = useOnboarding();
  // Merge server state with current state
  setActive(serverState.isActive ?? state.isActive);
  // Add more sync logic as needed
};

// Helper to determine when to show onboarding
export const shouldStartOnboarding = (user: any): boolean => {
  // Logic to determine if onboarding should be shown
  return !user.hasCompletedOnboarding;
};
