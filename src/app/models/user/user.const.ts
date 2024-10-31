export const USER_ROLE = {
  user: "user",
  admin: "admin",
} as const;

export const UserStatus = ["in-progress", "blocked"];

export const userSearchableFields = [
  "email",
  "role",
  "phone",
  "name",
  "status",
  "address",
];
