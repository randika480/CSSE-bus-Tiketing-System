const mongoose = require("mongoose");

const TerminalSchema = new mongoose.Schema({
  type: {
    // busStation | trainStation
    required: true,
    type: String,
  },
  name: {
    // ex- Colombo | Kurunegala | Kandy
    required: true,
    type: String,
  },
  distanceToOthers: [
    {
      name: String, // ex- can be Colombo | Kurunegala | Kandy (without current terminal name)
      distance: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Terminal = mongoose.model("terminal", TerminalSchema);

module.exports = Terminal;
