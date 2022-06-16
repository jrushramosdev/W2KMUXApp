export interface ShowManagement {
    showId: string;
    showName: string;
    showOrder: number;
    isActive: boolean;
}

export interface AddShowManagement {
    showName: string;
}

export interface UpdateShowManagement {
    showId: string;
    showName: string;
    showOrder: number;
    isActive: boolean;
}