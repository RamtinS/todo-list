
export class TodoList {
  private readonly _title: string;
  private _completedItems: string[];
  private _nonCompletedItems: string[];

  constructor(title: string) {
    this._title = title;
    this._completedItems = []
    this._nonCompletedItems = []
  }

  public get title(): string{
    return this._title;
  }

  public get completedItems(): string[] {
    return this._completedItems;
  }

  public get  nonCompletedItems(): string[] {
    return this._nonCompletedItems;
  }

  public addItem(item: string): void {
    this._nonCompletedItems.push(item);
  }

  public moveToCompleted(index: number): void {
    if (index < 0 || index >= this._nonCompletedItems.length) {
      throw new RangeError("Index of item is out of range");
    }

    const item: string = this._nonCompletedItems[index];
    this._nonCompletedItems.splice(index, 1);
    this._completedItems.push(item);
  }

  public moveToNonCompleted(index: number): void {
    if (index < 0 || index > this._completedItems.length) {
      throw new RangeError("Index of item is out of range");
    }

    const item: string = this._completedItems[index];
    this._completedItems.splice(index, 1);
    this._nonCompletedItems.push(item);
  }
}

