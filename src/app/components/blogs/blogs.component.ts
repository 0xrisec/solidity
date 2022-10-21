import { Component, OnInit, ViewChild } from '@angular/core';
import { Blog } from './blog';
import { BlogService } from './blogservice';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { faBlog, faHouseChimney } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  providers: [BlogService]
})
export class BlogsComponent implements OnInit {

  blogs: Blog[]=[];
  public logo:string="rootbabu.sol"; 
  tags: any[]=[];
  public faHome:any;
  loading: boolean = true;
  public faBlog:any;
  @ViewChild('dt') table: Table | undefined;

  constructor(private blogService: BlogService, private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.faBlog = faBlog;
    this.faHome = faHouseChimney;
      this.blogService.getBlogs().then(blogs => {
          this.blogs = blogs;
          this.loading = false;
      });

      this.tags = [
          {label: 'Basic', value: 'basic'},
          {label: 'Intermediate', value: 'intermediate'},
          {label: 'Advanced', value: 'advanced'},
          {label: 'Bug', value: 'bug'},
          {label: 'Prerequisite', value: 'prerequisite'}
      ]
      this.primengConfig.ripple = true;
  }

  onDateSelect(value:any) {
    if(this.table){
      this.table.filter(this.formatDate(value), 'date', 'equals')
    }
  }

  formatDate(date:any) {
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) {
          month = '0' + month;
      }

      if (day < 10) {
          day = '0' + day;
      }

      return date.getFullYear() + '-' + month + '-' + day;
  }

}
