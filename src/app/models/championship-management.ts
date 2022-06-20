//* Championship Management /
export interface ChampionshipManagement {
    championshipId: string;
    championshipName: string;
    championshipTypeId: string;
    championshipTypeName: string;
    superstarId: string;
    superstarName: string;
    showId: string;
    showName: string;
    championshipOrder: number;
    isActive: boolean
}

export interface AddChampionshipManagement {
    championshipName: string;
    championshipTypeId: string;
    superstarId: string;
    showId: string;
    championshipOrder: number;
}

export interface UpdateChampionshipManagement {
    championshipId: string;
    championshipName: string;
    championshipTypeId: string;
    superstarId: string;
    showId: string;
    championshipOrder: number;
    isActive: boolean
}

//* Championship Type Management /
export interface ChampionshipTypeManagement {
    championshipTypeId: string;
    championshipTypeName: string;
    isActive: boolean;
    championshipTypeOrder: number;
}

export interface AddChampionshipTypeManagement {
    championshipTypeName: string;
}

export interface UpdateChampionshipTypeManagement {
    championshipTypeId: string;
    championshipTypeName: string;
    isActive: boolean;
    championshipTypeOrder: number;
}

//* Champions /
export interface ChampionsList {
    championsListShowName: string;
    championsList: ChampionsNested[];
}

export interface ChampionsNested {
    championshipId: string;
    championshipName: string;
    championshipShowId: string;
    championshipTypeId: string;
    championshipTypeName: string;
    championshipTeamName: string;
    superstars: ChampionsSuperstar[];
}

export interface ChampionsSuperstar {
    teamId: string;
    teamName: string;
    superstarId: string;
    superstarName: string;
}
