import * as fs from "fs";
import { z } from "zod";

const todoJson = "/tmp/todo.json";
const todoScheme = z.object({
  id: z.number(),
  title: z.string(),
  complete: z.boolean(),
});
export type Todo = z.infer<typeof todoScheme>;

export function getTodos(): Todo[] {
  try {
    if (!fs.existsSync("/tmp")) {
      fs.mkdirSync("/tmp");
    }
    fs.accessSync("/tmp");

    const data = JSON.parse(fs.readFileSync(todoJson, "utf-8"));
    // dataが空の場合は空の配列を返す
    if (!data) return [];
    const todos = data.map((item: any) => {
      const todo = todoScheme.parse(item);
      return todo;
    });
    return todos;
  } catch (e) {
    console.log(e);
    throw new Error("Could not read todo file");
  }
}

export function writeTodos(todos: Todo[]): void {
  try {
    // todosの中身をコンソールに表示
    for (const todo of todos) {
      console.log(todo);
    }
    fs.writeFileSync(todoJson, JSON.stringify(todos));
  } catch (e) {
    throw new Error("Could not write todo file");
  }
}
