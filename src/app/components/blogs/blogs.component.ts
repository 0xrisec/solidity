import { Component, OnInit, ViewChild } from '@angular/core';
import { Blog } from './blog';
import { BlogService } from './blogservice';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { faBlog, faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { SelectItem, FilterService, FilterMatchMode } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from './DateValidator';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  providers: [BlogService,DateValidator]
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  public logo: string = "rootbabu.sol";
  tags: any[] = [];
  public faHome: any;
  loading: boolean = true;
  public faBlog: any;
  // public range = new FormGroup({
  //   start: new FormControl<Date | null>(null),
  //   end: new FormControl<Date | null>(null),
  // });
  public range :FormGroup;
  public isValidDate:boolean;
  @ViewChild('dt') table: Table;

  constructor(private datepipe:DatePipe, private dateValidator:DateValidator,private blogService: BlogService, private primengConfig: PrimeNGConfig, private filterService: FilterService, private fb: FormBuilder) {
    this.range = this.fb.group({
      start: ['', dateValidator.dateValidator],
      end: ['', dateValidator.dateValidator ]
   });
  }

  ngOnInit() {
    this.faBlog = faBlog;
    this.faHome = faHouseChimney;
    this.blogService.getBlogs().then(blogs => {
      this.blogs = blogs;
      this.loading = false;
    });

    this.tags = [
      { label: 'Basic', value: 'basic' },
      { label: 'Intermediate', value: 'intermediate' },
      { label: 'Advanced', value: 'advanced' },
      { label: 'Bug', value: 'bug' },
      { label: 'Prerequisite', value: 'prerequisite' }
    ]
    this.primengConfig.ripple = true;

    const customFilterName = 'date-range';
    this.filterService.register(customFilterName, (value:any, filter:any): boolean => {
      let dateArray = filter.split("|");
      let start = Date.parse(dateArray[0]);
      let end = Date.parse(dateArray[1]);
      let dataValue = Date.parse(value);
      if(start && end && dataValue>=start && dataValue<=end){
        return true;
      }
      return false;
    });
    this.range.statusChanges.subscribe((ele) =>{
      if(ele==="VALID"){
        const startDate = this.datepipe.transform(this.range.get('start')?.value, 'MM/dd/YYYY');
        const endDate = this.datepipe.transform(this.range.get('end')?.value, 'MM/dd/YYYY');
        if(startDate && endDate){
          let date = startDate.concat("|",endDate);
          this.table.filter(date, 'date', 'date-range');
        }
      } else{
        this.clearFilter('date', 'equals')
      }
    });
  }

  onDateSelect(value: any) {
    if (this.table) {
      this.table.filter("2015-11", 'date', 'date-range');
      // this.table.filter("2015-1", 'date', 'after');
      console.log(this.table)
    }
  }

  formatDate(date: any) {
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

  applyFilterGlobal($event: any, matchMode: string) {
    this.table.filterGlobal(($event.target as HTMLInputElement).value, matchMode);
  }

  applyFilter($event: any, field: string, matchMode: string) {
    this.table.filter(($event.target as HTMLInputElement).value, field, matchMode);
  }

  clearFilter(field: string, matchMode: string) {
    this.table.filter('', field, matchMode);
  }

}
