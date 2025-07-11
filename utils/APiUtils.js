// APiUtils.js
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

        if (loginResponseJson.status !== 200 && loginResponseJson.response_code !== 200) {
            console.error("❌ Login API failed:", loginResponseJson);
            throw new Error(`Login failed: ${loginResponseJson.response_message || 'Unknown error'}`);
        }

        const token = loginResponseJson?.responseData?.token;

        if (!token) {
            console.error("❌ Token not found in login response:", loginResponseJson);
            throw new Error("Token not found in the response");
        }

        console.log("✅ Token successfully received");
        return token;
    }

    async getWallId(token, retries = 3, delay = 5000) {
        if (!token) {
            throw new Error("Token is required to fetch Wall ID");
        }

        for (let attempt = 1; attempt <= retries; attempt++) {
            const wallResponse = await this.apiContext.get('https://api.taggbox.com/api/v1/dashboard/loadhome', {
                headers: {
                    // FIX: Use backticks for template literal in Authorization header
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Origin": "https://app.taggbox.com",
                    "Referer": "https://app.taggbox.com/",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                },
            });

            const wallData = await wallResponse.json();
            // Log the full response for debugging
            console.log(`Wall ID API Response (Attempt ${attempt}):`, JSON.stringify(wallData, null, 2));

            // Try ActiveWallsId
            let wallId = wallData?.responseData?.ActiveWallsId;

            // Fallback: if no ActiveWallsId, try first wall in allWalls array
            if (!wallId && wallData?.responseData?.allWalls?.length > 0) {
                wallId = wallData.responseData.allWalls[0].id;
                console.warn("⚠️ Using fallback wallId from allWalls:", wallId);
            }

            if (wallId) {
                console.log(`✅ Wall ID found: ${wallId}`);
                return wallId;
            }

            // Retry
            if (attempt < retries) {
                console.warn(`⚠️ Wall ID not found. Retrying in ${delay}ms... [Attempt ${attempt}]`);
                await new Promise(res => setTimeout(res, delay));
            } else {
                throw new Error("Wall ID not found in response after retries");
            }
        }
    }
}

module.exports = { APiUtils };
