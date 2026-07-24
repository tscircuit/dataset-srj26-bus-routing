# dataset-srj26-bus-routing

Synthetic tscircuit routing dataset for dense buses escaping a central BGA to
fine-pitch connectors and DRAM-style BGAs.

This starter intentionally contains one sample for review:

- `boards/sample001-four-bus-bga-breakout.circuit.tsx`
- 144-pin, 0.5 mm-pitch central BGA
- four 16-signal buses
- 0.4 mm and 0.5 mm-pitch connectors
- 0.5 mm and 0.6 mm-pitch DRAM-style BGAs
- one direct `<trace>` per signal, with no manual `pcbPath` or fixed vias
- the default tscircuit autorouter owns both component breakout and long bus
  routing, including deciding which signals need vias

## Develop

```sh
bun install
bun run typecheck
bun run build
bun run snapshot
```

Additional samples should only be added after `sample001` has been reviewed.
