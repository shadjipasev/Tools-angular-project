import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolService } from '../services/tool/tool.service';

@Component({
  selector: 'app-catalog-hand-tools',
  templateUrl: './catalog-hand-tools.component.html',
  styleUrls: ['./catalog-hand-tools.component.css']
})
export class CatalogHandToolsComponent implements OnInit {

  constructor(private toolService:ToolService, private router: Router) { }

  tools: any;

  ngOnInit(): void {
    this.toolService.getToolsByType('Hand tools').subscribe(res => {
      this.tools = res,
      (error: any) => console.log(error);
    })
  }

}
