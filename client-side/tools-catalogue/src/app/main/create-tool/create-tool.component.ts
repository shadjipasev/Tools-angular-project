import { Component, OnInit } from '@angular/core';
import { ToolService } from '../services/tool/tool.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tool',
  templateUrl: './create-tool.component.html',
  styleUrls: ['./create-tool.component.css']
})

export class CreateToolComponent implements OnInit {


  form: any = FormGroup;

  constructor(private toolService: ToolService, private fb: FormBuilder) { }

  get fc() {
    return this.form.controls
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      material: ['', Validators.required],
      country: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
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
      description: fv.description,
      type: fv.selectType,
    }

    this.toolService.createTool(tool).subscribe(res => {
      console.log(res)
    })

    console.warn(tool)


  }

}
