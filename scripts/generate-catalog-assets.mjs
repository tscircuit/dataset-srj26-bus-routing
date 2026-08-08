import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { AutoroutingPipelineSolver } from "@tscircuit/capacity-autorouter";
import { getSvgFromGraphicsObject } from "graphics-debug";
import * as React from "react";
import { RootCircuit, getSimpleRouteJsonFromCircuitJson } from "tscircuit";
import Circuit from "../boards/sample001-four-bus-bga-breakout.circuit";

Object.assign(globalThis, { React });

const circuit = new RootCircuit();
circuit.schematicDisabled = true;
const sourceElement = Circuit();
const unroutedElement = React.cloneElement(sourceElement, {
	routingDisabled: true,
	schematicDisabled: true,
});
circuit.add(unroutedElement);
await circuit.renderUntilSettled();

const { simpleRouteJson } = getSimpleRouteJsonFromCircuitJson({
	circuitJson: circuit.getCircuitJson(),
	minTraceWidth: 0.08,
});
const sample = {
	...simpleRouteJson,
	id: "sample001-four-bus-bga-breakout",
	metadata: {
		title: "Four-bus BGA breakout",
		source: "boards/sample001-four-bus-bga-breakout.circuit.tsx",
	},
};

const sampleUrl = new URL(
	"../samples/sample001-four-bus-bga-breakout.srj.json",
	import.meta.url,
);
await mkdir(dirname(sampleUrl.pathname), { recursive: true });
await Bun.write(sampleUrl, `${JSON.stringify(sample, null, 2)}\n`);

const solver = new AutoroutingPipelineSolver(structuredClone(sample));
const svg = getSvgFromGraphicsObject(solver.visualize(), {
	backgroundColor: "#ffffff",
	svgWidth: 1200,
	svgHeight: 800,
}).replace(/[ \\t]+$/gm, "");
const imageUrl = new URL("../docs/sample.svg", import.meta.url);
await mkdir(dirname(imageUrl.pathname), { recursive: true });
await Bun.write(imageUrl, svg);

console.log(`Wrote ${sampleUrl.pathname}`);
console.log(`Wrote ${imageUrl.pathname}`);
