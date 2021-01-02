const setupTokenRefresh = (res) => {
    // Timing to renew access token
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    let refreshTokenTimer;

    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
        console.log('newAuthRes:', newAuthRes);
        console.log('newAuthRes:', newAuthRes);
        // saveUserToken(newAuthRes.access_token):
        refreshTokenTimer = setTimeout(refreshToken, refreshTiming);
    }
    //start first refresh timer
    //eslint-disable-next-line
    refreshTokenTimer = setTimeout(refreshToken, refreshTiming);
}

export default setupTokenRefresh;