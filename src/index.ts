import { getPreferenceValues, showToast, Toast, closeMainWindow } from "@raycast/api";
import { exec } from "child_process";

interface Preferences {
  server1: string;
  server2: string;
  username: string;
  password: string;
}

function connectToServer(server: string, username: string, password: string) {
  return new Promise((resolve, reject) => {
    // Format the connection string with authentication
    const connectionString = server.includes("@")
      ? server // If the server already includes credentials, use as is
      : server.replace("smb://", `smb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@`);

    exec(`osascript -e 'mount volume "${connectionString}"'`, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve(stdout);
      }
    });
  });
}

export default async function Command() {
  const { server1, server2, username, password } = getPreferenceValues<Preferences>();

  try {
    // Close the Raycast main window immediately
    await closeMainWindow({ clearRootSearch: true });

    // Display an initial animated toast while connecting
    await showToast({ style: Toast.Style.Animated, title: "Connecting to servers..." });

    // Attempt to connect to both servers with the same credentials
    await connectToServer(server1, username, password);
    await connectToServer(server2, username, password);

    // Show success message after connecting
    await showToast({ style: Toast.Style.Success, title: "Connected to both servers!" });
  } catch (error) {
    // Show failure message if connection fails
    await showToast({
      style: Toast.Style.Failure,
      title: "Connection failed",
      message: String(error),
    });
  }
}