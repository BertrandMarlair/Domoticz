import { AuthenticationError } from "apollo-server-express";
import { verify } from "jsonwebtoken";
import getPublicKey from "./getPublicKey";

export const checkAuthAccessToken = async (accessToken) => {
    try {
        if (!accessToken) {
            throw new AuthenticationError(
                "You must supply a JWT for authorization.",
            );
        }
    
        const publicKey = await getPublicKey();

        try {
            return verify(accessToken.replace("Bearer ", ""), publicKey, {algorithm: ["RS256"]});
        } catch (err) {
            console.log(err);
            throw new AuthenticationError("Invalid JWT");
        }

    } catch (err) {
        console.log(err);
        throw new AuthenticationError("invalid jwt");
    }
};