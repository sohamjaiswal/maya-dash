export class PhotoBox {
    static getUserAvatar(id: string): string {
        return `https://photobox.cardboard.ink/user/avatar/${id}`;
    }

    static getUserBanner(id: string): string {
        return `https://photobox.cardboard.ink/user/banner/${id}`;
    }

    static getServerIcon(id: string): string {
        return `https://photobox.cardboard.ink/server/icon/${id}`;
    }

    static getServerBanner(id: string): string {
        return `https://photobox.cardboard.ink/server/banner/${id}`;
    }

    static getBotIcon(id: string): string {
        return `https://photobox.cardboard.ink/bot/icon/${id}`;
    }

    static getBotBanner(id: string): string {
        return `https://photobox.cardboard.ink/bot/banner/${id}`;
    }
}