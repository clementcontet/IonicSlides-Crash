import { Component, Input } from '@angular/core';
import { PictureModel } from '../../models/picture.model';

@Component({
    selector: 'picture',
    templateUrl: 'picture.component.html'
})
export class Picture {
    @Input() picture: PictureModel;
    url: String;

    ngOnInit() {
        this.url = "https://farm"
            + this.picture.farm
            + ".staticflickr.com/"
            + this.picture.server
            + "/"
            + this.picture.id
            + "_" + this.picture.secret
            + "_n.jpg"
    }
}
