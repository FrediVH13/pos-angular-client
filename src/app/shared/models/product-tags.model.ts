import { Tag } from './tag.model';

export class ProductTags {
  constructor(public id: number, public tags: Tag[]) {}
}
