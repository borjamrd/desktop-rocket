import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NotionBlock } from '../../types/notion.interface';
import { NotionBlockCodeComponent } from "../notion-block-code/notion-block-code.component";
import { NotionBlockImageComponent } from "../notion-block-image/notion-block-image.component";
import { NotionBlockTextComponent } from '../notion-block-text/notion-block-text.component';
import { Nl2brPipe } from 'app/shared/pipes/nl2br.pipe';
import { NotionComponent } from "../notion-view/notion.component";
import { SecureResourceUrlPipe } from 'app/shared/pipes/safe-resource-url.pipe';


@Component({
  selector: 'bm-notion-block',
  standalone: true,
  imports: [
    CommonModule,
    Nl2brPipe,
    NotionBlockCodeComponent,
    NotionBlockImageComponent,
    NotionBlockTextComponent,
    NotionComponent,
    SecureResourceUrlPipe
  ],
  templateUrl: './notion-block.component.html',
  styleUrl: './notion-block.component.scss',
})
export class NotionBlockComponent implements OnInit {

  notionBlock = input.required<NotionBlock>();
  previousBlockType = input<NotionBlock['type']>();

  numberedListPosition = 1

  ngOnInit(): void {
    if (this.notionBlock()!.type === 'numbered_list' && this.previousBlockType() === 'numbered_list') {
      this.numberedListPosition = this.numberedListPosition + 1
    } else {
      this.numberedListPosition = 1
    }
  }


}
