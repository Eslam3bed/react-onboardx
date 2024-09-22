import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OnboardingProvider, OnboardingTooltip, shouldStartOnboarding } from '../index';

describe('Onboarding', () => {
  const steps = [
    { id: 'step1', content: 'Step 1' },
    { id: 'step2', content: 'Step 2' },
  ];
  it('checks if onboarding should start', () => {
    const user = { hasCompletedOnboarding: false };
    expect(shouldStartOnboarding(user)).toBe(true);
  });
});