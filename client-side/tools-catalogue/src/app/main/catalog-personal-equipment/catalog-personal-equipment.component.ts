import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool/tool.service';

@Component({
  selector: 'app-catalog-personal-equipment',
  templateUrl: './catalog-personal-equipment.component.html',
  styleUrls: ['./catalog-personal-equipment.component.css'],
})
export class CatalogPersonalEquipmentComponent implements OnInit {
  tools: any;

  constructor(private toolService: ToolService) {}

  ngOnInit(): void {
    this.toolService
      .getToolsByType('Personal/Protective equipment')
      .subscribe((res) => {
        (this.tools = res), (error: any) => console.log(error);
      });
  }
}
