# dataList - Customer Management Application

A React Native application for managing and viewing customer data with pagination, search functionality, internationalization (Thai/English), and Redux state management.

## Table of Contents

- [How to Run the Project](#how-to-run-the-project)
- [Project Structure Overview](#project-structure-overview)
- [Key Technical Decisions](#key-technical-decisions)
- [Assumptions & Trade-offs](#assumptions--trade-offs)
- [Future Improvements](#future-improvements)

---

## How to Run the Project

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm** or **yarn**: Package manager
- **React Native CLI**: For running on mobile platforms
- **Platform Requirements**:
  - **iOS**: macOS with Xcode 14+ installed
  - **Android**: Android SDK with API level 21+ and Android Studio

### Installation Steps

1. **Clone the repository and install dependencies**:

   ```bash
   cd dataList
   npm install
   # or
   yarn install
   ```

2. **Install platform-specific dependencies** (if needed):

   ```bash
   npm install --save-dev @types/node
   # For iOS
   cd ios && pod install && cd ..
   ```

3. **Start the Metro bundler** (open in a separate terminal):
   ```bash
   npm start
   # or
   npx react-native start
   ```

### Running the App

#### Android

```bash
npm run android
# or
npx react-native run-android
```

#### iOS

```bash
npm run ios
# or
npx react-native run-ios
```

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Build and run on Android emulator/device
- `npm run ios` - Build and run on iOS simulator/device
- `npm test` - Run Jest test suite
- `npm run lint` - Run ESLint for code quality
- `npm run format` - Format code with Prettier

---

## Project Structure Overview

```
dataList/
├── src/
│   ├── core/
│   │   ├── api/
│   │   │   ├── client.ts         # API client configuration
│   │   │   └── index.ts          # API utility exports
│   │   └── constants/
│   │       └── api.ts            # API constants (base URL, headers, retry config)
│   │
│   ├── features/
│   │   └── customers/
│   │       ├── index.ts
│   │       ├── components/       # Customer-specific UI components
│   │       ├── data/             # Dummy/mock data
│   │       ├── hooks/            # Custom hooks for customers
│   │       ├── screens/          # Customer screens
│   │       ├── services/         # Customer business logic
│   │       └── types/            # TypeScript types for customers
│   │
│   ├── i18n/
│   │   ├── index.ts              # i18n configuration and setup
│   │   └── locales/
│   │       ├── en.ts             # English translations
│   │       └── th.ts             # Thai translations
│   │
│   ├── navigation/
│   │   └── RootNavigator.tsx     # Main stack navigator configuration
│   │
│   ├── shared/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── EmptyStateView.tsx
│   │   │   ├── LoadingOverlay.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── SearchInput.tsx
│   │   │   ├── UserCard.tsx
│   │   │   └── index.ts
│   │   ├── constants/
│   │   │   ├── colors.ts         # Color palette
│   │   │   ├── spacing.ts        # Spacing values
│   │   │   ├── typography.ts     # Font styles
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useDebounce.ts    # Debounce hook for search
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── api.types.ts      # Shared API types
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── dateUtils.ts
│   │       ├── stringUtils.ts
│   │       ├── validationUtils.ts
│   │       └── index.ts
│   │
│   └── store/
│       ├── index.ts              # Redux store configuration
│       └── slice/
│           ├── customerSlice.ts  # Customer Redux slice (actions, reducers, thunks)
│           └── index.ts
│
├── __tests__/
│   └── App.test.tsx              # Basic app component tests
│
├── android/                      # Android native code and configuration
├── ios/                          # iOS native code and configuration
├── App.tsx                       # Root app component
├── index.js                      # App entry point
├── app.json                      # React Native app configuration
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── jest.config.js                # Jest testing framework config
├── babel.config.js               # Babel transpiler configuration
├── metro.config.js               # Metro bundler configuration
├── .eslintrc.js                  # ESLint rules and configuration
└── .prettierrc.js                # Prettier code formatting rules
```

### Key Directories Explained

- **src/core**: Core application logic (API client, constants)
- **src/features**: Feature-based modules (customers module)
- **src/shared**: Reusable components, utilities, and types
- **src/store**: Redux state management
- **src/i18n**: Internationalization setup with English and Thai
- **src/navigation**: Screen navigation configuration

---

## Key Technical Decisions

### 1. **Redux Toolkit for State Management**

**Why**: Centralized, predictable state management with reduced boilerplate

- Built-in immutability and serialization checks
- Createslice and createAsyncThunk reduce code
- DevTools integration for debugging
- Better performance through selector memoization

### 2. **React Navigation (Native Stack)**

**Why**: Industry-standard navigation for React Native

- Performant native stack navigation
- Easy-to-use API for screen transitions
- Deep linking support for future enhancement
- Safe area handling built-in

### 3. **TypeScript for Type Safety**

**Why**: Catch errors at compile time and improve IDE support

- Strict mode enabled in tsconfig
- Better refactoring capabilities
- Self-documenting code through types
- Reduced runtime errors

### 4. **i18n-js for Internationalization**

**Why**: Lightweight library for multi-language support with runtime switching

- Small bundle size
- Easy to manage translations
- Support for Thai and English out of the box
- Runtime language switching without app restart

### 5. **DummyJSON API for Mock Data**

**Why**: Enables offline development without building a backend

- Realistic user data from public API
- No dependency on internal backend during development
- Ideal for prototyping and UI validation
- Easy to replace with real API later

### 6. **Client-side Pagination**

**Why**: Simple implementation suitable for manageable datasets

- 10 items per page for optimal UX
- Redux state manages current page
- Reduces server load for small datasets
- Future: Can migrate to server-side pagination

### 7. **FlatList for List Rendering**

**Why**: Optimized rendering for long lists in React Native

- Efficient virtualization and recycling
- Better performance than ScrollView with many items
- Built-in refresh control support
- Low memory footprint for large datasets

### 8. **Feature-based Folder Structure**

**Why**: Scalability and maintainability

- Related code (components, hooks, types) grouped together
- Easy to remove or add features
- Clear separation of concerns
- Easier for new developers to understand

---

## Assumptions & Trade-offs

### Assumptions

1. **Mock Data Only**

   - Application currently uses DummyJSON API for data
   - No authentication required
   - Suitable for POC/demo scenarios
   - Production deployment would require real backend integration

2. **Single User Context**

   - No user authentication or authorization
   - Assumes public or demo environment
   - All users see the same data
   - User profiles not implemented

3. **Client-side Operations**

   - Search and filtering done in-memory
   - Pagination handled on client
   - Suitable for datasets < 10K records
   - Large datasets would require server-side implementation

4. **Consistent Language**
   - Thai and English translations complete for MVP
   - Date/number formats not localized per language
   - RTL languages not supported

### Trade-offs

| Decision                  | Benefits                                 | Costs                                  |
| ------------------------- | ---------------------------------------- | -------------------------------------- |
| Redux                     | Centralized state, time-travel debugging | More boilerplate than Context API      |
| TypeScript                | Type safety, better IDE support          | Build compilation step, learning curve |
| DummyJSON API             | Fast prototyping, no backend needed      | Doesn't reflect real API constraints   |
| Client-side pagination    | Simple implementation                    | Not scalable for 10K+ records          |
| Custom navigation headers | Full UI control                          | More code to maintain                  |
| i18n-js                   | Lightweight                              | Fewer features than alternatives       |
| Feature-based structure   | Better organization                      | More files/folders initially           |

---

## Future Improvements

### High Priority

1. **Backend Integration**

   - Replace DummyJSON with real API endpoints
   - Implement proper error handling and retry logic
   - Add request/response interceptors and logging
   - Implement offline sync with local storage (SQLite/Realm)

2. **Authentication & Security**

   - Add login/signup screens with proper validation
   - Implement JWT token refresh mechanism
   - Secure token storage using device keychain/Keystore
   - Add role-based access control (RBAC)

3. **Data Persistence**
   - Integrate SQLite or Realm for offline storage
   - Implement bi-directional sync with backend
   - Add conflict resolution for concurrent updates
   - Cache frequently accessed data

### Medium Priority

4. **Enhanced Features**

   - Advanced search with filters (status, date range, company)
   - Customer creation, editing, and deletion
   - Bulk operations (export to CSV, batch delete)
   - Customer notes and activity history
   - Attachment/document upload support

5. **Performance Optimization**

   - Implement FlatList virtualization for very large lists
   - Code splitting and lazy loading for screens
   - Optimize Redux selectors with Reselect library
   - Profile and optimize render performance with React DevTools

6. **Testing & Quality**
   - Increase unit test coverage to >80%
   - Add integration tests for Redux flows
   - Implement E2E tests with Detox or Appium
   - Add snapshot testing for critical components

### Lower Priority

7. **Developer Experience**

   - Setup CI/CD pipeline (GitHub Actions or GitLab CI)
   - Add crash reporting (Sentry or Bugsnag)
   - Implement analytics tracking (Firebase or Mixpanel)
   - Automated code review with pre-commit hooks

8. **Advanced Features**

   - Dark mode support with system preference detection
   - Push notifications for customer updates
   - Advanced analytics and insights dashboard
   - Customer segmentation and targeting

9. **Internationalization Expansion**

   - Add more languages (Spanish, French, Vietnamese)
   - Implement RTL support for Arabic/Hebrew
   - Locale-specific date and number formatting
   - Plural handling and gender-aware translations

10. **Production Readiness**
    - Environment-specific builds (dev, staging, prod)
    - Graceful error boundaries and error screens
    - App versioning strategy and update notifications
    - Comprehensive error logging and monitoring
    - App Store and Google Play deployment automation

---

## Dependencies Overview

### Core Dependencies

- **react-native** (0.83.1): Cross-platform mobile framework
- **@react-navigation/native**: Base navigation
- **@reduxjs/toolkit**: Redux state management
- **react-redux**: React-Redux bindings
- **i18n-js**: Internationalization
- **react-native-safe-area-context**: Safe area handling

### Development Dependencies

- **typescript**: Type safety and compilation
- **jest**: Testing framework
- **@testing-library/react-native**: React Native testing utilities
- **eslint**: Code quality
- **prettier**: Code formatting
- **@types/node**: Node.js type definitions

---

## Notes

- Default language is Thai (TH)
- Language can be toggled between Thai and English from the header
- Search functionality includes debounce for optimized performance
- Pagination shows 10 customers per page
- Safe area context handles notches and system UI
- Gesture Handler included for enhanced navigation gestures

---

## Getting Help

For issues or questions:

1. Check existing console errors in device logs
2. Review Redux DevTools state
3. Check network requests in API client logs
4. Verify TypeScript types match your data structure

## License

MIT License - Feel free to use this project as a template for your applications.
