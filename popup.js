document.addEventListener("DOMContentLoaded", function () {
  const copyButton = document.getElementById("copyButton");
  const statusDiv = document.getElementById("status");

  copyButton.addEventListener("click", copyCookies);

  async function copyCookies() {
    try {
      // Disable button during operation
      copyButton.disabled = true;
      copyButton.textContent = "Copying...";
      hideStatus();

      // URLs for staging and local
      const stagingUrl = "https://app.staging.getcortexapp.com";
      const localUrl = "http://app.local.getcortexapp.com:3000";

      // Get cookies from staging
      const sessionCookie = await chrome.cookies.get({
        url: stagingUrl,
        name: "SESSION",
      });

      const xsrfCookie = await chrome.cookies.get({
        url: stagingUrl,
        name: "XSRF-TOKEN",
      });

      let copiedCount = 0;

      // Copy SESSION cookie to local
      if (sessionCookie) {
        // Remove existing cookie if it exists
        await chrome.cookies.remove({
          url: localUrl,
          name: "SESSION",
        });

        // Set new cookie
        await chrome.cookies.set({
          url: localUrl,
          name: "SESSION",
          value: sessionCookie.value,
          path: sessionCookie.path || "/",
          secure: false, // Local is http
          httpOnly: sessionCookie.httpOnly || false,
          sameSite: "lax",
        });
        copiedCount++;
      }

      // Copy XSRF-TOKEN cookie to local
      if (xsrfCookie) {
        // Remove existing cookie if it exists
        await chrome.cookies.remove({
          url: localUrl,
          name: "XSRF-TOKEN",
        });

        // Set new cookie
        await chrome.cookies.set({
          url: localUrl,
          name: "XSRF-TOKEN",
          value: xsrfCookie.value,
          path: xsrfCookie.path || "/",
          secure: false, // Local is http
          httpOnly: xsrfCookie.httpOnly || false,
          sameSite: "lax",
        });
        copiedCount++;
      }

      // Show success message
      if (copiedCount > 0) {
        showStatus(`Successfully copied ${copiedCount} cookie(s)!`, "success");

        // Create notification
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon48.png",
          title: "Cookies Copied",
          message: `${copiedCount} cookie(s) copied from staging to local`,
        });
      } else {
        showStatus("No cookies found to copy", "error");
      }
    } catch (error) {
      console.error("Error copying cookies:", error);
      showStatus("Error copying cookies: " + error.message, "error");
    } finally {
      // Re-enable button
      copyButton.disabled = false;
      copyButton.textContent = "Copy Cookies to Local";
    }
  }

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = "block";

    // Hide status after 3 seconds
    setTimeout(() => {
      hideStatus();
    }, 3000);
  }

  function hideStatus() {
    statusDiv.style.display = "none";
  }
});
