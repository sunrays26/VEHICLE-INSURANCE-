-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS DBMS;

-- Switch to the created database
USE DBMS;
create table loginuser(
       user_id int not null primary key auto_increment,
       user_name varchar(255),
       user_pass varchar(255),
       role int
       );
       
CREATE TABLE IF NOT EXISTS insurance_companies (
    company_name VARCHAR(40) PRIMARY KEY,
    company_address VARCHAR(40),
    company_contact_number DECIMAL(10, 0),
    company_email VARCHAR(20)
);

-- Create the `customer` table
CREATE TABLE IF NOT EXISTS customer (
    cust_id VARCHAR(20) PRIMARY KEY,
    cust_fname VARCHAR(20) NOT NULL,
    cust_lname VARCHAR(20) NOT NULL,
    cust_DOB DATE NOT NULL,
    cust_gender CHAR(10) NOT NULL,
    cust_mob_number VARCHAR(12) NOT NULL,
    cust_email VARCHAR(225) NOT NULL,
    cust_passport_number VARCHAR(20),
    cust_martial_status CHAR(10),
    cust_ppS_number CHAR(9)
    
);

-- Create the `vehicle` table
CREATE TABLE IF NOT EXISTS vehicle (
    vehicle_id VARCHAR(20) PRIMARY KEY,
    cust_id VARCHAR(20),
    vehicle_registration_number VARCHAR(20),
    vehicle_value INTEGER,
    vehicle_type VARCHAR(20),
    vehicle_chasis_number VARCHAR(30),
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id) ON DELETE CASCADE
);

-- Create the `application` table
CREATE TABLE IF NOT EXISTS application (
    application_id VARCHAR(20) PRIMARY KEY,
    cust_id VARCHAR(20),
    vehicle_id VARCHAR(20),
    application_status ENUM('accepted', 'rejected', 'pending') DEFAULT 'pending',
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id) ON DELETE CASCADE
);

-- Create the `insurance_policy` table
CREATE TABLE IF NOT EXISTS insurance_policy (
    aggrement_id VARCHAR(20) PRIMARY KEY,
    application_id VARCHAR(20),
    cust_id VARCHAR(20),
    policy_number VARCHAR(20),
    start_date DATETIME,
    FOREIGN KEY (application_id) REFERENCES application(application_id) ON DELETE CASCADE,
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id) ON DELETE CASCADE
);

-- Create the `premium_payment` table
CREATE TABLE IF NOT EXISTS premium_payment (
    premium_payment_id VARCHAR(20) PRIMARY KEY,
    cust_id VARCHAR(20),
    policy_number VARCHAR(20),
    premium_payment_schedule DATETIME,
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id) ON DELETE CASCADE,
    FOREIGN KEY (policy_number) REFERENCES insurance_policy(aggrement_id) ON DELETE CASCADE
);

-- Create the `claim` table
CREATE TABLE IF NOT EXISTS claim (
    claim_id VARCHAR(20) PRIMARY KEY,
    cust_id VARCHAR(20),
    aggrement_id VARCHAR(20),
    claim_amount INTEGER,
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id) ON DELETE CASCADE,
    FOREIGN KEY (aggrement_id) REFERENCES insurance_policy(aggrement_id) ON DELETE CASCADE
);

-- Create the `claim_settlement` table
CREATE TABLE IF NOT EXISTS claim_settlement (
    claim_settlement_id VARCHAR(20) PRIMARY KEY,
    claim_id VARCHAR(20),
    cust_id VARCHAR(20),
    vehicle_id VARCHAR(20),
    FOREIGN KEY (claim_id) REFERENCES claim(claim_id) ON DELETE CASCADE,
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(vehicle_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS department (
    department_name VARCHAR(50) PRIMARY KEY,
    company_name VARCHAR(40),
    FOREIGN KEY (company_name) REFERENCES insurance_companies(company_name) ON DELETE CASCADE
);

-- Create the `office` table
CREATE TABLE IF NOT EXISTS office (
    office_name VARCHAR(20) PRIMARY KEY,
    department_name VARCHAR(20),
    office_contact VARCHAR(20),
    office_company VARCHAR(20),
    FOREIGN KEY (department_name) REFERENCES department(department_name) ON DELETE CASCADE
);

-- Create the `membership` table
CREATE TABLE IF NOT EXISTS membership (
    membership_id VARCHAR(20) PRIMARY KEY,
    cust_id VARCHAR(20),
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id) ON DELETE CASCADE
);

-- Create the `policy_renewable` table
CREATE TABLE IF NOT EXISTS policy_renewable (
    policy_renewable_id VARCHAR(20) PRIMARY KEY,
    cust_id VARCHAR(20),
    Date_Of_renewal varchar(20),
    Type_Of_Renewal varchar(20),
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id) ON DELETE CASCADE
);

-- Create the `coverage` table
CREATE TABLE IF NOT EXISTS coverage (
    coverage_id VARCHAR(20) PRIMARY KEY,
    company_name VARCHAR(40),
    Coverage_Amount VARCHAR(20),
    Coverage_Type VARCHAR(20),
    Coverage_Level VARCHAR(20),
    FOREIGN KEY (company_name) REFERENCES insurance_companies(company_name) ON DELETE CASCADE
);

