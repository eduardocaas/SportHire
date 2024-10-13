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
  stateControl = new FormControl('', [Validators.required]);
  cityControl = new FormControl('', [Validators.required]);

  sportOptions: string[] = ['Basquete', 'Futebol', 'Futsal', 'Vôlei', 'Vôlei de praia'];
  sportFilteredOptions: Observable<string[]> = new Observable<string[]>;

  stateOptions: string[] = ['RS'];
  stateFilteredOptions: Observable<string[]> = new Observable<string[]>;

  cityOptions: string[] = ['Porto Alegre', 'Canoas'];
  cityFilteredOptions: Observable<string[]> = new Observable<string[]>;

  ngOnInit() {
    this._createFilters();
  }

  private _createFilters() {
    this.sportFilteredOptions = this.sportControl.valueChanges.pipe(
      startWith(''),
      map(value => this._sportFilter(value || '')),
    );

    this.stateFilteredOptions = this.stateControl.valueChanges.pipe(
      startWith(''),
      map(value => this._stateFilter(value || ''))
    );

    this.cityFilteredOptions = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this._cityFilter(value || ''))
    );
  }

  private _sportFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.sportOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _stateFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.stateOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _cityFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cityOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  getErrorMessageSport() {
    return this.sportControl.hasError('required') ? 'Selecione um esporte' : '';
  }

  getErrorMessageState() {
    return this.stateControl.hasError('required') ? 'Selecione um estado' : '';
  }

  getErrorMessageCity() {
    return this.cityControl.hasError('required') ? 'Selecione uma cidade' : '';
  }
}
