import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ToolService } from '../services/tool/tool.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  tool: any;
  toolId: any;

  constructor(private toolService: ToolService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.toolId = this.route.snapshot.params['id']

    this.toolService.getById(this.toolId).subscribe(res => {
      this.tool = res;
      console.log(this.tool),
      (error: any) => console.log(error);
    })
  }


}