-- Create the `product` table with correct columns
CREATE TABLE IF NOT EXISTS product (
    product_number VARCHAR(20) PRIMARY KEY,
    company_name VARCHAR(40),
    product_type CHAR(15)
);

-- Create the `receipt` table
CREATE TABLE IF NOT EXISTS receipt (
    receipt_id VARCHAR(20) PRIMARY KEY,
    cust_id VARCHAR(20),
    customer_phone varchar(20),
    cost VARCHAR(20),
    FOREIGN KEY (cust_id) REFERENCES customer(cust_id) ON DELETE CASCADE
);

insert into loginuser(user_name,user_pass,role) values
('laxmi@gmail.com','2610','0');

-- Insert data into the `insurance_companies` table first, as it's referenced in other tables
INSERT INTO insurance_companies (company_name, company_address, company_contact_number)
VALUES
('INSURANCE01', 'Address 1', 1234567890),
('INSURANCE02', 'Address 2', 1234567891);

-- Now insert data into the other tables in a proper order
INSERT INTO customer ( cust_id,cust_fname, cust_lname, cust_DOB, cust_gender, cust_mob_number, cust_email, cust_passport_number, cust_martial_status, cust_ppS_number)
VALUES
('CUST01', 'John', 'Doe', '1990-01-01', 'M', 1234567890, 'john.doe@example.com', 'PASS123', 'single', '123456789'),
( 'CUST02','Jane', 'Smith', '1985-05-05', 'F', 1234567891, 'jane.smith@example.com', 'PASS124', 'married', '987654321');

INSERT INTO vehicle (vehicle_id, cust_id, vehicle_registration_number, vehicle_value, vehicle_type, vehicle_chasis_number)
VALUES
('VEH01', 'CUST01', 'REG123', 20000, 'SUV', 'CHASIS123'),
('VEH02', 'CUST02', 'REG124', 25000, 'Sedan', 'CHASIS124');

INSERT INTO application (application_id, cust_id, vehicle_id, application_status)
VALUES
('APP01', 'CUST01', 'VEH01', 'pending'),
('APP02', 'CUST02', 'VEH02', 'accepted');

INSERT INTO insurance_policy (aggrement_id, application_id, cust_id, policy_number, start_date)
VALUES
('POL01', 'APP01', 'CUST01', 'POL123', NOW()),
('POL02', 'APP02', 'CUST02', 'POL124', NOW());

-- Correct insertion into `premium_payment`
INSERT INTO premium_payment (premium_payment_id, cust_id, policy_number, premium_payment_schedule)
VALUES
('PREM01', 'CUST01', 'POL123', NOW()),
('PREM02', 'CUST02', 'POL124', NOW());

-- Insert into `insurance_policy`
INSERT INTO insurance_policy (aggrement_id, application_id, cust_id, policy_number, start_date)
VALUES
('POL123', 'APP01', 'CUST01', 'POL123', NOW()),
('POL124', 'APP02', 'CUST02', 'POL124', NOW());

-- Now insert into `premium_payment`
INSERT INTO premium_payment (premium_payment_id, cust_id, policy_number, premium_payment_schedule)
VALUES
('PREM01', 'CUST01', 'POL123', NOW()),
('PREM02', 'CUST02', 'POL124', NOW());

INSERT INTO claim (claim_id, cust_id, aggrement_id, claim_amount)
VALUES
('CLAIM01', 'CUST01', 'POL01', 5000),
('CLAIM02', 'CUST02', 'POL02', 7000);

INSERT INTO claim_settlement (claim_settlement_id, claim_id, cust_id, vehicle_id)
VALUES
('CLAIMSET01', 'CLAIM01', 'CUST01', 'VEH01'),
('CLAIMSET02', 'CLAIM02', 'CUST02', 'VEH02');

INSERT INTO department (department_name, company_name)
VALUES
('DEPT01', 'INSURANCE01'),
('DEPT02', 'INSURANCE02');

INSERT INTO office (office_name, department_name,office_contact,office_company)
VALUES
('OFFICE01', 'DEPT01','2345','samsung'),
('OFFICE02', 'DEPT02','2345','samsung');

INSERT INTO membership (membership_id, cust_id)
VALUES
('MEMB01', 'CUST01'),
('MEMB02', 'CUST02');

INSERT INTO policy_renewable (policy_renewable_id, cust_id,Date_Of_Renewal,Type_Of_Renewal)
VALUES
('POLICYRENEW01', 'CUST01','11-11-2001','advanced'),
('POLICYRENEW02', 'CUST02','11-11-2001','begineer');

INSERT INTO coverage (coverage_id, company_name, Coverage_Amount,Coverage_Type,Coverage_Level)
VALUES
('COV01', 'INSURANCE01','100','pro','2'),
('COV02', 'INSURANCE02','100','pro','2');

INSERT INTO product (product_number, company_name, product_type)
VALUES
('PROD01', 'INSURANCE01', 'Basic'),
('PROD02', 'INSURANCE02', 'Premium');

INSERT INTO receipt (receipt_id, cust_id,cost, customer_phone)
VALUES
('RECEIPT01', 'CUST01','2000','1234567890'),
('RECEIPT02', 'CUST02','2000','1234567899');
