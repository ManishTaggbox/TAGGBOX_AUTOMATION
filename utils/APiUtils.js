class APiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://api.taggbox.com/api/v1/user/login", {
            data: this.loginPayLoad,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Origin": "https://app.taggbox.com",
                "Referer": "https://app.taggbox.com/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
            },
        });
    
        const loginResponseJson = await loginResponse.json();
       // console.log("Full API response:", JSON.stringify(loginResponseJson, null, 2));
    
        // Check if response is successful
        if (loginResponseJson.status !== 200 && loginResponseJson.response_code !== 200) { // Added check for response_code
            throw new Error(`Login failed: ${loginResponseJson.response_message || 'Unknown error'}`);
        }
    
        // Correctly extract the token from responseData
        let token = loginResponseJson.responseData ? loginResponseJson.responseData.token : null;
    
        if (!token) {
            throw new Error("Token not found in the response");
        }
    
       // console.log("Token received:", token);
        return token;
    }
}

module.exports = { APiUtils };