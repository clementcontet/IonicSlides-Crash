import { Component } from '@angular/core';

import { Section } from '../../components/section/section.component';

@Component({
    selector: 'homepage',
    templateUrl: 'homepage.page.html',
})

// Ionic nested slides doesn't work: https://github.com/driftyco/ionic/issues/10542
export class HomePage {
    sectionComponent1: any;
    sectionComponent2: any;
    sectionComponent3: any;

    constructor() {
        this.sectionComponent1 = Section;
        this.sectionComponent2 = Section;
        this.sectionComponent3 = Section;
    }
}