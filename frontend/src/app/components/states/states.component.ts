import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIResponseModel, IState } from '../model/interface/state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-states',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './states.component.html',
  styleUrl: './states.component.scss'
})
export class StatesComponent implements OnInit {
  // dependency injection
  http = inject(HttpClient);

  // variables
  statesList: IState[] = [];
  
  ngOnInit(): void {
    // alert("Hi from States Component!");
    this.getStates();
  }

  getStates() {
    this.http.get<APIResponseModel>('/api/Annadata/GetAllState').subscribe((res: APIResponseModel) => {
      this.statesList = res.data;
    });
  }
  

  
  
}
