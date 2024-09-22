[![Build and Release](https://github.com/Eslam3bed/react-onboardx/actions/workflows/build.yml/badge.svg)](https://github.com/Eslam3bed/react-onboardx/actions/workflows/build.yml)
[![Publish](https://github.com/Eslam3bed/react-onboardx/actions/workflows/release.yml/badge.svg)](https://github.com/Eslam3bed/react-onboardx/actions/workflows/release.yml)

# React Onboarding Tool Kit

## Overview

React Onboarding Tool Kit is a flexible, easy-to-use package for creating guided tours and onboarding experiences in React applications. It provides a headless approach, allowing you to maintain full control over your UI while leveraging powerful onboarding logic.

Key Features:
- Declarative API with React components
- Global state management
- Easy integration with existing React apps
- Customizable step targeting and highlighting
- Support for dynamic content and notes
- Controlled activation and deactivation of onboarding flow

## Installation

Install the package using npm:

```bash
npm install react-onboardx
```

Or using yarn:

```bash
yarn add react-onboardx
```

## Basic Usage

Here's a quick example of how to use the React Onboarding Tool Kit:

```jsx
import { OnboardingProvider, OnboardingStep, OnboardingTooltip, useOnboarding } from 'react-onboardx';

const App = () => {
  const steps = [
    { id: '1', content: 'Welcome to our app!' },
    { id: '2', content: 'Click here to create a new item' },
    { id: '3', content: 'View your profile settings here' },
  ];

  return (
    <OnboardingProvider steps={steps}>
      <MainContent />
      <OnboardingTooltip />
    </OnboardingProvider>
  );
};

const MainContent = () => {
  const { setActive } = useOnboarding();

  useEffect(() => {
    setActive(true); // Start onboarding when component mounts
  }, []);

  return (
    <div>
      <OnboardingStep stepIndex={0}>
        <h1>Welcome to Our App</h1>
      </OnboardingStep>
      <OnboardingStep stepIndex={1}>
        <button>Create New Item</button>
      </OnboardingStep>
      <OnboardingStep stepIndex={2}>
        <div>Profile Settings</div>
      </OnboardingStep>
    </div>
  );
};
```

## API Reference

### `<OnboardingProvider>`

The main wrapper component that provides onboarding context to its children.

Props:
- `steps`: An array of step objects, each containing `id` and `content` properties.
- `children`: React nodes to be wrapped.

### `<OnboardingStep>`

A component to wrap UI elements that are part of the onboarding flow.

Props:
- `stepIndex`: The index of the current step.
- `children`: The UI element(s) to be highlighted during this step.

### `<OnboardingTooltip>`

A component that renders the content for the current onboarding step.

### `useOnboarding()`

A hook to access and control the onboarding state.

Returns an object with:
- `state`: The current onboarding state.
- `nextStep()`: Function to move to the next step.
- `prevStep()`: Function to move to the previous step.
- `complete()`: Function to mark onboarding as completed.
- `reset()`: Function to reset the onboarding to the initial state.
- `setActive(boolean)`: Function to activate or deactivate the onboarding.

### `syncOnboardingState(serverState)`

A function to synchronize the onboarding state with a server.

Parameters:
- `serverState`: A partial onboarding state object from the server.

### `shouldStartOnboarding(user)`

A helper function to determine if onboarding should be shown for a user.

Parameters:
- `user`: A user object containing relevant information.

## Best Practices

1. **Step Design**: Keep each step focused on a single action or piece of information to avoid overwhelming users.

2. **Content**: Use clear, concise language in your step content. Avoid jargon and provide context where necessary.

3. **Timing**: Consider when to trigger the onboarding. It doesn't always have to start immediately upon app load.

4. **User Control**: Always provide a way for users to exit or skip the onboarding process.

5. **Persistence**: Use the `syncOnboardingState` function to save progress, allowing users to continue where they left off in future sessions.

6. **Responsiveness**: Ensure your onboarding UI is responsive and works well on different screen sizes.

7. **Testing**: Thoroughly test your onboarding flow to ensure all steps are reachable and functioning correctly.

## Customization

The React Onboarding Tool Kit is designed to be highly customizable. You can create your own tooltip component to replace the default `OnboardingTooltip`, or add custom styling to the `OnboardingStep` component for different highlighting effects.

## Troubleshooting

If you encounter issues:

1. Ensure all components are wrapped inside the `OnboardingProvider`.
2. Check that your step indices match the order of your steps array.
3. Verify that `setActive(true)` is called when you want to start the onboarding.

For more help, please open an issue on our GitHub repository.

## Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## License

This project is licensed under the MIT License.
