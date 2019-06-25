import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-password-screen',
  templateUrl: './password-screen.component.html',
  styleUrls: ['./password-screen.component.css']
})


export class PasswordScreenComponent implements OnInit {
  constructor(router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.snapshot.paramMap.get('token');
  }

}
