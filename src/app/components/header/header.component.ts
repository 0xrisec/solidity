import { Component, OnInit } from '@angular/core';
import { faGithub, faDiscord, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public faGithub: any;
  public faDiscord: any;
  public faInfo: any;
  public faMedium: any;
  public faTwitter: any;
  public logo: string = "rootbabu.sol";

  constructor() { }

  ngOnInit(): void {
    this.faGithub = faGithub;
    this.faDiscord = faDiscord;
    this.faInfo = faCircleInfo;
    this.faTwitter = faTwitter;
    this.faMedium = faMedium;
  }

}
