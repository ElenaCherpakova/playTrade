"use client";
import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import CardComponent from "../../components/CardComponent";
import SelectComponent from "../../components/SelectComponent";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Market({ id }) {
  const [cards, setCards] = useState([]);

  // useEffect getAllCards
  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch("/api/cards");
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        setCards(data.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }

    fetchCards();
  }, []);

  const category = [" ", "Magic", "Pokemon", "Digimon", "Yu-Gi-Oh!", "Sport Card"];

  const conditions = [" ", "near mint", "excellent", "very good", "poor"]; //Sport Card
  // const conditions1 = ["near mint", "lightly played", "moderately played", "heavily played", "damaged"]; //Other cards

  return (
    <>
      <Box display="flex" flexDirection="column" sx={{ m: 5 }}>
        <Box display="flex" sx={{ gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
          <Box>
            <SelectComponent selectId="category" label="category" options={category} />
            <SelectComponent selectId="conditions" label="conditions" options={conditions} />
          </Box>
          <Grid container alignItems="center" sx={{ alignItems: "center", gap: 1, justifyContent: "center" }}>
            {cards.map(card => (
              <Grid
                item
                key={id}
                xs={12}
                md={4}
                lg={3}
                align="center"
                alignItems="center"
                justifyContent="center"
                sx={{ p: 0, m: 1 }}>
                <CardComponent card={card} key={id} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Stack spacing={2} alignItems="center">
          <Pagination count={10} shape="rounded" />
        </Stack>
      </Box>
    </>
  );
}
