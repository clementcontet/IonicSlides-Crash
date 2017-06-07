import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { NavParams, Slides } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { PictureModel } from '../../models/picture.model';

@Component({
    selector: 'section',
    templateUrl: 'section.component.html'
})
export class Section {
    @ViewChild(Slides) slides: Slides;
    tag: String;
    pictures: Array<PictureModel> = [];
    pendingQuery = false;

    constructor(public navaParams: NavParams, public http: Http) {
        this.tag = navaParams.get("tag");
    }

    ngOnInit() {
        this.http.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=" + this.tag + "&sort=interestingness-desc&api_key=0c731f4470260b5ff4ccc3d519d07697&format=json&nojsoncallback=1&per_page=10")
            .map(response => response.json().photos.photo)
            .subscribe(pictures => this.pictures = pictures);
    }

    slideChanged() {
        let currentIndex = this.slides.getActiveIndex();
        if (currentIndex > this.pictures.length - 5 && !this.pendingQuery) {
            let newPage = this.pictures.length / 10 + 1;

            this.pendingQuery = true;
            this.http.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=" + this.tag + "&sort=interestingness-desc&api_key=0c731f4470260b5ff4ccc3d519d07697&format=json&nojsoncallback=1&per_page=10&page=" + newPage)
                .map(response => response.json().photos.photo)
                .subscribe(pictures => {
                    this.pictures = this.pictures.concat(pictures);
                    this.slides.update();
                    this.pendingQuery = false;
                });
        }
    }
}