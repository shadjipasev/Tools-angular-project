import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITool } from '../../../shared/interfaces/Tool';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  createTool(data: any) {
    return this.httpClient.post<ITool>(`${this.apiUrl}/data/create`, data);
  }

  getAll() {
    return this.httpClient.get<ITool>(`${this.apiUrl}/data/catalog`);
  }

  getById(id: any) {
    return this.httpClient.get<any>(`${this.apiUrl}/data/details/${id}`);
  }

  editTool(id: any, data: any) {
    return this.httpClient.put<any>(`${this.apiUrl}/data/edit/` + id, data);
  }

  deleteTool(id: any) {
    return this.httpClient.get<any>(`${this.apiUrl}/data/delete/` + id);
  }

  getToolsByType(type: string) {
    return this.httpClient.get<any>(`${this.apiUrl}/data/catalog/` + type);
  }
}
