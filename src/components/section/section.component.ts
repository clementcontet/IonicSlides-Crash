import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { PictureModel } from '../../models/picture.model';

@Component({
    selector: 'section',
    templateUrl: 'section.component.html'
})
export class Section {
    tag: String;
    pictures: Array<PictureModel> = [];
    pendingQuery = false;

    constructor(public navaParams: NavParams, public http: Http) {
        this.tag = navaParams.get("tag");
    }

    ngOnInit() {
        this.http.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=" + "purple" + "&sort=interestingness-desc&api_key=0c731f4470260b5ff4ccc3d519d07697&format=json&nojsoncallback=1&per_page=20")
            .map(response => response.json().photos.photo)
            .subscribe(pictures => this.pictures = pictures);
    }
}