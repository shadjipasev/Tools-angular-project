import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITool } from '../../shared/interfaces/Tool';
import { UserService } from '../services/user/user.service';
import { ToolService } from '../services/tool/tool.service';
@Component({
  selector: 'app-create-tool',
  templateUrl: './create-tool.component.html',
  styleUrls: ['./create-tool.component.css']
})
export class CreateToolComponent implements OnInit {

  constructor(private toolService: ToolService) { }

  

  // onCreateTool():void{
  //   this.toolService.createTool(this.onSubmit).subscribe
  // }

  ngOnInit(): void {
  }

}
