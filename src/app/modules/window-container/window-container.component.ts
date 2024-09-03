import { DragDropModule } from '@angular/cdk/drag-drop';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, HostListener, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FileExplorerService } from 'app/shared/services/file-explorer.service';
import { SystemElement } from 'app/shared/types/system-element.type';
import { maxZIndex } from 'app/shared/utils/utils';
import { CellContainerComponent } from '../../shared/components/cell-container/cell-container.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FocusDialogDirective } from 'app/shared/directives/focus-dialog.directive';


//TODO type
export interface DialogData {
  id: SystemElement['id'];
  icon: string;
  name: string;
  component: any;
  inputs: any
}


@Component({
  selector: 'bm-window-container',
  standalone: true,
  imports: [
    MatIconModule,
    DragDropModule,
    CommonModule,
    AsyncPipe,
    CellContainerComponent,
    MatDialogModule,
    FocusDialogDirective
  ],

  templateUrl: './window-container.component.html',
  styleUrl: './window-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class WindowContainerComponent {

  public dialogRef: MatDialogRef<WindowContainerComponent> = inject(MatDialogRef);
  private fileExplorerService: FileExplorerService = inject(FileExplorerService);
  public isFullScreen: boolean = false

  public data = inject(MAT_DIALOG_DATA);


  handleHide(): void {
    this.dialogRef.close();
  }

  onResizeButtonClicked() {

    this.isFullScreen = !this.isFullScreen;

    if (this.isFullScreen) {

      this.dialogRef.removePanelClass('not-fullscreen');
      this.dialogRef.addPanelClass('fullscreen');
      this.dialogRef.updatePosition({ top: '0px', left: '0px' });
      this.dialogRef.updateSize('100vw', '100vh');

    } else {

      this.dialogRef.removePanelClass('fullscreen');
      this.dialogRef.addPanelClass('not-fullscreen');
      this.dialogRef.updateSize('800px', '600px');

    }



  }
  handleClose() {
    this.dialogRef.close();
    this.fileExplorerService.closeFolder(this.data.id)
  }



}
