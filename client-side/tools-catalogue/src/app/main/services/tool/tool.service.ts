import { ITool } from 'src/app/shared/interfaces/Tool';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ToolService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  createTool(data: any, modelFile: File): Observable<any> {
    const formData: any = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('modelFile', modelFile);
    console.log(formData);
    return this.httpClient.post<ITool>(`${this.apiUrl}/data/create`, formData);
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

  searchToolByName(query: string) {
    return this.httpClient.get<any>(`${this.apiUrl}/data/search/` + query);
  }

  // downloadFile(fileId: string): Observable<Blob> {
  //   return this.httpClient.get(`${this.apiUrl}/data/download/${fileId} `, {
  //     responseType: 'blob',
  //   });
  // }
  downloadFile(fileId: string): Observable<Blob> {
    // const headers = new HttpHeaders();
    // headers.append('Accept', 'application/octet-stream');
    return this.httpClient.get(`${this.apiUrl}/data/download/${fileId} `, {
      // headers: headers,
      responseType: 'blob',
    });
  }
  // downloadFile(fileId: string): any {
  //   return this.httpClient.get(`${this.apiUrl}/data/download/${fileId}`);
  // }
}
