import { Component, OnInit } from '@angular/core';

import { ITool } from 'src/app/shared/interfaces/Tool';
import { ToolService } from '../services/tool/tool.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private toolService: ToolService) { }

  tools: any = null 

  ngOnInit(): void {
    this.toolService.getAll().subscribe(res => {
      this.tools = res;
      console.warn(this.tools),
      (error: any) => console.log(error);
    })
  }

  

}
