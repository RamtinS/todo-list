# Todo List

## Overview

The Todo List is a mobile application designed to provide users with an intuitive and
efficient way to create and manage their to-do lists.

The application is developed with TypeScript and React Native Expo. It is developed as
part of an assessment in the subject IDATT2506 - Application Development for Mobile Units at NTNU. 

## Setup and Run

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


## Test data

The application includes test data for testing purposes.
You can find the initializeTestData() function in the
app/_layout.tsx file. This function accepts a boolean
flag as an argument. By default, the flag is set to true,
which means the test data will be generated each time the
application runs. To avoid generating duplicate test data
on the same device, you can set the flag to false.
