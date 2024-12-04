import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDoTheThing } from "~/challenges/utils";

export function Welcome() {
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState(0);
  const [part2, setPart2] = useState(false);
  const [year, setYear] = useState(2024);
  const [day, setDay] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const doTheThingResult = useDoTheThing(inputString, year, day);
  const doTheThing = doTheThingResult?.doTheThing;
  const doTheThingPart2 = doTheThingResult?.doTheThingPart2;

  const handleClick = () => {
    if (part2 && doTheThingPart2) {
      setError(null);
      setOutput(doTheThingPart2());
    } else if (!part2 && doTheThing) {
      setError(null);
      setOutput(doTheThing());
    } else {
      setError("Function not found.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack direction="row" gap={3}>
        <Select
          label="Year"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2024} disabled={day > 3}>
            2024
          </MenuItem>
        </Select>
        <Select
          label="Day"
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <MenuItem
              key={i + 1}
              value={i + 1}
              disabled={(year === 2024 && i > 2) || i > 19}
            >
              {i + 1}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <FormControlLabel
        control={<Checkbox checked={part2} onChange={() => setPart2(!part2)} />}
        label="Part 2"
      />
      <TextField
        multiline
        rows={10}
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
        sx={{ width: "100%" }}
        error={!!error}
        helperText={error}
      />
      <Button onClick={handleClick} variant="contained" sx={{ margin: 1 }}>
        Do the thing
      </Button>

      <Box>
        <h4 style={{ marginTop: 5 }}>Output: {output}</h4>
      </Box>
    </Box>
  );
}
