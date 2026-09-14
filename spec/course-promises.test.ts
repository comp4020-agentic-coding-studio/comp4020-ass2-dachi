import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
  spec?: string[];
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const byType = (type: string) => api.nodes.filter((node) => node.type === type);

describe("course promises", () => {
  it("weights the four assessments to exactly 100", () => {
    const total = byType("assessments").reduce(
      (sum, node) => sum + Number(node.meta?.weight ?? 0),
      0,
    );
    expect(total).toBe(100);
  });

  it("gives every studio session a checkable contract", () => {
    for (const node of byType("sessions")) {
      expect(node.spec?.length ?? 0, `${node.id} has no spec lines`).toBeGreaterThan(0);
    }
  });

  it("runs the twelve studio sessions in calendar order", () => {
    const sessions = byType("sessions").sort(
      (a, b) => Number(a.meta?.week) - Number(b.meta?.week),
    );
    expect(sessions).toHaveLength(12);
    for (let i = 1; i < sessions.length; i++) {
      const prev = String(sessions[i - 1].meta?.date);
      const curr = String(sessions[i].meta?.date);
      expect(curr > prev, `${sessions[i].id} does not come after ${sessions[i - 1].id}`).toBe(
        true,
      );
    }
  });

  it("ships at least one lecture with a real, built slide deck", () => {
    const withSlides = byType("lectures").filter((node) => typeof node.meta?.slides === "string");
    expect(withSlides.length).toBeGreaterThan(0);
    for (const node of withSlides) {
      const slides = node.meta?.slides as string;
      const deckPath = resolve(`dist${slides}index.html`);
      expect(existsSync(deckPath), `${node.id} links a deck that wasn't built: ${slides}`).toBe(
        true,
      );
    }
  });
});
