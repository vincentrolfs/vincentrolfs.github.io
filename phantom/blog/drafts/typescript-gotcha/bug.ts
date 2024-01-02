type Entry = { category: string; score: number; name: string };
type Data = {
  entries: Entry[];
};

const data: Data = {
  entries: [
    { category: "Basketball", score: 100, name: "Michael Jordan" },
    { category: "Tennis", score: 95, name: "Serena Williams" },
    { category: "Soccer", score: 98, name: "Lionel Messi" },
    { category: "Golf", score: 90, name: "Tiger Woods" },
    { category: "Basketball", score: 99, name: "LeBron James" },
    { category: "Soccer", score: 94, name: "Cristiano Ronaldo" },
  ],
};

// Remove the winner from the dataset and return their name
function extractCategoryWinner(data: Data, category: string): string {
  let winner: Entry | undefined = undefined;

  data.entries = data.entries.filter((entry) => {
    // Keep the entry if the category doesn't match, or there is already a winner
    const keepEntry = entry.category !== category || !!winner;

    if (!keepEntry) {
      winner = entry;
    }

    return keepEntry;
  });

  if (!winner) {
    throw new Error(`Found no entries for category ${category}`);
  }

  // Mistake here, should have been winner.name
  return winner;
}

function callOut(name: string) {
  alert(name.toUpperCase());
}

// Should alert "MICHAEL JORDAN"
callOut(extractCategoryWinner(data, "Basketball"));
// Should alert "LEBRON JAMES"
callOut(extractCategoryWinner(data, "Basketball"));
