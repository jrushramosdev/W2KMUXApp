//* Match Title Management /
export interface MatchTitleManagement {
    matchTitleId: string;
    matchTitleName: string;
    matchTitleOrder: number;
}

export interface AddMatchTitleManagement {
    matchTitleName: string;
}

export interface UpdateMatchTitleManagement {
    matchTitleId: string;
    matchTitleName: string;
    matchTitleOrder: number;
}

//* Match Type Management /
export interface MatchTypeManagement {
    matchTypeId: string;
    matchTypeName: string;
    matchTypeOrder: number;
}

export interface AddMatchTypeManagement {
    matchTypeName: string;
}

export interface UpdateMatchTypeManagement {
    matchTypeId: string;
    matchTypeName: string;
    matchTypeOrder: number;
}

//* Match Format Management /
export interface MatchFormatManagement {
    matchFormatId: string;
    matchFormatName: string;
    matchTypeId: string;
    matchTypeName: string;
    teamsCount: number;
    handicapCount: number;
    participantCount: number;
    matchFormatOrder: number;
}

export interface AddMatchFormatManagement {
    matchFormatName: string;
    matchTypeId: string;
    teamsCount: number;
    handicapCount: number;
    participantCount: number;
}

export interface UpdateMatchFormatManagement {
    matchFormatId: string;
    matchFormatName: string;
    matchTypeId: string;
    teamsCount: number;
    handicapCount: number;
    participantCount: number;
    matchFormatOrder: number;
}
