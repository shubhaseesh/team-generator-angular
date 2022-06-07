import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'teamapp';
  newMemberName = '';
  members: string[] = [];
  errormessage = '';
  numberOfTeams: number | '' = '';
  teams: string[][] = [];

  onNumberOfTeamsInput(value: string) {
    this.numberOfTeams = Number(value);
  }

  onInput(memeber: string) {
    this.newMemberName = memeber;
    this.errormessage = '';
  }
  onAddMember() {
    if (!this.newMemberName) {
      this.errormessage = "Name can't be empty !";
      return;
    }
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  generateTeams() {
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errormessage = "Invalid number of teams"
      return;
    }

    if(this.members.length < this.numberOfTeams ){
      this.errormessage = 'not enough members'
      return;
    }
    this.errormessage = '';
    const allMembers = [...this.members];

    while(allMembers.length){
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];

        if(!member) break;

        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }
    this.numberOfTeams = '';
    this.members = [];
    console.log(this.teams)
  }
}
