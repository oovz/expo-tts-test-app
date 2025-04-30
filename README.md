# Expo TTS Testing App

This is a comprehensive testing application for exploring various Text-to-Speech (TTS) libraries available for Expo, React Native, and JavaScript. The app allows you to test different TTS engines, languages, voices, and settings in a structured environment.

## Features

- Test TTS functionality across multiple languages
- Adjust speech parameters (pitch, rate, etc.)
- Organize speech samples by scenes and categories

## Supports

- [x] [expo-speech](https://docs.expo.dev/versions/latest/sdk/speech)

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/oovz/expo-tts-test-app.git
   cd expo-tts-test-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

### Running the App

The app can be run on different platforms:

- **iOS simulator**: Press `i` in the terminal or select "Run on iOS simulator" in the Expo Developer Tools
- **Android emulator**: Press `a` in the terminal or select "Run on Android device/emulator"
- **Physical device**: Scan the QR code with the Expo Go app on your device
- **Web browser**: Press `w` in the terminal or select "Run in web browser"

## Configuring Test Scenes

The app uses a scene-based system for organizing TTS samples. You can easily add your own scenes by modifying the `config/scenes.ts` file.

### Adding a New Scene

1. Open `config/scenes.ts`
2. Add a new scene object to the `SCENES` array following this structure:

```typescript
{
  id: 'your-unique-id',
  title: 'Scene Title',
  description: 'Brief description of the scene',
  sentences: {
    'en-US': [
      'First sentence in English.',
      'Second sentence in English.',
    ],
    'zh-CN': [
      '中文的第一句话。',
      '中文的第二句话。',
    ],
    // Add more languages as needed
  },
  tags: ['category1', 'category2'] // Optional tags
}
```

3. Save the file and restart the app to see your new scene

The app will automatically recognizes any IETF BCP 47 language code you add to the scenes configuration.

## Roadmap

Future enhancements planned for this project:

- [ ] Fix issues with android emulator not correctly initializing TTS
- [ ] Support for storage of settings and preferences
- [ ] Support for additional TTS engines
- [ ] Support side by side comparison of voices
- [ ] Support side by side comparison of TTS engines

