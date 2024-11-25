# Todo List

## Overview

The Todo List is a mobile application designed to provide users with an intuitive and
efficient way to create and manage their to-do lists.

The application is developed with TypeScript and React Native Expo. It is developed as
part of an assessment in the subject IDATT2506 - Application Development for Mobile Units at NTNU. 

## Setup and Run

### Prerequisites

* Node.js installed on device. 
* Android Studio or Xcode installed.

### Run the application.

1. Open an Android or iOS emulator on your device. 

2. Clone the project from GitHub into your device:

   ```
   git clone https://github.com/RamtinS/todo-list.git
   ```

3. Navigate to the project directory:

   ```
   cd todo-list
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Run the app:

   ```bash
    npx expo start
   ```

6. Follow the instructions in the terminal to open the application on the desired emulator.

## Test data

The application includes test data for testing purposes.
You can find the initializeTestData() function in the
app/_layout.tsx file. This function accepts a boolean
flag as an argument. By default, the flag is set to true,
which means the test data will be generated each time the
application runs. To avoid generating duplicate test data
on the same device, you can set the flag to false.
