// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { RealtimeDatabaseService, Volunteer } from '../../realtime-database.service';

// @Component({
//   selector: 'app-volunteer',
//   templateUrl: './volunteer.component.html',
//   styleUrls: ['./volunteer.component.css'],
// })
// export class VolunteerComponent implements OnInit {
//   volunteerForm!: FormGroup;
//   volunteers!: Observable<Volunteer[]>;
//   isFormOpen: boolean = false; 

//   constructor(private fb: FormBuilder, private rtdbService: RealtimeDatabaseService) {}

//   ngOnInit(): void {
//     this.volunteerForm = this.fb.group({
//       name: ['', Validators.required],
//       number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
//       email: ['', [Validators.required, Validators.email]],
//       address: ['', Validators.required],
//       capabilities: ['', Validators.required],
//       tagline: ['', Validators.required],
//     });

//     this.volunteers = this.rtdbService.getVolunteers();
//   }

//   onSubmit(): void {
//     if (this.volunteerForm.valid) {
//       const volunteerData: Volunteer = this.volunteerForm.value;
//       this.rtdbService
//         .addVolunteer(volunteerData)
//         .then(() => {
//           alert('Volunteer successfully registered!');
//           this.volunteerForm.reset(); 
//           this.isFormOpen = false; 
//         })
//         .catch((error: any) => {
//           console.error('Error registering volunteer:', error);
//         });
//     }
//   }

//   toggleFormVisibility(): void {
//     this.isFormOpen = !this.isFormOpen;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-volunteer',
    templateUrl: './volunteer.component.html',
    styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
    volunteers = [
        // Sample data for volunteers (replace with your real data source)
        { name: 'John Doe', number: '1234567890', email: 'john@example.com', address: '123 Elm St', capabilities: 'First Aid, Logistics', tagline: 'Always ready to help!' },
        { name: 'Jane Smith', number: '9876543210', email: 'jane@example.com', address: '456 Pine St', capabilities: 'Medical Assistance', tagline: 'Helping hands make a difference.' },
        { name: 'Mike Johnson', number: '1122334455', email: 'mike@example.com', address: '789 Oak St', capabilities: 'Rescue Operations', tagline: 'Safety first, always!' },
    ];
    filteredVolunteers = [...this.volunteers]; // Initialize with all volunteers
    searchTerm = '';
    isFormOpen = false;
    volunteerForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.volunteerForm = this.fb.group({
            name: [''],
            number: [''],
            email: [''],
            address: [''],
            capabilities: [''],
            tagline: [''],
        });
    }

    ngOnInit(): void {}

    toggleFormVisibility(): void {
        this.isFormOpen = !this.isFormOpen;
    }

    onSubmit(): void {
        if (this.volunteerForm.valid) {
            this.volunteers.push(this.volunteerForm.value);
            this.filteredVolunteers = [...this.volunteers];
            this.volunteerForm.reset();
            this.isFormOpen = false;
        }
    }

    filterVolunteers(): void {
        const term = this.searchTerm.toLowerCase();
        this.filteredVolunteers = this.volunteers.filter(volunteer =>
            volunteer.name.toLowerCase().includes(term) || volunteer.capabilities.toLowerCase().includes(term)
        );
    }
}

