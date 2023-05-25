interface StackInterface {
    readonly items: number[];
    pushItem(item: number): void;
    popItem(): number | undefined;
  }
  
  function createStack(): StackInterface {
    return {
      items: [],
      pushItem(item: number): void {
        this.items.push(item);
      },
      popItem(): number | undefined {
        return this.items.pop();
      },
    };
  }
  
  const stack: StackInterface = createStack();
  stack.pushItem(10);
  stack.pushItem(5);
  stack.popItem();
  
  console.log(stack.items);
  stack.items = [10, 100, 1000];