import { ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import { faBars, faBox, faChessPawn, faF, faHandsPraying, faInfo, faSignsPost, faXmark } from '@fortawesome/free-solid-svg-icons';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { faDiscord, faGithub, faMedium, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
  public config: NavNode[] = [];
  public breadcrumb: any = [];
  public title: string = "";
  public icon: string = "";
  public githubLink: string = "";
  public markdown = '';
  public previousLink: string = '';
  public defaultGithubLink = "https://github.com/ROOTBABU/solidity/blob/dev/src/assets/markdown/"
  public iconComponents: any = {
    "faBox": faBox,
    "faHandsPraying": faHandsPraying,
    "faSignsPost": faSignsPost,
    "faF": faF,
    "faChessPawn": faChessPawn,
    "faBars": faBars,
    "faGithub": faGithub,
    "faDiscord": faDiscord,
    "faInfo": faInfo,
    "faMedium": faMedium,
    "faTwitter": faTwitter,
    "faXmark": faXmark
  }
  public eleId: string = '';

  constructor(private ngxLoader: NgxUiLoaderService, private route: ActivatedRoute, private viewportScroller: ViewportScroller, private http: HttpClient, private markdownService: MarkdownService) { }

  ngOnInit(): void {
    this.route.data.subscribe((ele: any) => {
      this.config = ele?.topicsList;
      this.dataSource.data = this.config;
      this.title = ele?.title;
      this.icon = ele?.icon;
      this.breadcrumb.push(new Breadcrumb("", "/", "faHouseChimney"));
      this.breadcrumb.push(new Breadcrumb(this.title, ele.url));
      this.contentLink = this.contentLink.concat(ele.file)
      this.previousLink = this.contentLink;
      this.githubLink = this.defaultGithubLink.concat(ele.file);
    });
  }

  onTabClick(ele: any) {
    if (ele) {
      this.contentLink = "./assets/markdown/".concat(ele.file);
      this.githubLink = this.defaultGithubLink.concat(ele.file);
      this.eleId = ele.id;
      if (this.previousLink != this.contentLink) {
        this.ngxLoader.start();
      } else {
        let eleId = document.getElementById(this.eleId);
        if (eleId) {
          eleId.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }

  onLoad() {
    let ele = document.getElementById(this.eleId);
    const element = document.querySelectorAll(".image");
    this.previousLink = this.contentLink;
    let ngxLoader: NgxUiLoaderService = this.ngxLoader;
    let scrollPage = this.scrollPage;
    if (ele) {
      if (element.length) {
        element.forEach((item,index)=>{
          item.addEventListener("load", function () {
            scrollPage(ele, ngxLoader);
          });
        })
      } else {
        scrollPage(ele, ngxLoader);
      }
    }
  }

  scrollPage(ele: any, ngxLoader: NgxUiLoaderService) {
    ele.scrollIntoView({ behavior: 'smooth' });
    ngxLoader.stop();
  }

  onError() {
    console.log("Markdown reedering Error!")
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
