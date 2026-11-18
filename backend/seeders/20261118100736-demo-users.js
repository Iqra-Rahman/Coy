"use strict";

module.exports = {
  async up(queryInterface) {
    const profiles = [
      ["Alice", 23, "Delhi", "Here to meet new people.", ["Music", "Travel"]],
      ["Aarav", 24, "Gurugram", "Coffee, coding and long drives.", ["Tech", "Travel", "Music"]],
      ["Ananya", 23, "Delhi", "Collecting books and little memories.", ["Reading", "Art", "Coffee"]],
      ["Rohan", 25, "Noida", "Always planning my next adventure.", ["Hiking", "Photography"]],
      ["Meera", 22, "Delhi", "A little chaos and a lot of creativity.", ["Painting", "Music"]],
      ["Kabir", 24, "Gurugram", "Probably at a concert somewhere.", ["Music", "Guitar"]],
      ["Ishita", 23, "Noida", "Finding happiness in small things.", ["Cooking", "Reading"]],
      ["Arjun", 26, "Delhi", "Weekend trips and good conversations.", ["Travel", "Fitness"]],
      ["Sana", 22, "Noida", "Professional overthinker and foodie.", ["Food", "Movies"]],
      ["Vihaan", 24, "Gurugram", "Trying to make every day count.", ["Running", "Tech"]],
      ["Kiara", 23, "Delhi", "Sunsets over everything.", ["Photography", "Travel"]],
      ["Aditya", 25, "Noida", "Building things and breaking records.", ["Gaming", "Tech"]],
      ["Riya", 22, "Delhi", "Always up for a coffee date.", ["Coffee", "Fashion"]],
      ["Dev", 24, "Gurugram", "Music is my love language.", ["Music", "Movies"]],
      ["Tanya", 25, "Noida", "Exploring life one city at a time.", ["Travel", "Food"]],
      ["Yash", 23, "Delhi", "A football fan with bad jokes.", ["Football", "Comedy"]],
      ["Naina", 24, "Gurugram", "Plants, poetry and peaceful mornings.", ["Poetry", "Gardening"]],
      ["Reyansh", 25, "Delhi", "Seeking adventures and good food.", ["Food", "Hiking"]],
      ["Aisha", 23, "Noida", "Making playlists for every mood.", ["Music", "Art"]],
      ["Dhruv", 26, "Gurugram", "Fitness enthusiast and dog person.", ["Fitness", "Pets"]],
      ["Zoya", 22, "Delhi", "Dreaming big and laughing louder.", ["Movies", "Fashion"]],
      ["Kunal", 24, "Noida", "Engineer by day, gamer by night.", ["Gaming", "Tech"]],
      ["Avni", 23, "Delhi", "A camera and a curious mind.", ["Photography", "Art"]],
      ["Neil", 25, "Gurugram", "In search of the perfect pizza.", ["Food", "Music"]],
      ["Myra", 22, "Noida", "Books are my happy place.", ["Reading", "Writing"]],
      ["Aryan", 24, "Delhi", "Road trips and random adventures.", ["Travel", "Cars"]],
      ["Sara", 23, "Gurugram", "Living life one dance step at a time.", ["Dance", "Music"]],
      ["Vivaan", 25, "Noida", "A calm soul with a curious mind.", ["Reading", "Chess"]],
      ["Diya", 22, "Delhi", "Creating my own little universe.", ["Art", "Gaming"]],
      ["Aman", 24, "Gurugram", "Good vibes and great conversations.", ["Coffee", "Travel"]],
      ["Alina", 23, "Noida", "Collecting experiences, not things.", ["Travel", "Photography"]],
    ];

    const users = profiles.map((profile, index) => ({
      id: index + 1,
      name: profile[0],
      age: profile[1],
      city: profile[2],
      bio: profile[3],
      interests: JSON.stringify(profile[4]),
      photo_url: `/avatars/coy-${index + 1}.svg`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", {
      id: Array.from({ length: 31 }, (_, i) => i + 1),
    });
  },
};