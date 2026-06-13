# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Lonestar Handyman** — a React Native app targeting iOS, Android, and web from a single codebase, built with Expo SDK 56 and TypeScript.

## Commands

```bash
# Start dev server (choose platform interactively)
npm start

# Target a specific platform
npm run android    # opens Android emulator / device
npm run ios        # macOS only; use Expo Go on device otherwise
npm run web        # opens browser at localhost:8081

# Type-check
npx tsc --noEmit
```

There is no test runner configured yet. Add one (e.g. Jest with jest-expo) before writing tests.

## Architecture

### Entry point
`index.ts` → `App.tsx`. The root `App` component is registered via Expo's `registerRootComponent`.

### Platform targets
- **Mobile (iOS/Android):** native React Native renderer.
- **Web:** `react-native-web` translates RN primitives to DOM elements, bundled by Metro via Expo's web support.

### Styling
Use `StyleSheet.create()` from `react-native` for all styles — it works across all three platforms. Avoid raw CSS or web-only style properties.

### Platform-specific code
Use the `.ios.tsx` / `.android.tsx` / `.web.tsx` file extension convention or `Platform.select()` / `Platform.OS` for diverging behavior. Keep platform splits minimal.

### Config
`app.json` holds Expo config (app name, icons, orientation, platform-specific settings). Runtime environment variables go through `expo-constants` or `process.env` with Metro's `EXPO_PUBLIC_` prefix convention.

## Key constraints

- **Strict TypeScript** (`"strict": true`). All new files must be `.ts` / `.tsx`.
- Expo SDK 56 / React 19 / React Native 0.85. Check Expo SDK compatibility before adding native packages — prefer packages in the Expo ecosystem that don't require a custom dev client.
- iOS builds require macOS. On Windows, test mobile via the **Expo Go** app on a physical device or an Android emulator.
