# Multi-select filter App

This is a React application that allows users to filter and select items dynamically.
It uses Context API for state management and Jest/Vitest for testing.

## Architecture and Design Decisions

To ensure clean separation of concerns and maintainability, the project structure is organized into several key folders:

* components: Contains all reusable React components.
* context: Includes context-related files, such as providers and custom hooks.
* types: Stores type definitions used across the application.
* tests: Contains all unit tests to validate the functionality of the components and logic.

This structure promotes modularity, easier navigation, and scalability.

### Key technologies

* Context API: it is used for global state management, and it was chosen over Redux for simplicity.
* Vite: Chosen over Create React App for faster builds and better performance.
* Sass: Used for styling to allow more efficient and scalable CSS, using variables and nesting

#### Libraries and tools used:

* React-Toastify: Used for displaying toast notifications. This library was chosen since its easy to use and implement.

## Running the App

To get the project up and running, follow these steps:

**1. Install dependencies:**

`npm install`

**2. Start Development server:**
This will open the app in your browser at http://localhost:5174/

`npm run dev`

**3. Execute all tests:**
To run the unit tests and ensure everything is functioning as expected:

`npm test`

## Challenges faced and solutions

During the development of this app, I faced a few challenges, particularly with the technologies I hadn't used
extensively before.

* **Sass and Context API**: While I use Sass and Context API in my current job, this was my first time setting them up
  from scratch. I needed to refer to documentation and experiment with different configurations to get everything
  working smoothly.

* **Vite**: I hadn't worked with Vite before, but I chose it because it was recommended by my IDE for faster build
  times. The transition was smooth, though I had to learn some Vite-specific configurations.

* **Vitest**: This was also my first time using Vitest, and I encountered some challenges when it came to using mocking.
  I had to dive into the documentation and work through examples to understand how to set up and use mock functions
  correctly.

* **Style Challenges**: The design from the visual reference required a specific color scheme based on a provided image.
  To achieve this, I used online tools to extract a color palette and create a similar look. Additionally, I needed to
  test quite a bit to get the checkbox to appear squared, which required some trial and error.
