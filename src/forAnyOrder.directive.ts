import {
  ChangeDetectorRef,
  Directive,
  DoCheck,
  IterableDiffer,
  IterableDiffers,
  TemplateRef,
  ViewContainerRef,
  ViewRef
} from '@angular/core';

class NgForRow {
  constructor(public $implicit: any) {}
}

@Directive({
  selector: '[forAnyOrder]',
  inputs: ['forAnyOrderOf']
})
export class ForAnyOrder implements DoCheck {
  private collection:any;
  private differ:IterableDiffer;
  private viewMap:Map<any,ViewRef> = new Map<any,ViewRef>();

  constructor(private changeDetector:ChangeDetectorRef,
              private differs:IterableDiffers,
              private template:TemplateRef<NgForRow>,
              private viewContainer:ViewContainerRef) {
  }

  set forAnyOrderOf(coll: any) {
    this.collection = coll;
    if (coll && !this.differ) {
      this.differ = this.differs.find(coll).create(this.changeDetector);
    }
  }

  ngDoCheck() {
    if (this.differ) {
      const changes = this.differ.diff(this.collection);
      if (changes) {
        changes.forEachAddedItem((change) => {
          const view = this.viewContainer.createEmbeddedView(this.template, new NgForRow(null));
          this.viewMap.set(change.item, view);
          view.context.$implicit = change.item;
        });
        changes.forEachRemovedItem((change) => {
          const view = this.viewMap.get(change.item);
          if (view) {
            const viewIndex = this.viewContainer.indexOf(view);
            this.viewContainer.remove(viewIndex);
            this.viewMap.delete(change.item);
          }
        });
      }
    }
  }

}
