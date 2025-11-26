import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AboutService {
	emitter = new BehaviorSubject<number>(0);

	change(value: number): void {
		this.emitter.next(value);
	}
}
