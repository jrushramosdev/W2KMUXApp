//* Team Management /
export interface TeamManagement {
    teamId: string;
    teamName: string;
    isActive: string
}

export interface AddTeamManagement {
    teamName: string;
}

export interface UpdateTeamManagement {
    teamId: string;
    teamName: string;
    isActive: string
}

//* Team History /
export interface TeamHistory {
    teamHistoryShowName: string;
    totalMaleMemberCount: number;
    totalFemaleMemberCount: number;
    totalTeamMemberCount: number;
    teamList: TeamHistoryNested[];
}

export interface TeamHistoryNested {
    teamId: string;
    teamName: string;
    teamGender: string;
    teamRole: string;
    teamShowId: string;
    teamCount: number;
    teamChampionship: string;
    superstar: TeamHistorySuperstar[];
}

export interface TeamHistorySuperstar {
    superstarId: string;
    superstarName: string;
    superstarGender: string;
    superstarRole: string;
    superstarShowId: string;
    championshipId: string;
    championshipTypeId: string;
    championshipName: string;
    isActive: boolean;
}
