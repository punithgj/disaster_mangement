// src/app/component/volunteer/volunteer.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RealtimeDatabaseService, Volunteer } from '../../realtime-database.service';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css'],
})
export class VolunteerComponent implements OnInit {
  volunteerForm!: FormGroup;
  volunteers!: Observable<Volunteer[]>;

  constructor(
    private fb: FormBuilder,
    private rtdbService: RealtimeDatabaseService
  ) {}

  ngOnInit(): void {
    this.volunteerForm = this.fb.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      capabilities: ['', Validators.required],
      tagline: ['', Validators.required],
    });

    this.volunteers = this.rtdbService.getVolunteers();
  }

  onSubmit(): void {
    if (this.volunteerForm.valid) {
      const volunteerData: Volunteer = this.volunteerForm.value;
      this.rtdbService
        .addVolunteer(volunteerData)
        .then(() => {
          alert('Volunteer successfully registered!');
          this.volunteerForm.reset();
        })
        .catch((error: any) => {
          console.error('Error registering volunteer:', error);
        });
    }
  }
}
