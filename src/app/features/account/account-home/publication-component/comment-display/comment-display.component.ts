import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {EventCommentService} from "../../../../../core/services/event-comment.service";
import {Event} from "../../../../../core/model/event";
import {DateService} from "../../../../../core/services/util/date.service";
import {FormControl, FormGroup} from "@angular/forms";
import {EventComment} from "../../../../../core/model/eventComment";
import {takeUntil} from "rxjs/operators";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {ConfirmationDialogComponent} from "../../../../../shared/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-comment-display',
  templateUrl: './comment-display.component.html',
  styleUrls: ['./comment-display.component.scss']
})
export class CommentDisplayComponent implements OnInit, OnDestroy {
  @Input() event: Event;
  @Input() secretUserId: string;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private dateService: DateService,
              private eventCommentService: EventCommentService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    console.log(this.event);
  }

  confirmDeleteComment(element: EventComment, index): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Confirm',
        message: 'Are you sure you want to delete this comment ',
        value: '',
        cancelLabel: 'No',
        confirmationLabel: 'Yes'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteComment(element.eventCommentId, index);
      }
    });
  }

  deleteComment(eventCommentId, index) {
    this.eventCommentService.deleteEventComment(eventCommentId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( value => {
        this.event.eventCommentSet.splice(index, 1);
        if(value) this.openSnackBar('Comment deleted', 'OK');
      },err => {
        console.log(err.error.message);
      });
  }

  openSnackBar(message: string, action: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = "top";
    config.horizontalPosition = "center";
    config.duration = 4000;
    // config.panelClass = result.status === 'success' ? ['snack-bar-success'] : ['snack-bar-danger'];
    this.snackBar.open(message, action, config);
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
