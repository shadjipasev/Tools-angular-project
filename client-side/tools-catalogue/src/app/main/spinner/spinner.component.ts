import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent implements OnInit {
  constructor(public loader: LoaderService) {}
  ngOnInit(): void {}
}
