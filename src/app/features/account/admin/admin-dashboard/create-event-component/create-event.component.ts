import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from "../../../../../core/validators/validation.service";
import {EventService} from "../../../../../core/services/event.service";


@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit, OnDestroy {

  public disabled = true;
  public showSpinners = true;
  public minDate: Date;
  public maxDate: Date;
  public stepHour = 1;
  public stepMinute = 1;


  @Input() accountId: string;
  isLinear = true;
  eventDataForm: FormGroup;
  invitedUserDataForm: FormArray;

  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.prepareEventDataFormGroup();
    this.prepareInvitedUsersDataFormGroup();
  }


  private prepareEventDataFormGroup() {
    this.eventDataForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      eventDate: new FormControl('', [
        Validators.required,
      ])
    });
  }

  private prepareInvitedUsersDataFormGroup() {
    this.invitedUserDataForm = new FormArray([]);
  }

  onSubmit() {
    this.eventDataForm.addControl(
      'associations',
      this.formBuilder.array(this.invitedUserDataForm.value));
    this.eventService.createEvent(this.eventDataForm.value).subscribe(
      data => {
      },
      err => {
      }
    );
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
