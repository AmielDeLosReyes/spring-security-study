import { Component, inject, OnInit } from '@angular/core';
import { MasterServiceService } from '../../../service/master-service.service';
import { APIResponseModel, IPatient } from '../../../model/interface/APIResponseModel';

@Component({
  selector: 'app-manage-patient',
  standalone: true,
  imports: [],
  templateUrl: './manage-patient.component.html',
  styleUrl: './manage-patient.component.css'
})
export class ManagePatientComponent implements OnInit {

  masterService = inject(MasterServiceService);

  patientList: IPatient[] = [];

  ngOnInit(): void {
    this.loadAllPatients();
  }

  loadAllPatients() {
    this.masterService.getAllPatients().subscribe(
        (result: APIResponseModel) => {
            console.log('API Response:', result);
            this.patientList = result.data;
        },
        (error) => {
            console.error('Error fetching patients:', error);
        }
    );
}


  onDelete(arg0: number) {
    alert("This is the delete button!");

  }
  onEdit(arg0: number) {
    alert("This is the edit button!");
  }


}
