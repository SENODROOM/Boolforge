// SeqTableData.js
const SeqTableData = {
  sequentialcircuit: {
    headers: ["Property", "Combinational", "Sequential"],
    rows: [
      {
        Property: "Output depends on",
        Combinational: "Current inputs only",
        Sequential: "Inputs + stored state",
      },
      {
        Property: "Memory elements",
        Combinational: "None",
        Sequential: "Flip-flops / Latches",
      },
      {
        Property: "Feedback paths",
        Combinational: "No",
        Sequential: "Yes",
      },
      {
        Property: "Clock required",
        Combinational: "No (usually)",
        Sequential: "Yes (synchronous)",
      },
      {
        Property: "Examples",
        Combinational: "Adder, Mux, Decoder",
        Sequential: "Counter, Register, FSM",
      },
    ],
  },
  SRLatch: {
    headers: ["S", "R", "Q (next)", "Q̄ (next)", "Action"],
    rows: [
      {
        S: "0",
        R: "0",
        "Q (next)": "Q",
        "Q̄ (next)": "Q̄",
        Action: "No change (memory)",
      },
      { S: "1", R: "0", "Q (next)": "1", "Q̄ (next)": "0", Action: "Set" },
      { S: "0", R: "1", "Q (next)": "0", "Q̄ (next)": "1", Action: "Reset" },
      {
        S: "1",
        R: "1",
        "Q (next)": "?",
        "Q̄ (next)": "?",
        Action: "⚠ Forbidden",
      },
    ],
  },
};

export default SeqTableData;
