export interface PPVMatchLatest {
    ppvMatchCount: number;
    ppvId: string;
    ppvName: string;
    isDone: number;
}

//* Add PPV Match Nested Object /
export interface AddPPVMatch {
    ppvMatchName: string;
    ppvMatchCount: number;
    ppvId: string;
    showId: string;
    matchTitleId: string;
    matchFormatId: string;
    championship: AddChampionship[];
    team: AddTeam[];
}

export interface AddChampionship {
    championshipId: string;
}

export interface AddTeam {
    isChampion: boolean;
    participant: AddParticipant[];
}

export interface AddParticipant {
    superstarId: string;
}