import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool/tool.service';

@Component({
  selector: 'app-catalog-machining',
  templateUrl: './catalog-machining.component.html',
  styleUrls: ['./catalog-machining.component.css']
})
export class CatalogMachiningComponent implements OnInit {

  tools: any;

  constructor(private toolService: ToolService) { }

  ngOnInit(): void {
    this.toolService.getToolsByType('Machining').subscribe(res => {
      this.tools = res,
      (error: any) => console.log(error);
    })
  }

}
