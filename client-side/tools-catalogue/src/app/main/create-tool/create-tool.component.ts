import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool/tool.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tool',
  templateUrl: './create-tool.component.html',
  styleUrls: ['./create-tool.component.css']
})

export class CreateToolComponent implements OnInit {


  form: any = FormGroup;

  constructor(private toolService: ToolService, private fb: FormBuilder,private router: Router) { }

  get fc() {
    return this.form.controls
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      material: ['', Validators.required],
      country: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9./]*$")]],
      imgUrl: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      description: ['', Validators.required],
      selectType: ['', Validators.required],

    })
  }

  onCreate() {
    if(this.form.invalid) { return }

    const fv = this.form.value

    const tool = {
      name: fv.name,
      material: fv.material,
      country: fv.country,
      price: fv.price,
      imgUrl: fv.imgUrl,
      description: fv.description,
      type: fv.selectType,
    }

    this.toolService.createTool(tool).subscribe(res => {
      console.log(res),
      (error: any) => console.log(error);
    })

      this.router.navigateByUrl('data/catalog')

      

    // console.warn(tool)


  }

  

}
