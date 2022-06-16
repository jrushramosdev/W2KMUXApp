import { Component, OnInit } from '@angular/core';
import { PpvMatchService } from '../../shared/services/ppv-match.service';

@Component({
  selector: 'app-ppv-match',
  templateUrl: './ppv-match.component.html',
  styleUrls: ['./ppv-match.component.scss']
})
export class PpvMatchComponent implements OnInit {

  public ppvmatch: Array<any> = [];

  constructor(private ppvMatchService: PpvMatchService) { }

  ngOnInit(): void {
    this.ppvmatch = this.ppvMatchService.getPPVMatch()
  }

  winner(teamNumber: number, ppvmatchId: number) {   
    
    this.ppvmatch.forEach(ppvmatch => {
      if (ppvmatch.matchId == ppvmatchId) {        
        ppvmatch.matchInfo.forEach((teamArray: { teamParticipant: any, teamNumber: number, isWinner: boolean;  }) => {
          if (teamArray.teamNumber == teamNumber) {
            teamArray.isWinner = true;
          }
          else {
            teamArray.isWinner = false;
          }
        })
      }
    }) 
  }

}
