import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface SignupRequest {
	username: string;
	email: string;
	password: string;
}

export interface SignupResponse {
	username: string;
	email: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private http = inject(HttpClient);
	private apiUrl = environment.apiUrl;

	signup(data: SignupRequest): Observable<SignupResponse> {
		return this.http.post<SignupResponse>(`${this.apiUrl}/auth/signup`, data);
	}
}
