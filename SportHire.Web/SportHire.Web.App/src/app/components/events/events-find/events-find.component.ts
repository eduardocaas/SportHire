import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-events-find',
  templateUrl: './events-find.component.html',
  styleUrl: './events-find.component.css'
})
export class EventsFindComponent implements OnInit {

  sportControl = new FormControl('', [Validators.required]);

  sportOptions: string[] = ['One', 'Two', 'Three'];
  sportFilteredOptions: Observable<string[]> = new Observable<string[]>;

  ngOnInit() {
    this.sportFilteredOptions = this.sportControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.sportOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  getErrorMessageSport() {
    return this.sportControl.hasError('required') ? 'Selecione um esporte' : '';
  }
}
