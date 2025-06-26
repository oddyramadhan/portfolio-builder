# Portfolio Builder

A modern, responsive portfolio builder application that allows users to create and customize their professional portfolios with ease.

## 🚀 Features

- **Interactive Portfolio Creation**: Build professional portfolios with a user-friendly interface
- **Real-time Preview**: See changes instantly as you build your portfolio
- **Responsive Design**: Optimized for all devices and screen sizes
- **Form Management**: Robust form handling with validation
- **Modern UI**: Clean and professional design system

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) - React framework for production
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible UI components
- **Form Management**: [React Hook Form](https://react-hook-form.com/) - Performant forms with easy validation
- **Styling**: Tailwind CSS - Utility-first CSS framework
- **Backend**: JSON Server - Mock REST API for development

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd portfolio-builder
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Running the Application

This application requires **two servers** to run simultaneously:

#### Terminal 1: Start the Frontend (Port 3000)

```bash
npm run dev
# or
yarn dev
```

The frontend application will be available at: `http://localhost:3000`

#### Terminal 2: Start the JSON Server (Port 3002)

```bash
npm run json-server
# or
yarn json-server
```

The JSON server will be available at: `http://localhost:3002`

### 4. Access the Application

Once both servers are running, open your browser and navigate to:
- **Main Application**: `http://localhost:3000`
- **API Endpoint**: `http://localhost:3002`

## Data Schema

### Root Object
| Field | Type | Description |
|-------|------|-------------|
| `profile` | Object | User profile information |
| `portfolios` | Array | List of portfolio projects |
| `profileImage` | String (Base64) | Base64 encoded profile image data |
| `backgroundImage` | String (Base64) | Base64 encoded background image data |

### Profile Object
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | Yes | Full name of the user |
| `position` | String | Yes | Current job title or role |
| `description` | String | Yes | Brief professional description |

### Portfolio Object
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | Yes | Project name |
| `position` | String | Yes | Role/position in the project |
| `description` | String | Yes | Project description |
| `company` | String | Yes | Company or organization |
| `startDate` | String | Yes | Project start date (DD-MM-YYYY format) |
| `endDate` | String | No | Project end date (DD-MM-YYYY format) |

## 📝 Notes

- Ensure **both servers** are running at the same time for the application to work properly.
- If any port is already in use, you can change it in the project configuration or use a tool like `npx kill-port`.

---

**Happy coding! 🎉**