import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Fetch the first existing user from the database
    const user = await ctx.db.query("users").first();

    // 2. Safeguard: Make sure a user actually exists before seeding
    if (!user) {
      return "Failed: No users exist yet! Please register a user in the app first.";
    }

    const initialTasks = [
      "Buy groceries",
      "Finish React Native tutorial",
      "Clean the kitchen",
      "Call mom",
      "Schedule dentist appointment",
      "Fix bug in todo app",
      "Read 10 pages of a book",
      "Go for a 20-minute run",
      "Organize desk",
      "Meditate for 5 minutes"
    ];

    for (const taskText of initialTasks) {
      // 3. Insert the task with the valid userId attached
      await ctx.db.insert("todos", {
        text: taskText,
        isCompleted: Math.random() > 0.7,
        userId: user._id, // <-- This fixes your error!
      });
    }
    
    return "Successfully seeded 10 tasks!";
  },
});