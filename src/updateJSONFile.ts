import fs from "fs";

// Function to update JSON file with a new entry
const updateJSONFile = (filePath: string, key: string, value: string): void => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    let json: { [key: string]: string } = {};
    try {
      json = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return;
    }

    // Add new entry to JSON data
    json[key] = value;

    // Write updated JSON data back to file
    fs.writeFile(filePath, JSON.stringify(json, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing file:", writeErr);
        return;
      }
      console.log("JSON file updated successfully!");
    });
  });
};

export default updateJSONFile;
