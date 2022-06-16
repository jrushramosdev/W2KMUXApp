export interface Superstars {
    superstarId: string;
    superstarName: string;
    gender: string;
    role: string;
    teamId: string;
    teamName: string;
    showId: string;
    showName: string;
    championshipName: string;
    isInjured: boolean;
    isActive: boolean;
}

export interface AddSuperstars {
    superstarName: string;
    gender: string;
    role: string;
    teamId: string;
    showId: string;
    isInjured: boolean;
    isActive: boolean;
}

export interface UpdateSuperstars {
    superstarId: string;
    superstarName: string;
    gender: string;
    role: string;
    teamId: string;
    showId: string;
    isInjured: boolean;
    isActive: boolean;
}