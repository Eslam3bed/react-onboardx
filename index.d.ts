import React, { ReactNode } from 'react';
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
export declare const OnboardingProvider: React.FC<{
    children: ReactNode;
    steps: Step[];
}>;
export declare const useOnboarding: () => OnboardingContextType;
export declare const OnboardingStep: React.FC<{
    stepIndex: number;
    children: ReactNode;
}>;
export declare const OnboardingTooltip: React.FC;
export declare const syncOnboardingState: (serverState: Partial<OnboardingState>) => void;
export declare const shouldStartOnboarding: (user: any) => boolean;
export {};
