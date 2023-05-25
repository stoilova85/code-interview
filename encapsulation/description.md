<style>
r { color: Red }
o { color: Orange }
g { color: Green }
</style>

# Inconsistent type usage, Excessive mutability,Magic number/string

## 🔊 
<r>When a function is declared globally, its code, along with any associated data or variables, is allocated on the memory heap. This allows the function to be accessed and called from anywhere within the program. Global functions are typically defined outside of any specific block or scope, making them accessible throughout the entire program. Since functions declared globally reside in the memory heap, they have a longer lifetime compared to functions declared within a specific scope or block. They persist in memory throughout the execution of the program, making them available for repeated use across multiple scopes or modules. excessive use of global functions can lead to potential drawbacks. It can increase the risk of naming conflicts, where different functions or variables have the same name. Additionally, global functions can hinder code modularity and encapsulation, as they are not confined to specific scopes or modules.</r>

> <o>📝 The use of an arrow function (=>) is valid, but it's important to consider the context and convention of the codebase. If the rest of the codebase uses regular function declarations, it might be better to stick with that convention for consistency. </o>

## **What else you should notice**



<table>
<tr>
<th style="width:50%">Smell Code</th>
<th style="width:50%">Refactored Code</th>
</tr>
<tr>
<td>
  
```js
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
stack.popItem(); // => 5

console.log(stack.items); // => [10]
stack.items = [10, 100, 1000]; // Compilation error - Cannot assign to 'items' because it is a read-only property

```
  
</td>
<td>

```js
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
```

</td>
</tr>
</table>

