type BusDefinition = {
  id: "NORTH" | "EAST" | "SOUTH" | "WEST"
  target: "J_NORTH" | "U_EAST" | "J_SOUTH" | "U_WEST"
  centralPins: number[]
  targetPins: number[]
}

const verticalPins = (column: number) =>
  Array.from({ length: 8 }, (_, index) => (index + 2) * 12 + column + 1)

const buses: BusDefinition[] = [
  {
    id: "NORTH",
    target: "J_NORTH",
    centralPins: [
      ...Array.from({ length: 8 }, (_, index) => 123 + index),
      ...Array.from({ length: 8 }, (_, index) => 135 + index),
    ],
    targetPins: Array.from({ length: 16 }, (_, index) => index + 1),
  },
  {
    id: "EAST",
    target: "U_EAST",
    centralPins: [...verticalPins(10), ...verticalPins(11)],
    targetPins: [2, 3, 4, 5, 12, 18, 24, 30, 32, 33, 34, 35, 7, 13, 19, 25],
  },
  {
    id: "SOUTH",
    target: "J_SOUTH",
    centralPins: [
      ...Array.from({ length: 8 }, (_, index) => 15 + index),
      ...Array.from({ length: 8 }, (_, index) => 3 + index),
    ],
    targetPins: Array.from({ length: 16 }, (_, index) => index + 1),
  },
  {
    id: "WEST",
    target: "U_WEST",
    centralPins: [...verticalPins(1), ...verticalPins(0)],
    targetPins: [2, 3, 4, 5, 14, 21, 28, 35, 44, 45, 46, 47, 8, 15, 22, 29],
  },
]

export default () => (
  <board
    width="60mm"
    height="60mm"
    layers={4}
    schematicDisabled
    solderMaskColor="blue"
    minTraceWidth="0.08mm"
    minTraceToPadEdgeClearance="0.04mm"
    minPadEdgeToPadEdgeClearance="0.04mm"
    minViaEdgeToPadEdgeClearance="0.04mm"
    minViaHoleDiameter="0.18mm"
    minViaPadDiameter="0.42mm"
  >
    <chip
      name="U_CENTER"
      manufacturerPartNumber="SYNTH-BGA144-P05"
      footprint="bga144_grid12x12_p0.5mm_pad0.24mm_circularpads"
      pcbX={0}
      pcbY={0}
      noSchematicRepresentation
    />

    <connector
      name="J_NORTH"
      manufacturerPartNumber="SYNTH-FFC20-P05"
      footprint="pinrow20_p0.5mm_smd_pw0.25mm_pl1.2mm_nopinlabels"
      pcbX={0}
      pcbY={22}
      pcbRotation={180}
      noConnect={["pin17", "pin18", "pin19", "pin20"]}
      noSchematicRepresentation
    />
    <chip
      name="U_EAST"
      manufacturerPartNumber="SYNTH-DRAM36-P05"
      footprint="bga36_grid6x6_p0.5mm_pad0.24mm_circularpads"
      pcbX={21}
      pcbY={0}
      noSchematicRepresentation
    />
    <connector
      name="J_SOUTH"
      manufacturerPartNumber="SYNTH-FFC24-P04"
      footprint="pinrow24_p0.4mm_smd_pw0.2mm_pl1mm_nopinlabels"
      pcbX={0}
      pcbY={-22}
      pcbRotation={180}
      noConnect={[
        "pin17",
        "pin18",
        "pin19",
        "pin20",
        "pin21",
        "pin22",
        "pin23",
        "pin24",
      ]}
      noSchematicRepresentation
    />
    <chip
      name="U_WEST"
      manufacturerPartNumber="SYNTH-DRAM49-P06"
      footprint="bga49_grid7x7_p0.6mm_pad0.28mm_circularpads"
      pcbX={-21}
      pcbY={0}
      noSchematicRepresentation
    />

    {buses.flatMap((bus) =>
      bus.centralPins.map((centralPinNumber, index) => {
        const centralPin = `U_CENTER.pin${centralPinNumber}`
        const targetPin = `${bus.target}.pin${bus.targetPins[index]}`
        const signalNumber = String(index + 1).padStart(2, "0")

        return (
          <trace
            key={`${bus.id}-${signalNumber}`}
            name={`BUS_${bus.id}_${signalNumber}`}
            from={centralPin}
            to={targetPin}
            thickness="0.09mm"
          />
        )
      }),
    )}

    <silkscreentext
      text="BUS NORTH / 16"
      pcbX={0}
      pcbY={27}
      fontSize={0.7}
      anchorAlignment="center"
    />
    <silkscreentext
      text="BUS EAST / 16"
      pcbX={27}
      pcbY={0}
      pcbRotation={-90}
      fontSize={0.7}
      anchorAlignment="center"
    />
    <silkscreentext
      text="BUS SOUTH / 16"
      pcbX={0}
      pcbY={-27}
      fontSize={0.7}
      anchorAlignment="center"
    />
    <silkscreentext
      text="BUS WEST / 16"
      pcbX={-27}
      pcbY={0}
      pcbRotation={90}
      fontSize={0.7}
      anchorAlignment="center"
    />
  </board>
)
