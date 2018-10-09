DROP TABLE sensorTimeSeries;
DROP TABLE sensorDeployed;
DROP TABLE sensor;
DROP TABLE turbineDeployed;
DROP TABLE turbine;
DROP TABLE site;
DROP TABLE client;

CREATE TABLE client (
    clientId int,
    clientName varchar(30),
    clientDescription text,
    gicsSector varchar(30),
    gicsSubIndustry varchar(30),
    headquarters varchar(30),
    PRIMARY KEY (clientId)
);

CREATE TABLE comment(
    commentId int AUTO_INCREMENT,
    clientId int,
    comment text,
    PRIMARY KEY (commentId),
    FOREIGN KEY (clientId) REFERENCES client(clientId)
);

CREATE TABLE site (
    siteId int,
    clientId int,
    siteName varchar(30),
    siteDescription text,
    primaryContact varchar(30),
    capacity int,
    commercialDate date,
    addrLine1 varchar(30),
    addrLine2 varchar(30),
    addrCity varchar(30),
    addrState varchar(30),
    addrZip varchar(30),
    addrCountry varchar(30),
    PRIMARY KEY (siteId),
    FOREIGN KEY (clientId) REFERENCES client(clientId)
);

CREATE TABLE turbine (
    turbineId int,
    turbineName varchar(30),
    turbineDescription text,
    capacity int,
    rampUpTime int,
    maintenanceInterval int,
    PRIMARY KEY (turbineId)
);

CREATE TABLE turbineDeployed (
    turbineDeployedId int,
    turbineId int,
    siteId int,
    serialNumber varchar(30),
    deployedDate date,
    totalFiredHours int,
    totalStarts int,
    lastPlannedOutageDate date,
    lastUnplannedOutageDate date,
    PRIMARY KEY (turbineDeployedId),
    FOREIGN KEY (turbineId) REFERENCES turbine(turbineId),
    FOREIGN KEY (siteId) REFERENCES site(siteId)
);

CREATE TABLE sensor (
    sensorId int,
    sensorName varchar(30),
    sensorDescription text,
    manufacturer varchar(30),
    totalLifeExpentancyHours int,
    PRIMARY KEY (sensorId)
);

CREATE TABLE sensorDeployed (
    sensorDeployedId int,
    sensorId int,
    turbineDeployedId int,
    serialNumber varchar(30),
    deployedDate date,
    PRIMARY KEY (sensorDeployedId),
    FOREIGN KEY (sensorId) REFERENCES sensor(sensorId),
    FOREIGN KEY (turbineDeployedId) REFERENCES turbineDeployed(turbineDeployedId)
);

CREATE TABLE sensorTimeSeries (
    recordId int,
    sensorDeployedId int,
    dataCollectedDate date,
    output double,
    heatRate double,
    compressorEfficiency double,
    availability double,
    reliability double,
    firedHours double,
    trips int,
    starts int,
    PRIMARY KEY (recordId),
    FOREIGN KEY (sensorDeployedId) REFERENCES sensorDeployed(sensorDeployedId)
);

CREATE VIEW site_endpoint AS
Select
s.siteId,
s.clientId,
c.clientName,
s.siteName,
s.siteDescription,
s.primaryContact,
s.capacity,
s.commercialDate,
CONCAT(addrline1, ', ', addrCity, ', ', addrState, ' ', addrZip, ' ', addrCountry) As Address
 from site s,
 client c
Where  s.clientId = c.clientId;


-- ////TRIGGER EXAMPLE///////
-- CREATE TRIGGER sumWorkToTask
-- AFTER INSERT ON Work
-- FOR EACH ROW
--   UPDATE Tasks
--   SET
--     hours_worked = hours_worked + NEW.hours
-- where id = NEW.task_id;
