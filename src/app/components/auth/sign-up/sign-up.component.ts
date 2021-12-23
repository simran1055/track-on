import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  submit = false;
  singUpForm: FormGroup;

  constructor(
    private _projectService: ProjectService,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this._projectService.setLoading(false);
  }

  ngOnInit(): void {
    this.singUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    })

  }
  get email() { return this.singUpForm.get('email') }
  get password() { return this.singUpForm.get('password') }
  get name() { return this.singUpForm.get('name') }

  loginFn() {
    if (this.singUpForm.invalid) {
      this.submit = true;
      this.toastr.error("Fill the required fields!!")
    } else {
      // return;
      let payload = {
        email: this.singUpForm.value.email,
        password: this.singUpForm.value.password,
        name: this.singUpForm.value.name
      }
      this.apiService.postApiFn(`/sign-up`, payload).subscribe((res: any) => {
        if (res.message) {
          this.toastr.success(res.message)
          this.router.navigate(['sign-in'])
        }
      }, error => this.toastr.error(error))
    }

  }
}
