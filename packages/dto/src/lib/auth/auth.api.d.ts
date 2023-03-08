export declare const authBaseApiUrl = "/auth";
export declare const authApi: {
    getGoogleLogin: {
        method: "GET";
        path: "/auth/google-login";
        pathParams: string;
        responses: {
            200: string;
            401: string;
            500: string;
        };
        summary: "구글 로그인";
        description: "구글 로그인 후 /google-redirect로 리다이렉트한다.";
    };
    getGoogleRedirect: {
        method: "GET";
        path: "/auth/google-redirect";
        pathParams: string;
        responses: {
            200: string;
        };
        summary: "유저 로그인 후 토큰 리턴";
        description: "유저 관련 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.";
    };
    getVerifyToken: {
        method: "GET";
        path: "/auth/verify-token";
        pathParams: string;
        responses: {
            200: string;
            401: string;
            500: string;
        };
        summary: "토큰 확인(accessToken,refreshToken) 후 갱신된 토큰 리턴";
        description: "갱신된 토큰을 accessToken은 해더로 refreshToken은 쿠키로 보내어진다.";
    };
};
//# sourceMappingURL=auth.api.d.ts.map