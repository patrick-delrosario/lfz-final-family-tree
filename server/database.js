const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const getUser = `
  select *
  from "userAccount"
  where "userId" = $1;
`;

const getAllFamilies = `
  select *
  from "familyLibrary";
`;

const getFamily = `
  select *
  from "familyLibrary"
  where "familyId" = $1;
`;

const getAllTrees = `
  select *
  from "treeLibrary";
`;

const getTree = `
  select *
  from "treeLibrary"
  where "treeId" = $1;
`;

const getAllProfiles = `
  select *
  from profiles
  order by "profileId"
`;

const getProfile = `
  select *
  from profiles
  where "profileId" = $1;
`;

const postAccount = `
  insert into "userAccount" (
    "firstName",
    "lastName",
    "email",
    "password"
  )
  values ($1, $2, $3, $4)
  returning *;
`;

const postFamily = `
  insert into "familyLibrary" (
    "userId",
    "name"
  )
  values ($1, $2)
  returning *;
`;

const postTree = `
  insert into "treeLibrary" (
    "userId",
    "name"
  )
  values ($1, $2)
  returning *;
`;

const postProfile = `
  insert into "profiles" (
    "familyId",
    "treeId",
    "firstName",
    "lastName",
    "age",
    "birthMonth",
    "birthYear",
    "gender",
    "deceased",
    "birthPlace",
    "phoneNumber",
    "email",
    "image"
  )
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  returning *;
`;

const updateAccount = `
  update "userAccount"
  set "firstName" = $1,
      "lastName" = $2,
      "email" = $3,
      "password" = $4
  where "userId" = $5
  returning *;
`;

const updateFamily = `
    update "familyLibrary"
    set "userId" = $1,
        "name" = $2
    where "familyId" = $3
    returning *;
`;

const updateTree = `
    update "treeLibrary"
    set "userId" = $1,
        "name" = $2
    where "treeId" = $3
    returning *;
`;

const updateProfile = `
    update "profiles"
    set "familyId" = $1,
        "treeId" = $2,
        "firstName" = $3,
        "lastName" = $4,
        "age" = $5,
        "birthMonth" = $6,
        "birthYear" = $7,
        "gender" = $8,
        "deceased" = $9,
        "birthPlace" = $10,
        "phoneNumber" = $11,
        "email" = $12,
        "image" = $13
    where "profileId" = $14
    returning *;
`;

const deleteAccount = `
    delete from "userAccount"
    where "userId" = $1
    returning *;
`;

const deleteFamily = `
    delete from "familyLibrary"
    where "familyId" = $1
    returning *;
`;

const deleteTree = `
    delete from "treeLibrary"
    where "treeId" = $1
    returning *;
`;

const deleteProfile = `
    delete from "profiles"
    where "profileId" = $1
    returning *;
`;

module.exports = db;
module.exports.queries = {
  getUser,
  getAllFamilies,
  getFamily,
  getAllTrees,
  getTree,
  getAllProfiles,
  getProfile,
  postAccount,
  postFamily,
  postTree,
  postProfile,
  updateAccount,
  updateFamily,
  updateTree,
  updateProfile,
  deleteAccount,
  deleteFamily,
  deleteTree,
  deleteProfile
};
