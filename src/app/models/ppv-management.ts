export interface PPVManagement {
    ppvId: string;
    ppvName: string;
    ppvMonth: number;
    showId: string;
    showName: string;
    ppvOrder: number;
    isActive: boolean;
}

export interface AddPPVManagement {
    ppvName: string;
    ppvMonth: number;
    showId: string;
}

export interface UpdatePPVManagement {
    ppvId: string;
    ppvName: string;
    ppvMonth: number;
    showId: string;
    ppvOrder: number;
    isActive: boolean;
}