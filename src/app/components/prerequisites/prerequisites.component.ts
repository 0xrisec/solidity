import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faAsterisk, faHouseChimney } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-prerequisites',
  templateUrl: './prerequisites.component.html',
  styleUrls: ['./prerequisites.component.css']
})
export class PrerequisitesComponent implements OnInit {

  public config: any = [];
  public logo: string = "rootbabu.sol";
  public faHome: any;
  public faAsterisk: any;
  public headerConfig:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.faHome = faHouseChimney;
    this.faAsterisk = faAsterisk;
    this.route.data.subscribe((ele: any) => {
      this.config = ele?.topicsList;
      this.headerConfig = ele?.headerConfig;
    });
  }
}
