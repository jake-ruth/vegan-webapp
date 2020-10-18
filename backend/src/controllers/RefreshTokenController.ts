import { RefreshToken } from '../entities/RefreshToken';

export class RefreshTokenController {
    static readRefreshToken = async(refreshToken: string) => {
        const token: RefreshToken | undefined = await RefreshToken.findOne(refreshToken);
        return token;
    }

    static addRefreshToken = async(refreshToken: string) => {
        let token = new RefreshToken();
        token.refreshToken = refreshToken;
        token.save();
    }

    static deleteRefreshToken = async(refreshToken: string) => {
        let token = await RefreshToken.findOne(refreshToken);
        if(token) token.remove();
    }
}