import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITool } from '../../../shared/interfaces/Tool';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private apiUrl = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  createTool(data: any){
    return this.httpClient.post(`${this.apiUrl}/data/create`, data)
  }
}
