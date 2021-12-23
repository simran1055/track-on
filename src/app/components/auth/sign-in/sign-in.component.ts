import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  submit = false;
  singInForm: FormGroup;

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
    this.singInForm = this.formBuilder.group({
      // name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    })

  }
  get email() { return this.singInForm.get('email') }
  get password() { return this.singInForm.get('password') }
  // get name() { return this.singInForm.get('name') }

  loginFn() {
    if (this.singInForm.invalid) {
      this.submit = true;
      this.toastr.error("Fill the required fields!!")
    } else {
      let payload = {
        email: this.singInForm.value.email,
        password: this.singInForm.value.password
      }
      this.apiService.postApiFn(`/sign-in`, payload).subscribe((res: any) => {
        let { token, user } = res;
        if (token) {
          localStorage.setItem('access_token', token);
          localStorage.setItem('user', user);
          this.router.navigate(['project'])
        }
      }, error => this.toastr.error(error))
    }
  }
}
