import { Component, OnInit } from '@angular/core';
import { faDiscord, faGithub, faGitter, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  public iconComponents: any = {
    "faGithub":faGithub,
    "faDiscord":faDiscord,
    "faInfo":faInfo,
    "faMedium":faMedium,
    "faTwitter":faTwitter,
    "faGitter":faGitter
  }
  ngOnInit(): void {
  }

}
