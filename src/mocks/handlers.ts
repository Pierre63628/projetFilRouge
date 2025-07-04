import { rest } from 'msw';
import type { Employee } from "../types/Employee";

let employees: Employee[] = [
  { id: 1, firstName: "Alice", lastName: "Dubois", email: "alice@example.com", password: "password", role: "Game Master" },
  { id: 2, firstName: "Bob", lastName: "Martin", email: "bob@example.com",  password: "password", role: "Manager" },
];

export const handlers = [
  rest.get("/api/employees", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(employees));
  }),

  rest.post("/api/employees", async (req, res, ctx) => {
    const newEmp = await req.json();
    const created = { ...newEmp, id: Date.now() };
    employees.push(created);
    return res(ctx.status(201), ctx.json(created));
  }),

  rest.put("/api/employees/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const updates = await req.json();
    const index = employees.findIndex(e => e.id === parseInt(id as string));
    if (index === -1) return res(ctx.status(404));
    employees[index] = { ...employees[index], ...updates };
    return res(ctx.status(200), ctx.json(employees[index]));
  }),

  rest.delete("/api/employees/:id", (req, res, ctx) => {
    const { id } = req.params;
    employees = employees.filter(e => e.id !== parseInt(id as string));
    return res(ctx.status(204));
  }),
];
