import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image, ResOptions, TabView } from 'src/app/models/tabview.model';

@Component({
  selector: 'app-roadmaps',
  templateUrl: './roadmaps.component.html',
  styleUrls: ['./roadmaps.component.scss']
})
export class RoadmapsComponent implements OnInit {

  public headerConfig: any = [];
  public logo: string = "rootbabu.sol";
  public tabConfig: Array<any> = [];
  public images: any[];
  displayCustom: boolean;
  activeIndex: number = 0;
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((ele: any) => {
      this.headerConfig = ele?.headerConfig;
      ele?.tabView?.forEach((tab:any)=>{
        let tooltip = tab?.images?.length;
        let responsiveOptions:Array<ResOptions> = [];
        let images:Array<Image> = [];
        tab?.responsiveOptions?.forEach((res:ResOptions)=>{
          let responsive= new ResOptions(res?.breakpoint, res?.numVisible)
          responsiveOptions.push(responsive);
        });
        tab?.images?.forEach((image:Image)=>{
          let img = new Image(image?.previewImageSrc, image?.thumbnailImageSrc);
          images.push(img);
        })
        this.tabConfig.push(new TabView(tab?.header,tooltip,tab?.activeIndex, tab?.displayCustom, images, tab?.leftIcon, responsiveOptions));
      })
    });
  }

  handleChange(ele:any){
    this.activeIndex = 0;
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }
}
