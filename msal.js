const msalConfig = {
    auth: {
        clientId: "-----",  // Replace with your Azure AD app's client ID
        authority: "https://login.microsoftonline.com/-----",  // Replace with your Azure AD tenant ID
        redirectUri: window.location.href  // Using the current page as the redirect URI
    },
    cache: {
        cacheLocation: "sessionStorage",  // Cache in sessionStorage
        storeAuthStateInCookie: false    // Don't store authentication state in cookies
    }
};

// Initialize MSAL instance
const msalInstance = new msal.PublicClientApplication(msalConfig);

console.log("MSAL instance initialized");

// Login button event listener
document.getElementById("loginButton").addEventListener("click", () => {
  console.log("Login button clicked");
  login();
});

// Function to handle login
async function login() {
  const loginRequest = {
    scopes: ["user.read"]  // You can add other Microsoft Graph API scopes as needed
  };

  try {
    console.log("Attempting to login via popup...");
    
    // Login and acquire token
    const loginResponse = await msalInstance.loginPopup(loginRequest);
    console.log("Login Response: ", loginResponse);
    
    // Acquire Token
    const tokenResponse = await msalInstance.acquireTokenSilent(loginRequest);
    console.log("Token Response: ", tokenResponse);

    // Display token in the HTML
    document.getElementById("output").textContent = JSON.stringify(tokenResponse, null, 2);

  } catch (error) {
    console.error("Login or token acquisition failed:", error);
    document.getElementById("output").textContent = `Error: ${error.message}`;
  }
}
