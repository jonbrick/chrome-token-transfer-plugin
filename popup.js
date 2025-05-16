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
      const stagingApiUrl = "https://api.staging.getcortexapp.com";
      const localUrl = "http://app.local.getcortexapp.com:3000";

      // Get specific cookies from staging API
      const sessionCookie = await chrome.cookies.get({
        url: stagingApiUrl,
        name: "SESSION",
      });

      const xsrfCookie = await chrome.cookies.get({
        url: stagingApiUrl,
        name: "XSRF-TOKEN",
      });

      console.log("SESSION cookie value:", sessionCookie?.value);
      console.log("XSRF-TOKEN cookie value:", xsrfCookie?.value);

      let copiedCount = 0;

      // Copy SESSION cookie to local
      if (sessionCookie?.value) {
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
          path: "/",
          domain: "app.local.getcortexapp.com",
          secure: false, // Local is http
          httpOnly: true,
          sameSite: "lax",
        });
        copiedCount++;
      }

      // Copy XSRF-TOKEN cookie to local
      if (xsrfCookie?.value) {
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
          path: "/",
          domain: "app.local.getcortexapp.com",
          secure: false, // Local is http
          httpOnly: false, // XSRF-TOKEN needs to be accessible by JavaScript
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
