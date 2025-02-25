import { getPreferenceValues, showToast, Toast, closeMainWindow } from "@raycast/api";
import { exec } from "child_process";

interface Preferences {
  server1: string;
  server2?: string;
  server3?: string;
  server4?: string;
  username: string;
  password: string;
}

/**
 * Escapes backslashes, double quotes, and single quotes so they can survive
 * inside a single-quoted AppleScript string.
 */
function escapeForAppleScript(str: string) {
  return str
    .replace(/\\/g, "\\\\")   // Escape backslashes
    .replace(/"/g, '\\"')     // Escape double quotes
    .replace(/'/g, "\\'");    // Escape single quotes
}

/**
 * Uses AppleScript’s "mount volume" syntax with separate user name & password.
 * This avoids the need to embed credentials in the SMB URL (which breaks
 * if your password ends with '@' or contains other special characters).
 */
function connectToServer(server: string, username: string, password: string) {
  return new Promise<void>((resolve, reject) => {
    // Remove any leading "smb://"
    const cleanServer = server.replace(/^smb:\/\//, "");

    // Escape credentials for AppleScript
    const userEscaped = escapeForAppleScript(username);
    const passEscaped = escapeForAppleScript(password);

    // Use AppleScript’s "as user name … with password …" approach
    const command = `
      osascript -e '
      try
        mount volume "smb://${cleanServer}" as user name "${userEscaped}" with password "${passEscaped}"
      on error errMsg
        display dialog errMsg
      end try
      '
    `;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || error.message);
      } else {
        resolve();
      }
    });
  });
}

export default async function Command() {
  const preferences = getPreferenceValues<Preferences>();

  try {
    // Close the main window so Raycast doesn’t hang open
    await closeMainWindow({ clearRootSearch: true });
    await showToast({ style: Toast.Style.Animated, title: "Connecting to servers..." });

    // Gather all servers (filter out empty or undefined)
    const servers = [
      preferences.server1,
      preferences.server2,
      preferences.server3,
      preferences.server4,
    ].filter((s): s is string => Boolean(s));

    // Attempt to connect to each server in sequence
    for (const server of servers) {
      await connectToServer(server, preferences.username, preferences.password);
    }

    // If we reach here, all connections succeeded
    const connectedCount = servers.length;
    await showToast({
      style: Toast.Style.Success,
      title: `Connected to ${connectedCount} server${connectedCount > 1 ? "s" : ""}!`,
    });
  } catch (error) {
    // Show an error toast if anything fails
    await showToast({
      style: Toast.Style.Failure,
      title: "Connection failed",
      message: String(error),
    });
  }
}
