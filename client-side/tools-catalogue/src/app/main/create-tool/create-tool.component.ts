import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool/tool.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEvent } from '@angular/common/http';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-create-tool',
  templateUrl: './create-tool.component.html',
  styleUrls: ['./create-tool.component.css'],
})
export class CreateToolComponent implements OnInit {
  form: any = FormGroup;

  percentDone: any = 0;
  preview: string;
  fileName: string = '';
  toolID: string;

  constructor(
    private toolService: ToolService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {}

  get fc() {
    return this.form.controls;
  }

  ngOnInit(): void {
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
      modelUrl: ['', Validators.required],
      modelFile: ['', Validators.required],
      description: ['', Validators.required],
      selectType: ['', Validators.required],
    });
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement as any).files[0];
    this.form.patchValue({
      modelFile: file,
    });
    this.form.get('modelFile').updateValueAndValidity();
    this.fileName = file.name;

    // File Preview
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.preview = reader.result as string;
    // };
    // reader.readAsDataURL(file);
  }

  onCreate() {
    const fv = this.form.value;

    if (fv.modelFile == '') {
      this.dialog.open(ErrorComponent, {
        data: { message: 'Please upload file!' },
      });
    }

    if (this.form.invalid) {
      return;
    }

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

    console.log(fv.modelFile);

    this.toolService.createTool(tool, fv.modelFile).subscribe((res) => {
      console.log(res.newToolId + ' ---- >tool ID');
      this.toolID = res.newToolId;
      // .subscribe( => {
      // console.log('Console log event = ' + event);
      // switch (event.type) {
      //   case HttpEventType.Sent:
      //     console.log('Request has been made!');
      //     break;
      //   case HttpEventType.ResponseHeader:
      //     console.log('Response header has been received!');
      //     break;
      //   case HttpEventType.UploadProgress:
      //     if (event.total) {
      //       // const total: number = event.total;
      //       this.percentDone = Math.round((event.loaded / event.total) * 100);
      //       console.log(`Uploaded! ${this.percentDone}%`);
      //     } else {
      //       console.log('Illeagal State');
      //     }
      //     break;
      //   case HttpEventType.Response:
      //     console.log('User successfully created!', event.body);
      //     this.percentDone = false;
      //     this.router.navigate(['users-list']);
      // }
      this.router.navigateByUrl('data/details/' + this.toolID);
    });

    // console.warn(tool)
  }
}
