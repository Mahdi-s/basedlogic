const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./collection.db');

db.serialize(function() {
    // Create a new table
    db.run("CREATE TABLE IF NOT EXISTS Topics (topic TEXT, sentence TEXT)");

    // JSON data to insert
    const data = {
      "Climate Change": "Immediate and bold action is required to combat climate change and secure a sustainable future for the next generations.",
      "Healthcare": "Universal healthcare is a fundamental human right and must be accessible to all, regardless of economic status.",
      "Education": "Investing in education is investing in our future; we must increase funding for public schools to ensure equal opportunities for all children.",
      "Immigration": "Comprehensive immigration reform should provide a pathway to citizenship and respect the dignity of all individuals.",
      "Gun Control": "To protect our communities, we need stricter gun control laws and responsible ownership measures.",
      "Economic Inequality": "Addressing economic inequality is crucial for a thriving democracy; we must support policies that increase the minimum wage and reduce wealth disparity.",
      "Privacy and Surveillance": "Citizen privacy must be protected from excessive surveillance; personal freedom should not be compromised in the name of security.",
      "Foreign Policy": "Our foreign policy must prioritize diplomacy and international cooperation to build a more peaceful and just world.",
      "Voting Rights": "Protecting the integrity of our elections is vital; every citizen deserves the right to vote without undue barriers or interference.",
      "Tax Reform": "Fair tax reform is needed to ensure that large corporations and the wealthiest pay their fair share towards the nation's prosperity."
    };

    // Inserting data into the table
    const stmt = db.prepare("INSERT INTO Topics (topic, sentence) VALUES (?, ?)");
    for (let [topic, sentence] of Object.entries(data)) {
        stmt.run(topic, sentence);
    }
    stmt.finalize();

    // Log the table contents to confirm
    db.each("SELECT rowid AS id, topic, sentence FROM Topics", function(err, row) {
        console.log(row.id + ": " + row.topic + " - " + row.sentence);
    });
});

db.close();
