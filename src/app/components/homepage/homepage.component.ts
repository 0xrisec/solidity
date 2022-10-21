import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faGithub, faDiscord, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAsterisk, faBlog, faBugs, faChessKing, faChessPawn, faChessQueen, faCircleInfo, faFileAlt, faMap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public faGithub:any;
  public faDiscord:any;
  public faInfo:any;
  public faMedium:any;
  public faTwitter:any;
  public config:any;
  public logo:string="rootbabu.sol"; 
  public icon = [faAsterisk,faChessPawn,faChessQueen,faChessKing,faFileAlt,faBugs,faMap,faBlog]
  
  constructor(private activateRoute: ActivatedRoute, private route:Router) { }
  ngOnInit(): void {
    this.faGithub = faGithub;
    this.faDiscord = faDiscord;
    this.faInfo = faCircleInfo;
    this.faTwitter = faTwitter;
    this.faMedium = faMedium;
    this.activateRoute.data.subscribe((ele:any) => {
      this.config = ele.config;
    });
  }

  onSectionClick(path:string){
    if(path != "#"){
      this.route.navigate([path]);
    }
  }

}
