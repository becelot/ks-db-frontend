import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ks-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  @Input()
  public icon = '';

  @Input()
  public name = '';

  constructor() { }

  ngOnInit() {
  }

}
