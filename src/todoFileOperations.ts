import * as fs from "fs";
import { z } from "zod";

const todoJson = "/tmp/todo.json";
const todoScheme = z.object({
  id: z.number(),
  title: z.string(),
  complete: z.boolean(),
});

function init(): void {
  try {
    if (!fs.existsSync("/tmp")) {
      fs.mkdirSync("/tmp");
    }
    fs.accessSync("/tmp");
    if (!fs.existsSync(todoJson)) {
      fs.writeFileSync(todoJson, "[]");
    }
  } catch (e) {
    throw new Error("Could not init todo file");
  }
}
export type Todo = z.infer<typeof todoScheme>;

export function getTodos(): Todo[] {
  try {
    init();

    const data = JSON.parse(fs.readFileSync(todoJson, "utf-8"));
    if (!data) return [];
    const todos = data.map((item: any) => {
      const todo = todoScheme.parse(item);
      return todo;
    });
    return todos;
  } catch (e) {
    console.error(e);
    throw new Error("Could not read todo file");
  }
}

export function writeTodos(todos: Todo[]): void {
  try {
    fs.writeFileSync(todoJson, JSON.stringify(todos));
  } catch (e) {
    throw new Error("Could not write todo file");
  }
}
