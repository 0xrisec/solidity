import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import { faBars, faBox, faChessPawn, faF, faHandsPraying, faInfo, faSignsPost, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { faDiscord, faGithub, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons';

export class Breadcrumb {
  public label: string = "";
  public url: string = "";
  public icon?: string = "";

  constructor(label: string, url: string, icon?: string) {
    this.label = label;
    this.url = url;
    this.icon = icon;
  }
}

interface NavNode {
  title: string;
  childs?: NavNode[];
  href?: any;
}

@Component({
  selector: 'app-doc',
  templateUrl: './doclayout.component.html',
  styleUrls: ['./doclayout.component.css']
})

export class DocLayoutComponent implements OnInit {
  treeControl = new NestedTreeControl<NavNode>(node => node.childs);
  dataSource = new MatTreeNestedDataSource<NavNode>();
  hasChild = (_: number, node: NavNode) => !!node.childs && node.childs.length > 0;
  public contentLink: string = './assets/markdown/';
  public opened: boolean = true;
  public config: NavNode[] =[];
  public breadcrumb: any = [];
  public title: string = "";
  public icon: string = "";
  public githubLink: string = "";
  public markdown='';
  public defaultGithubLink = "https://github.com/ROOTBABU/solidity/blob/dev/src/assets/markdown/"
  public iconComponents: any = {
    "faBox": faBox,
    "faHandsPraying": faHandsPraying,
    "faSignsPost": faSignsPost,
    "faF": faF,
    "faChessPawn": faChessPawn,
    "faBars": faBars,
    "faGithub":faGithub,
    "faDiscord":faDiscord,
    "faInfo":faInfo,
    "faMedium":faMedium,
    "faTwitter":faTwitter,
    "faXmark":faXmark
  }
  constructor(private route: ActivatedRoute, private viewportScroller: ViewportScroller, private http: HttpClient, private markdownService: MarkdownService) { }

  ngOnInit(): void {
    this.route.data.subscribe((ele: any) => {
      this.config = ele?.topicsList;
      this.dataSource.data = this.config;
      this.title = ele?.title;
      this.icon = ele?.icon;
      this.breadcrumb.push(new Breadcrumb("", "/", "faHouseChimney"));
      this.breadcrumb.push(new Breadcrumb(this.title, ele.url));
      this.contentLink = this.contentLink.concat(ele.file)
      this.githubLink = this.defaultGithubLink.concat(ele.file);
      this.renderMd(this.contentLink,ele?.id)
    });
  }

  onTabClick(ele: any) {
    if (ele) {
        this.contentLink = "./assets/markdown/".concat(ele.file);
        this.githubLink = this.defaultGithubLink.concat(ele.file);
        setTimeout(() => { 
          let eleId = document.getElementById(ele.id);
          if(eleId){
            eleId.scrollIntoView({behavior: 'smooth'});
          }
        }, 60)
        // this.renderMd(this.contentLink,ele.id)
      }
  }

  async renderMd(contentLink:string,id: string){
    let markdownRaw = await this.http.get(contentLink, {
      responseType: 'text'
    }).toPromise();
    if(markdownRaw){
      this.markdown = this.markdownService.parse(markdownRaw);
      let md  = document.getElementById("md");
      if(md){
         this.markdownService.render(md);
      }
      setTimeout(() => { 
        let eleId = document.getElementById(id);
        if(eleId){
          eleId.scrollIntoView({behavior: 'smooth'});
        }
      }, 20)
    }
  }

  onSearch(ele: any) {
    // this.http.get('assets/markdown/helloworld.md', { responseType: 'text' })
    //   .subscribe((data) => {
    //     let d = this.markdownService.parse(data);
    //     console.log(d);
    //   }, (err) => {
    //     console.log(err)
    //   });
  }
}
