import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PpvMatchService {

  public ppvmatchArray: Array<any> = [
    { matchId: 1,
      matchName: "Triple Threat Match",
      matchShow: "raw", 
      matchInfo: [
        { teamNumber: 1,
          isWinner: '',
          isChampion: true,
          teamParticipant: [
            { participantName: "Undertaker", participantBelt: "WWE Champion" }
          ] 
        },
        { teamNumber: 2, 
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "Triple H", participantBelt: "" }
          ] 
        },
        { teamNumber: 3,
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "Kane", participantBelt: "" }
          ] 
        }
      ]
    },
    { matchId: 2,
      matchName: "Single Match", 
      matchShow: "smackdown", 
      matchInfo: [
        { teamNumber: 1,
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "Shawn Michaels", participantBelt: "" }
          ] 
        },
        { teamNumber: 2, 
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "Bobby Lashley", participantBelt: "" }
          ] 
        },
      ]
    },
    { matchId: 3,
      matchName: "Tag Team Match", 
      matchShow: "nxt", 
      matchInfo: [
        { teamNumber: 1,
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "The Miz", participantBelt: "" },
            { participantName: "John Morrison", participantBelt: "" }
          ] 
        },
        { teamNumber: 2, 
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "Sheamus", participantBelt: "" },
            { participantName: "Cesaro", participantBelt: "" }
          ] 
        }
      ]
    },
    { matchId: 4,
      matchName: "Battle Royal", 
      matchShow: "all", 
      matchInfo: [
        { teamNumber: 1,
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "The Miz", participantBelt: "" }
          ] 
        },
        { teamNumber: 2, 
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "Sheamus", participantBelt: "" }
          ] 
        },
        { teamNumber: 3,
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "The Miz", participantBelt: "" }
          ] 
        },
        { teamNumber: 4, 
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "Sheamus", participantBelt: "" }
          ] 
        },
        { teamNumber: 5,
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "The Miz", participantBelt: "" }
          ] 
        },
        { teamNumber: 6, 
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "Sheamus", participantBelt: "" }
          ] 
        },
        { teamNumber: 7, 
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "Sheamus", participantBelt: "" }
          ] 
        },
        { teamNumber: 8, 
          isWinner: '',
          isChampion: false,
          teamParticipant: [
            { participantName: "Sheamus", participantBelt: "" }
          ] 
        }
      ]
    }
  ];

  constructor() { }

  getPPVMatch() {
    return this.ppvmatchArray;
  }
}
