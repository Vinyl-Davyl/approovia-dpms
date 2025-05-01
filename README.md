# Approovia Project Management Dashboard

## Overview

The Approovia Project Management Dashboard is a sophisticated, intuitive drag-and-drop interface that allows users to efficiently organize and manage projects across different folders. This application leverages modern front-end technologies including React, TypeScript, Redux for state management, and @dnd-kit/core for smooth drag-and-drop functionality, all styled with a professional UI using Tailwind CSS.

## Features

- **Drag-and-Drop Project Management**:

  - Seamlessly move projects between folders with intuitive drag-and-drop functionality
  - Visual feedback during dragging operations
  - Smooth animations during transitions

- **Folder and Project Organization**:

  - Multiple project folders with distinct visual representation
  - Projects with detailed progress information
  - Clean, organized layout for easy navigation

- **Visual State Indicators**:

  - Active states for selected folders
  - Visual feedback during drag operations
  - Hover effects for interactive elements

- **Simulated API Integration**:

  - Mock API submissions when projects are moved
  - Success notifications using toast messages
  - Realistic operation simulations with loading states

- **Responsive Design**:
  - Fully responsive layout adapting to all screen sizes
  - Mobile-friendly interface with touch support
  - Optimized sidebar for smaller screens

## Architecture

The application follows a modern React architecture with the following key components:

- **State Management**: Redux with Redux Toolkit for efficient state handling
- **UI Components**: Functional components with React Hooks
- **Drag and Drop**: @dnd-kit/core library for accessible drag-and-drop functionality
- **Styling**: Tailwind CSS for utility-first styling with custom CSS variables
- **Notifications**: react-hot-toast for user feedback
- **Routing**: React Router for future expansion

### Key Components

- **DashboardLayout**: Main layout wrapper handling the drag-and-drop context
- **Sidebar**: Collapsible navigation with folder selection
- **Project Cards**: Interactive cards with progress information and edit capabilities
- **Folder Items**: Selectable folder items with drag target functionality

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Vinyl-Davyl/approovia-dpms.git
```

2. Navigate to the project directory:

```bash
cd approovia-dpms
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open your browser and visit:

```
http://localhost:5173
```

## Build and Deployment

To build the project for production:

```bash
npm run build
```

The application can be deployed to services like Vercel, Netlify, or any static hosting provider.

## Media
<img width="1504" alt="Screenshot 2025-05-01 at 11 23 26 AM" src="https://github.com/user-attachments/assets/b76beb4e-1acf-4cb5-b048-e3145e41795c" />
<img width="1500" alt="Screenshot 2025-05-01 at 11 20 57 AM" src="https://github.com/user-attachments/assets/ba92926e-7e55-4318-b917-8a4b3d470fb9" />
<img width="1500" alt="Screenshot 2025-05-01 at 11 21 22 AM" src="https://github.com/user-attachments/assets/947950a7-fdd2-4471-8f1c-6273f6f6a4c0" />
<img width="1500" alt="Screenshot 2025-05-01 at 11 22 03 AM" src="https://github.com/user-attachments/assets/4c53e910-7c59-4a3a-b5e7-88d48a317633" />
<img width="390" alt="Screenshot 2025-05-01 at 11 22 48 AM" src="https://github.com/user-attachments/assets/faf05994-986c-463c-a1d2-4dcdfeff6327" />
<img width="390" alt="Screenshot 2025-05-01 at 11 22 56 AM" src="https://github.com/user-attachments/assets/26751480-dd05-4359-8e94-242668da98e0" />

## Design Decisions

### User Interface

The dashboard interface was designed with these principles in mind:

- **Clarity**: Clear visual hierarchy and organization
- **Feedback**: Immediate visual feedback during interactions
- **Consistency**: Uniform design language throughout the application
- **Accessibility**: Proper contrast and interactive states

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
