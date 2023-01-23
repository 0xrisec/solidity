import { Component, HostListener } from '@angular/core';
import { AnchorService } from './service/anchor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rootbabu-sol';
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.anchorService.interceptClick(event);
  }

  constructor(
    private anchorService: AnchorService,
  ) { }
}
