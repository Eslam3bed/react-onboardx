import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OnboardingProvider, OnboardingTooltip, shouldStartOnboarding } from '../index';

describe('Onboarding', () => {
  const steps = [
    { id: 'step1', content: 'Step 1' },
    { id: 'step2', content: 'Step 2' },
  ];

  it('renders the tooltip with the correct step', () => {
    render(
      <OnboardingProvider steps={steps}>
        <OnboardingTooltip />
      </OnboardingProvider>
    );

    // Activate the onboarding
    const nextButton = screen.getByText('Next');
    expect(screen.getByText('Step 1')).toBeInTheDocument();

    fireEvent.click(nextButton);
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  it('disables the next button on the last step', () => {
    render(
      <OnboardingProvider steps={steps}>
        <OnboardingTooltip />
      </OnboardingProvider>
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(nextButton).toBeDisabled();
  });

  it('checks if onboarding should start', () => {
    const user = { hasCompletedOnboarding: false };
    expect(shouldStartOnboarding(user)).toBe(true);
  });
});