import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EventService} from "../../../../../core/services/event.service";
import {takeUntil} from "rxjs/operators";
import {TeamService} from "../../../../../core/services/team.service";
import {Team} from "../../../../../core/model/Team";


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
  teamList: Team[] = [];
  showTeamStep = false;
  radioButtonFormGroup: FormGroup;
  slideToggleFormGroup: FormGroup;
  eventDataForm: FormGroup;
  eventHourAndDatesForm: FormGroup;
  teamDataForm: FormGroup;
  invitedUserDataForm: FormArray;
  repetitiveEvent = false;

  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private eventService: EventService,
              private teamService: TeamService) {
  }

  ngOnInit() {
    this.prepareRadioButtonFormGroup();
    this.prepareSlideToggleFormGroup();
    this.prepareEventDataFormGroup();
    this.prepareTeamDataForm();
    this.prepareInvitedUsersDataFormGroup();
  }

  setSelectedTeam(team: Team) {
    this.teamDataForm.controls['team'].setValue(new Team(team.teamId))
  }

  private prepareRadioButtonFormGroup() {
    this.radioButtonFormGroup = new FormGroup({
      eventCategory: new FormControl('project', [
        Validators.required
      ]),
    });
    this.radioButtonFormGroup.controls['eventCategory'].valueChanges.subscribe(v => {
      if (v === 'team') {
        this.showTeamStep = true;
        if (this.teamList && this.teamList.length === 0) {
          this.teamService.getTeamsByAccountId(this.accountId)
            .pipe(takeUntil(this.ngUnSubscribe))
            .subscribe(teams => this.teamList = teams);
        }
      } else {
        this.showTeamStep = false;
      }
    });
  }

  private prepareSlideToggleFormGroup() {
    this.slideToggleFormGroup = new FormGroup({
      eventRecurrence: new FormControl(false, [
        Validators.required
      ]),
    });
    this.slideToggleFormGroup.controls['eventRecurrence'].valueChanges.subscribe(v => {
      if (v) {
        this.prepareEventDatesFormGroup()
        this.repetitiveEvent = true;
      } else this.repetitiveEvent = false;
    });
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

  private prepareEventDatesFormGroup() {
    this.eventHourAndDatesForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      eventDates: new FormControl('', [
        Validators.required,
      ]),
      eventHour: new FormControl('', [
        Validators.required,
      ])
    });
  }

  private prepareTeamDataForm() {
    this.teamDataForm = new FormGroup({
      team: new FormControl('', [
        Validators.required
      ]),
    });
  }

  private prepareInvitedUsersDataFormGroup() {
    this.invitedUserDataForm = new FormArray([]);
  }

  onSubmit() {
      this.eventDataForm.addControl(
        'associations',
        this.formBuilder.array(this.invitedUserDataForm.value));
      if (this.showTeamStep) {
        this.eventDataForm.addControl(
          'team',
          this.teamDataForm.controls['team']);
      }
    if (!this.repetitiveEvent) {
      this.eventService.createEvent(this.eventDataForm.value).subscribe(
        data => {
        },
        err => {
        }
      );
    } else {
      this.eventDataForm.controls['name'].setValue(this.eventHourAndDatesForm.controls['name'].value);
      this.eventService.createEvents(this.eventDataForm.value,
        this.eventHourAndDatesForm.controls['eventHour'].value,
        this.eventHourAndDatesForm.controls['eventDates'].value).subscribe(
        data => {
        },
        err => {
        }
      );
    }
  }

  setDateList($event) {
    console.log('$event');
    console.log($event);
    this.eventHourAndDatesForm.controls['eventDates'].setValue($event);
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
