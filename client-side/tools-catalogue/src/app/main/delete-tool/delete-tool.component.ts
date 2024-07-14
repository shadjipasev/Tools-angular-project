import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolService } from '../services/tool/tool.service';

@Component({
  selector: 'app-delete-tool',
  templateUrl: './delete-tool.component.html',
  styleUrls: ['./delete-tool.component.css'],
})
export class DeleteToolComponent implements OnInit {
  toolId: any;

  constructor(
    private route: ActivatedRoute,
    private toolService: ToolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.toolId = this.route.snapshot.params['id'];

    this.toolService.deleteTool(this.toolId).subscribe((res) => {
      console.log(`${res} ---- DELETED`), (error: any) => console.log(error);
      // this.router.navigateByUrl('data/catalog')
    });
  }
}
