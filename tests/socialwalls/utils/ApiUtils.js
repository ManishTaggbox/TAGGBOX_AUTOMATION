class APiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post(
            "https://api.taggbox.com/socialwalls-api/v1/user/login",
            {
                data: this.loginPayLoad,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Origin": "https://app.socialwalls.com",
                    "Referer": "https://app.socialwalls.com/",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                },
            }
        );
        const loginResponseJson = await loginResponse.json();
        if (loginResponseJson.responseCode !== 200 || loginResponseJson.responseStatus !== 'success') {
            console.error("❌ Login API failed:", loginResponseJson);
            throw new Error(`Login failed: ${loginResponseJson.responseMessage || 'Unknown error'}`);
        }

        const token = loginResponseJson?.responseData?.token;
        if (!token) {
            console.error("❌ Token not found in login response:", loginResponseJson);
            throw new Error("Token not found in the response");
        }
        console.log("✅ Token successfully received");
        return token;
    }
}

export default APiUtils;
