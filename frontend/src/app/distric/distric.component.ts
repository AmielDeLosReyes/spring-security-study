import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../service/master.service';
import { APIResponseModel, IDistrict } from '../model/interface/state';

@Component({
  selector: 'app-distric',
  standalone: true,
  imports: [],
  templateUrl: './distric.component.html',
  styleUrl: './distric.component.scss'
})
export class DistricComponent implements OnInit {

  masterService = inject(MasterService);

  districtList: IDistrict[] = [];

  ngOnInit(): void {
    this.loadDistricts();
  }

  loadDistricts() {
    this.masterService.getDistricts().subscribe((result: APIResponseModel) =>  {
      this.districtList = result.data;
    })
  }
  
  
}
