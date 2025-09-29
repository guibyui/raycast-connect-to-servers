# Connect to Servers

This Raycast extension connects you to specified network servers. Customize the server addresses and folders in Raycast preferences.

## Setup Instructions (for new Mac)

### Prerequisites
- macOS (tested on macOS 14+)
- Node.js (v18 or higher)
- npm

### Installation Steps

1. **Install Raycast** (if not already installed):
   ```bash
   brew install --cask raycast
   ```

2. **Install Raycast CLI**:
   ```bash
   npm install -g @raycast/api
   ```

3. **Clone/Navigate to extension directory**:
   ```bash
   cd "/path/to/connect-to-servers"
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Fix any security vulnerabilities**:
   ```bash
   npm audit fix
   ```

6. **Build the extension**:
   ```bash
   npm run build
   ```

7. **Start development mode**:
   ```bash
   npm run dev
   ```

8. **Configure in Raycast**:
   - Open Raycast (`Cmd + Space`)
   - Type "Connect to Servers" to find your extension
   - Configure the extension settings:
     - **Server 1 Address**: Required - Enter your first server address (e.g., `smb://192.168.1.100/sharedfolder`)
     - **Server 2 Address**: Optional - Enter your second server address
     - **Server 3 Address**: Optional - Enter your third server address  
     - **Server 4 Address**: Optional - Enter your fourth server address
     - **Username**: Required - Enter your username for the servers
     - **Password**: Required - Enter your password for the servers

### Development Commands

- `npm run dev` - Start development mode with hot reload
- `npm run build` - Build the extension for production
- `npm run lint` - Check code for linting errors
- `npm run fix-lint` - Fix linting errors automatically

## Configuration

1. After installing, go to Raycast > Extensions > Connect to Servers.
2. In the preferences panel, specify:
   - `Server 1 Address`: Address of your first server (e.g., `smb://0.0.0.0/YourFolder`).
   - `Server 2 Address`: Address of your second server (e.g., `smb://0/0/0/0/YourFolder`).

## Usage

- Run the command in Raycast or assign a hotkey to quickly connect to the servers.
