import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {Event} from "../../../../core/model/event";
import {DateService} from "../../../../core/services/util/date.service";
import {EventWeatherService} from "../../../../core/services/event-weather.service";
import {takeUntil} from "rxjs/operators";
import {TokenStorageService} from "../../../../core/services/token-storage.service";
import {EventWeather} from "../../../../core/model/eventWeather";
import {MatSnackBarConfig} from "@angular/material/snack-bar";
import {EventComment} from "../../../../core/model/eventComment";
import {ConfirmationDialogComponent} from "../../../../shared/confirmation-dialog/confirmation-dialog.component";
import {EventCommentService} from "../../../../core/services/event-comment.service";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit, OnDestroy {

  @Input() event: Event;
  secretUserId: string;
  userId: string;
  dateDifferenceLabel: string;
  stormWeatherNumber: number;
  rainyWeatherNumber: number;
  sunnyCloudWeatherNumber: number;
  sunnyClearWeatherNumber: number;
  sunnyClear = false;
  sunnyCloud = false;
  storm = false;
  rainy = false;
  commentFormGroup: FormGroup;
  showPostItCard = false;
  showInputTextCard = false;
  showComments = false;
  enableAddCommentButton: boolean;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private dateService: DateService,
              private eventWeatherService: EventWeatherService,
              private eventCommentService: EventCommentService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.secretUserId = this.tokenStorageService.getUser().secretId;
    this.userId = this.tokenStorageService.getUser().userId;
    this.sortCommentList();
    this.dateDifference();
    this.getCurrentUserEventWeather();

  }

  private sortCommentList() {
    let commentList = [];
    this.event.eventCommentSet.sort((a, b) => {
      return <any>new Date(b.creationDate) - <any>new Date(a.creationDate);
    }).forEach(event => commentList.push(event));

    this.event.eventCommentSet = commentList;
  }

  dateDifference(){
    this.dateDifferenceLabel =
      this.dateService.dateDiff(this.event.eventDate) + ' ' + this.dateService.dateLabel(this.event.eventDate) + ' ago';
  }

  private getCurrentUserEventWeather() {
    const userEventWeather = this.event.eventWeatherSet.filter(weather => weather.user.secretId === this.secretUserId);
    if(userEventWeather && userEventWeather.length > 0) {
      this.activateSelectedEventWeather(userEventWeather[0]);
      this.setWeatherNumbers();
    }
  }

  private activateSelectedEventWeather(eventWeather: EventWeather) {
    this.sunnyClear = eventWeather.sunnyClear;
    this.sunnyCloud = eventWeather.sunnyCloud;
    this.rainy = eventWeather.rainy;
    this.storm = eventWeather.storm;
  }

  createSunnyClearEventWeather() {
    let eventWeather = new EventWeather();
    eventWeather.sunnyClear = true;
    this.eventWeatherService.createEventWeather(this.userId, this.event.eventId, eventWeather)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( weather => {
        this.manageWeatherEventList(weather);
      });
  }

  createSunnyCloudEventWeather() {
    let eventWeather = new EventWeather();
    eventWeather.sunnyCloud = true;
    this.eventWeatherService.createEventWeather(this.userId, this.event.eventId, eventWeather)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( weather => {
        this.manageWeatherEventList(weather);
      });
  }

  createRainyEventWeather() {
    let eventWeather = new EventWeather();
    eventWeather.rainy = true;
    this.eventWeatherService.createEventWeather(this.userId, this.event.eventId, eventWeather)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( weather => {
        this.manageWeatherEventList(weather);
      });
  }

  createStormEventWeather() {
    let eventWeather = new EventWeather();
    eventWeather.storm = true;
    this.eventWeatherService.createEventWeather(this.userId, this.event.eventId, eventWeather)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( weather => {
        this.manageWeatherEventList(weather);
      });
  }


  private manageWeatherEventList(weather) {
    this.activateSelectedEventWeather(weather);
    this.event.eventWeatherSet =
      this.event.eventWeatherSet.filter(element => element.eventWeatherId != weather.eventWeatherId);
    this.event.eventWeatherSet.push(weather);

    this.setWeatherNumbers();
  }

  private setWeatherNumbers() {
    this.stormWeatherNumber = 0;
    this.rainyWeatherNumber = 0;
    this.sunnyCloudWeatherNumber = 0;
    this.sunnyClearWeatherNumber = 0;
    this.event.eventWeatherSet.forEach(weather => {
      if (weather.storm) {
        this.stormWeatherNumber++;
      } else if (weather.rainy) {
        this.rainyWeatherNumber++;
      } else if (weather.sunnyCloud) {
        this.sunnyCloudWeatherNumber++;
      } else if (weather.sunnyClear) {
        this.sunnyClearWeatherNumber++;
      }
    });
  }

  showPostItComment() {
    this.initInputForm();
    this.showPostItCard = !this.showPostItCard;
    this.showInputTextCard = false;
  }

  private initInputForm() {
    this.enableAddCommentButton = false;
    this.commentFormGroup = new FormGroup({
      comment: new FormControl(),
      red: new FormControl(false),
      green: new FormControl(false),
      blue: new FormControl(false),
      yellow: new FormControl(false)
    });

    this.commentFormGroup.controls['comment'].valueChanges
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
        value.length > 0 ? this.enableAddCommentButton = true :
          this.enableAddCommentButton = false;
      });
  }


  showAndSetGreenCommentCard() {
    this.commentFormGroup.controls['green'].setValue(true);
    this.showAndSetCommentCard();
  }

   showAndSetRedCommentCard() {
    this.commentFormGroup.controls['red'].setValue(true);
    this.showAndSetCommentCard();
  }

   showAndSetBlueCommentCard() {
    this.commentFormGroup.controls['blue'].setValue(true);
    this.showAndSetCommentCard();
  }

   showAndSetYellowCommentCard() {
    this.commentFormGroup.controls['yellow'].setValue(true);
    this.showAndSetCommentCard();
  }

  private showAndSetCommentCard() {
    this.showPostItCard = !this.showPostItCard;
    this.showInputTextCard = !this.showInputTextCard;
    this.showComments = true;
  }

  addComment() {
    this.eventCommentService.createEventComment(this.userId, this.event.eventId, this.commentFormGroup.value)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( comment => {
        this.event.eventCommentSet.unshift(comment);
        this.showInputTextCard = false;
        this.showComments = true;
      });
  }

  autogrow(id) {
    let textArea = document.getElementById(id);
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
