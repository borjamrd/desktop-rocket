import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotionService } from '@modules/notion/services/notion.service';
import { NotionBlock, NotionDatabaseItem } from '../../types/notion.interface';
import { NotionBlockComponent } from '../notion-block/notion-block.component';
import { NotionPageHeaderComponent } from '../notion-page-header/notion-page-header.component';

@Component({
  selector: 'bm-notion-page',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NotionBlockComponent,
    CommonModule,
    NotionPageHeaderComponent
  ],
  templateUrl: './notion-page.component.html',
  styleUrl: './notion-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col max-w-5xl'
  }
})
export class NotionPageComponent implements OnChanges {


  private destroyRef = inject(DestroyRef);
  private notionService: NotionService = inject(NotionService);
  private cdr = inject(ChangeDetectorRef);

  public item = input.required<NotionDatabaseItem>();
  public notionBlocks: NotionBlock[] = [];
  public iconPage = signal<string | undefined>(undefined)

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      this.loadPageElements();
    }

  }
  loadPageElements() {

    this.notionService.getPageElements(this.item().id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((blocks) => {
        this.notionBlocks = blocks;
        if (this.notionBlocks.find((block) => block.type === 'page')) {
          const pageBlock = this.notionBlocks.find((block) => block.type === 'page') as NotionBlock;
          this.iconPage.set(pageBlock.format?.page_icon);
        }
      });
  }

  getchildContent(id: string): NotionBlock {
    return this.notionBlocks.find(block => block.id === id) as NotionBlock;

  }
}
