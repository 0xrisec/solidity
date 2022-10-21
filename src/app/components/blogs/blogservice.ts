import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog } from './blog';

@Injectable()
export class BlogService {
    constructor(private http: HttpClient) { }

    getBlogs() {
        return this.http.get<any>('assets/config/blogs.json')
            .toPromise()
            .then(res => <Blog[]>res.data)
            .then(data => { return data; });
    }
}