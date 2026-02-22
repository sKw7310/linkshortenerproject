---
agent: ask

---

Perfrom a security audit of this codebase to detect any potential security vulnerabilities in this project.

Output your findings as a markdown formatted table with the following columns (ID should start at 1 and auto increment, File Path should be an actual link to the file): "ID", "Severity", "Issue", "File Path", "Line Number(s)" and "Recommendation". 

Next, ask the user which issues they would like to fix by eithe replying "all" or a commma separated list of issue IDs. After the user replies, run a separate agent (#runSubAgent) to fix each issue the user has specified. Each sub agent should report back with a simple 'subAgentSuccess: true | false'.