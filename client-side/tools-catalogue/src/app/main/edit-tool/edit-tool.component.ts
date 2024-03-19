import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool/tool.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-tool',
  templateUrl: './edit-tool.component.html',
  styleUrls: ['./edit-tool.component.css'],
})
export class EditToolComponent implements OnInit {
  form: any = FormGroup;
  toolId: any;
  toolValues: any;

  shortLink: string = '';
  loading: boolean = false;
  file: File = null as any;

  constructor(
    private toolService: ToolService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.toolId = this.route.snapshot.params['id'];

    this.toolService.getById(this.toolId).subscribe((res) => {
      this.toolValues = res;
      this.form.patchValue({
        name: this.toolValues.toolName,
        material: this.toolValues.material,
        country: this.toolValues.country,
        price: this.toolValues.price,
        imgUrl: this.toolValues.imgUrl,
        modelUrl: this.toolValues.modelUrl,
        description: this.toolValues.description,
        selectType: this.toolValues.type,
      });
    });

    this.form = this.fb.group({
      name: ['', Validators.required],
      material: ['', Validators.required],
      country: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9./]*$')]],
      imgUrl: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
          ),
        ],
      ],
      modelUrl: [''],
      description: ['', Validators.required],
      selectType: ['', Validators.required],
    });
  }

  get fc() {
    return this.form.controls;
  }

  onEdit() {
    if (this.form.invalid) {
      return;
    }

    const fv = this.form.value;

    const tool = {
      name: fv.name,
      material: fv.material,
      country: fv.country,
      price: fv.price,
      imgUrl: fv.imgUrl,
      modelUrl: fv.modelUrl,
      description: fv.description,
      type: fv.selectType,
    };

    // this.onUpload();

    this.toolService.editTool(this.toolId, tool).subscribe((res) => {
      console.log(`${res} ----> onEdit`),
        (error: any) => console.log('Error', error);
    });
    this.router.navigateByUrl(`/data/details/${this.toolId}`),
      console.warn(this.toolId);
  }

  fileName = '';
  onChange(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
  }

  // onUpload() {
  //   this.loading = !this.loading;
  //   console.log(this.file);
  //   this.toolService.upload(this.file).subscribe((event: any) => {
  //     if (typeof event === 'object') {
  //       // Short link via api response
  //       this.shortLink = event.link;

  //       this.loading = false; // Flag variable
  //     }
  //   });
  // }
}
