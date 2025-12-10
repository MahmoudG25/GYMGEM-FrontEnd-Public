/**
 * Test utilities for authentication and profile management.
 * Use these in your browser console for testing.
 * 
 * New localStorage structure:
 * {
 *   id: 38,
 *   username: "username",
 *   email: "email@example.com",
 *   current_profile: 42,
 *   profiles: [
 *     {type: "trainer", id: 42},
 *     {type: "trainee", id: 43}
 *   ]
 * }
 */

// Example: Set up a test user with multiple profiles
export const setupTestUser = () => {
  localStorage.setItem("access", "test_token_12345");
  localStorage.setItem("user", JSON.stringify({
    id: 38,
    username: "testuser",
    email: "test@example.com",
    current_profile: 1,
    profiles: [
      { type: "trainee", id: 1 },
      { type: "trainer", id: 2 }
    ]
  }));
  console.log("✅ Test user created with trainee and trainer profiles");
};

// Example: Set up a user with only trainee profile
export const setupTraineeOnly = () => {
  localStorage.setItem("access", "test_token_12345");
  localStorage.setItem("user", JSON.stringify({
    id: 39,
    username: "trainee_user",
    email: "trainee@example.com",
    current_profile: 1,
    profiles: [
      { type: "trainee", id: 1 }
    ]
  }));
  console.log("✅ Trainee-only user created");
};

// Example: Set up a user with all profile types
export const setupAllProfiles = () => {
  localStorage.setItem("access", "test_token_12345");
  localStorage.setItem("user", JSON.stringify({
    id: 40,
    username: "super_user",
    email: "super@example.com",
    current_profile: 1,
    profiles: [
      { type: "trainee", id: 1 },
      { type: "trainer", id: 2 },
      { type: "gym", id: 3 },
      { type: "store", id: 4 }
    ]
  }));
  console.log("✅ User created with all profile types");
};

// Example: Clear all auth data (logout)
export const clearAuth = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
  console.log("✅ Auth data cleared");
};

// Example: Add a new profile to existing user
export const addProfile = (type, id) => {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    console.error("❌ No user found in localStorage");
    return;
  }

  const user = JSON.parse(userStr);
  if (!user.profiles) user.profiles = [];
  
  user.profiles.push({ type, id });
  localStorage.setItem("user", JSON.stringify(user));
  console.log(`✅ Added ${type} profile with id ${id}`);
};

// Example: Switch current profile
export const switchProfile = (profileId) => {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    console.error("❌ No user found in localStorage");
    return;
  }

  const user = JSON.parse(userStr);
  const profile = user.profiles?.find(p => p.id === profileId);
  
  if (!profile) {
    console.error(`❌ Profile with ID ${profileId} not found`);
    return;
  }

  user.current_profile = profileId;
  localStorage.setItem("user", JSON.stringify(user));
  console.log(`✅ Switched to ${profile.type} profile (ID: ${profileId})`);
};

// Example: View current user data
export const viewUser = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    console.log("❌ No user found in localStorage");
    return;
  }

  const user = JSON.parse(userStr);
  console.log("📋 Current User:", user);
  return user;
};
