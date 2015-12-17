use quickrbooks;

db.users.save(
    { "_id" : ObjectId("56707a9e2c29fc36bf61955e"), "name" : "jjacobson" }
);
db.users.save(
    { "_id" : ObjectId("56707a9e2c29fc36bf61955f"), "name" : "dsloane" }
);
db.users.save(
    { "_id" : ObjectId("56707a9e2c29fc36bf619560"), "name" : "scha" }
);
db.users.save(
    { "_id" : ObjectId("56707a9e2c29fc36bf619561"), "name" : "gfisher" }
);
db.users.save(
    { "_id" : ObjectId("56707aa12c29fc36bf619562"), "name" : "ddelaney" }
);

db.projects.save(
    { "_id" : ObjectId("56707f04b33a9abdcbb597e9"), "name" : "KCLS", "approver" : ObjectId("56707aa12c29fc36bf619562") }
);

db.reports.save(
    { "_id" : ObjectId("567080c1198a856138841a31"), "name" : "KCLS report", "items" : [ { "type" : "mileage", "value" : "20.00" } ], "project" : ObjectId("56707f04b33a9abdcbb597e9"), "user" : ObjectId("56707a9e2c29fc36bf61955d"), "status": "saved" }

);
db.reports.save(
    { "_id" : ObjectId("567080c1198a856138841a32"), "name" : "KCLS report", "items" : [ { "type" : "mileage", "value" : "20.00" } ], "project" : ObjectId("56707f04b33a9abdcbb597e9"), "user" : ObjectId("56707a9e2c29fc36bf61955e"), "status": "saved" }

);
db.reports.save(
    { "_id" : ObjectId("567080c1198a856138841a33"), "name" : "KCLS report", "items" : [ { "type" : "mileage", "value" : "20.00" } ], "project" : ObjectId("56707f04b33a9abdcbb597e9"), "user" : ObjectId("56707a9e2c29fc36bf61955f"), "status": "saved" }

);
db.reports.save(
    { "_id" : ObjectId("567080c1198a856138841a34"), "name" : "KCLS report", "items" : [ { "type" : "mileage", "value" : "20.00" } ], "project" : ObjectId("56707f04b33a9abdcbb597e9"), "user" : ObjectId("56707a9e2c29fc36bf619560"), "status": "saved" }

);
db.reports.save(
    { "_id" : ObjectId("567080c1198a856138841a35"), "name" : "KCLS report", "items" : [ { "type" : "mileage", "value" : "20.00" } ], "project" : ObjectId("56707f04b33a9abdcbb597e9"), "user" : ObjectId("56707a9e2c29fc36bf619561"), "status": "saved" }

);
db.reports.save(
    { "_id" : ObjectId("567080c3198a856138841a36"), "name" : "KCLS report", "items" : [ { "type" : "mileage", "value" : "20.00" } ], "project" : ObjectId("56707f04b33a9abdcbb597e9"), "user" : ObjectId("56707aa12c29fc36bf619562"), "status": "saved" }

);



