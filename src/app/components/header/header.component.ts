import { Component, Input, OnInit } from '@angular/core';
import { faGithub, faDiscord, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCircleInfo, faHome } from '@fortawesome/free-solid-svg-icons';
import { Breadcrumb } from 'src/app/models/breadcrumb.model';

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
  public faHome: any;
  public logo: string = "rootbabu.sol";
  public breadcrumb: Array<Breadcrumb> = [];
  public githubLink:string;
  public defaultGithubLink = "https://github.com/ROOTBABU/solidity/blob/dev/src/assets/"

  @Input() config:any;

  constructor() { }

  ngOnInit(): void {
    this.faGithub = faGithub;
    this.faDiscord = faDiscord;
    this.faInfo = faCircleInfo;
    this.faTwitter = faTwitter;
    this.faMedium = faMedium;
    this.faHome = faHome;
    this.breadcrumb = this.config.breadcrumb;
    this.githubLink = (this.config.file) ? this.defaultGithubLink.concat(this.config.file):"";
  }

}
