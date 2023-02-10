import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-box',
  templateUrl: './section-box.component.html',
  styleUrls: ['./section-box.component.scss']
})
export class SectionBoxComponent implements OnInit, OnDestroy {

  @Input() withoutFooterButton = false;
  @Input() section: any = null;
  @Input() iconCls: string = null;
  @Input() color: string = null;
  @Input() text: string = null;
  @Input() redirectLink: string = null;

  alive: boolean;
  isMouseOverBox = false;
 
  constructor(private _router: Router) {
    this.alive = true;
  }

  ngOnInit(): void { }

  redirect() {
    this._router.navigate([`${this.redirectLink}/${this.section.id}`]);
  }

  onMouseOver() {
    this.isMouseOverBox = true;
  }

  onMouseOut() {
    this.isMouseOverBox = false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
