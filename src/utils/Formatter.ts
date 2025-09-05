export class Formatter {
    private locale: string;

    constructor(locale?: string) {
        this.locale = locale ?? "en-US";
    }

    formatCurrency(amount: number, currency: string): string {
        return new Intl.NumberFormat(this.locale, {
            style: "currency",
            currency,
        }).format(amount);
    }

    formatDate(timestamp: number): string {
        return new Intl.DateTimeFormat(this.locale, {
            year: "numeric",
            month: "short",
            day: "numeric",
        }).format(new Date(timestamp * 1000));
    }

    
    formatDateTime(timestamp: number): string {
        return new Intl.DateTimeFormat(this.locale, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(timestamp * 1000));
    }

    formatNumber(value: number): string {
        return new Intl.NumberFormat(this.locale).format(value);
    }
}