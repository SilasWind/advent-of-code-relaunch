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

  const { doTheThing, doTheThingPart2, visualization } = useDoTheThing(
    inputString,
    year,
    day
  );

  const handleClick = () => {
    if (part2) {
      setOutput(doTheThingPart2());
    } else {
      setOutput(doTheThing());
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
          onChange={e => setYear(Number(e.target.value))}
        >
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2024} disabled={day > 8}>
            2024
          </MenuItem>
        </Select>
        <Select
          label="Day"
          value={day}
          onChange={e => setDay(Number(e.target.value))}
        >
          {Array.from({ length: 24 }, (_, i) => (
            <MenuItem
              key={i + 1}
              value={i + 1}
              disabled={(year === 2024 && i > 7) || i > 19}
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
        onChange={e => setInputString(e.target.value)}
        sx={{ width: "100%" }}
      />
      <Button onClick={handleClick} variant="contained" sx={{ margin: 1 }}>
        Do the thing
      </Button>

      <Box>
        <h4 style={{ marginTop: 5 }}>Output: {output}</h4>
      </Box>
      <Box>{visualization && visualization()}</Box>
    </Box>
  );
}
