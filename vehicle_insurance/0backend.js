const express = require('express');
const app = express();
const port = 3000;
const cors=require('cors')
app.use(express.json());
app.use(cors())
//app.use(bodyParser.json());
const { 
  createPool } = 
  require('mysql');

  const pool = createPool({
      host: "localhost",
      user: "root",
      password: "2610",
      database: "DBMS",
      connectionLimit: 10
  })

// THIS CODE PART IS FOR STARTING THE BACKEND SERVER
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
 // (READ) FOR CUSTOMER ENTITY

  app.post('/', (req, res) => {
    const { name } = req.body;

    const query = 'SELECT * FROM customer WHERE cust_fname = ?';
    pool.query(query, [name], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).send('Error querying database');
        } else if (results.length === 0) {
            res.status(404).send('Customer not found');
        } else {
            const customer = results[0]; // Get the first matching result
            res.json(customer); // Send the customer data as JSON
        }
    });
});




// (CREATE) FOR CUSTOMER ENTITY

app.post('/submit', (req, res) => {
  // Extract data from the request body
  const customerData = req.body;

  const query = `
    INSERT INTO customer
    (cust_id, cust_fname, cust_lname, cust_DOB, cust_mob_number, cust_gender, cust_email, cust_martial_status, cust_ppS_number, cust_passport_number)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    customerData.cust_id,
    customerData.cust_fname,
    customerData.cust_lname,
    customerData.cust_dob,
    customerData.cust_mob_number,
    customerData.cust_gender,
    customerData.cust_email,
    customerData.cust_martial_status,
    customerData.cust_pps_number,
    customerData.cust_passport_number
  ];

  pool.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }

    res.json({ message: 'Customer data saved successfully', results });
  });
});





// (UPDATE) FOR CUSTOMER ENTITY

app.post('/updateCustomer', (req, res) => {
  const { update_cust_id, update_cust_fname, update_cust_lname, update_cust_dob, update_cust_mob_number } = req.body;

  // Query to update customer information based on customer ID
  const updateQuery = `
      UPDATE customer
      SET 
          cust_fname = COALESCE(?, cust_fname),
          cust_fname = COALESCE(?, cust_lname),
          cust_DOB = COALESCE(?, cust_DOB),
          cust_mob_number = COALESCE(?, cust_mob_number)
      WHERE cust_id = ?
  `;

  pool.query(
      updateQuery,
      [update_cust_fname, update_cust_lname, update_cust_dob, update_cust_mob_number, update_cust_id],
      (err, result) => {
          if (err) {
              console.error('Error updating customer:', err);
              res.status(500).send('Error updating customer');
          } else if (result.affectedRows === 0) {
              res.status(404).send('Customer not found');
          } else {
              res.json({ message: 'Customer updated successfully' });
          }
      }
  );
});





// (DELETE) FOR CUSTOMER ENTITY

app.post('/deleteCustomer', (req, res) => {
  const { delete_cust_id } = req.body; // Extract the customer ID to delete

  // SQL query to delete the customer
  const deleteCustomerQuery = `
      DELETE FROM customer 
      WHERE cust_id = ?
  `;

  pool.query(
      deleteCustomerQuery,
      [delete_cust_id],
      (err, result) => {
          if (err) {
              console.error('Error deleting customer:', err);
              res.status(500).send('Error deleting customer');
          } else if (result.affectedRows === 0) {
              res.status(404).send('Customer not found');
          } else {
              res.json({ message: 'Customer deleted successfully' });
          }
      }
  );
});
   


// (READ) FOR APPLICATION ENTITY

app.post('/fetch-application-info', (req, res) => {
  const { applicationId } = req.body;

  const query = 'SELECT * FROM application WHERE application_id = ?';
  pool.query(query, [applicationId], (err, results) => {
      if (err) {
          console.error('Error querying database:', err);
          res.status(500).send('Error querying database');
      } else if (results.length === 0) {
          res.status(404).send(' 77not found');
      } else {
          const application = results[0]; // Get the first matching result
          res.json(application); // Send the customer data as JSON
      }
  });
});




// (CREATE) FOR APPLICATION ENTITY

// Submit application data to MySQL
app.post('/application/submit', (req, res) => {
  const formData = req.body;

  // Insert the form data into the database
  const query = `
    INSERT INTO application (application_id, application_status, cust_id, vehicle_id)
    VALUES (?, ?, ?, ?)
  `;

  const values = [
    formData.application_id,
    formData.application_status,
    formData.cust_id,
    formData.vehicle_id,
  ];

  pool.query(query, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ message: 'Application submitted successfully', id: results.insertId });
    }
  });
});



// (UPDATE) FOR APPLICATION ENTITY

app.post('/application/update', (req, res) => {
  const { application_id, new_application_status } = req.body;

  // Simulate database interaction
  console.log(`Updating application ${application_id}`);
  console.log(`New status: ${new_application_status}`);


  // Simulate a response with the updated data
  const updatedApplication = [
    new_application_status,
      application_id
  ];
  const query = `
  UPDATE application SET application_status = ? WHERE application_id = ?`;
  pool.query(query, updatedApplication, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ message: 'Application submitted successfully', id: results.insertId });
    }
  });
});


// DELETE FOR APPLICATION ENTITY
app.post('/application/delete', (req, res) => {
  const { application_id } = req.body;

  // Execute the SQL DELETE query
  pool.query('DELETE FROM Application WHERE application_id = ?', [application_id], (error, results) => {
      if (error) {
          console.error('Error deleting application:', error);
          res.status(500).json({ error: 'An error occurred while deleting the application.' });
      } else {
          console.log('Application deleted successfully.');
          res.json({ message: 'Application deleted successfully.' });
      }
  });
});


////////////////////////////////////////////////////////////////


// (READ) for insurance policy\

app.post('/getPolicyInfo', (req, res) => {
  const { aggrement_id } = req.body; // Get the agreement ID from the request body

  if (!aggrement_id) {
    return res.status(400).send('Agreement ID is required'); // Check for valid input
  }

  const query = 'SELECT * FROM insurance_policy WHERE aggrement_id = ?'; // SQL query to fetch policy info

  pool.query(query, [aggrement_id], (err, results) => {
    if (err) {
      console.error('Error fetching policy information:', err);
      return res.status(500).send('Error fetching policy information');
    }

    if (results.length === 0) {
      // No policy found for the given agreement ID
      return res.status(404).send('No policy found');
    }

    // Return the first result as a JSON response
    return res.status(200).json(results[0]);
  });
});


// CREATE FOR INS POLICY
// Create new policy
app.post('/createPolicy', (req, res) => {
  const {
      aggrement_id,
      policy_number,
      start_date,
      cust_id,
      application_id
  } = req.body;

  pool.query(
      'INSERT INTO insurance_policy (aggrement_id, policy_number, start_date, cust_id, application_id) VALUES (?, ?, ?, ?, ?)',
      [aggrement_id, policy_number, start_date, cust_id, application_id],
      (error, results) => {
          if (error) {
              res.status(500).json({ error: error.message });
          } else {
              res.json({ success: true, results });
          }
      }
  );
});

// Update  IND=SURANCEpolicy

app.post('/updatePolicy', (req, res) => {
  const {
      aggrement_id,
      new_policy_number,
      new_start_date,
  } = req.body;

  const updateFields = {};
  if (new_policy_number) updateFields.policy_number = new_policy_number;
  if (new_start_date) updateFields.start_date = new_start_date;

  const setClauses = Object.entries(updateFields).map(([key, value]) => `${key} = ?`).join(', ');
  const values = [...Object.values(updateFields), aggrement_id];

  const query = `UPDATE insurance_policy SET ${setClauses} WHERE aggrement_id = ?`;

  pool.query(query, values, (error, results) => {
      if (error) {
          res.status(500).json({ error: error.message });
      } else {
          res.json({ success: true, results });
      }
  });
});

// Delete  INSURANCE policy
app.post('/deletePolicy', (req, res) => {
  const { aggrement_id } = req.body;

  pool.query(
      'DELETE FROM insurance_policy WHERE aggrement_id = ?',
      [aggrement_id],
      (error, results) => {
          if (error) {
              res.status(500).json({ error: error.message });
          } else {
        res.json({ success: true, results });
          }
      }
  );
});

///////////////////////////////////////////////////////////////////
//READING PREMIUM Payment
app.post('/getPremiumPaymentInfo', (req, res) => {
  const { premium_payment_id } = req.body;

  const query = 'SELECT * FROM premium_payment WHERE premium_payment_id = ?';

  pool.query(query, [premium_payment_id], (err, results) => {
    if (err) {
      console.error("Error fetching premium payment information:", err);
      res.status(500).json({ message: 'Error fetching premium payment information' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Premium payment not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Endpoint to create a new premium payment
app.post('/createPremiumPayment', (req, res) => {
  const {
    premium_payment_id,
    cust_id,
    policy_number,
    premium_payment_schedule,
  } = req.body;

  const query = 'INSERT INTO premium_payment (premium_payment_id, cust_id, policy_number, premium_payment_schedule) VALUES (?, ?, ?, ?)';

  pool.query(query, [premium_payment_id, cust_id, policy_number, premium_payment_schedule], (err, results) => {
    if (err) {
      console.error("Error creating premium payment:", err);
      res.status(500).json({ message: 'Error creating premium payment' });
    } else {
      res.status(201).json({ message: 'Premium payment created', data: results });
    }
  });
});

// Endpoint to update an existing premium payment
app.post('/updatePremiumPayment', (req, res) => {
  const {
    premium_payment_id,
    new_policy_number,
    new_premium_payment_schedule,
    
  } = req.body;

  const query = 'UPDATE premium_payment SET policy_number = ?, premium_payment_schedule = ? WHERE premium_payment_id = ?';

  pool.query(query, [new_policy_number, new_premium_payment_schedule,  premium_payment_id], (err, results) => {
    if (err) {
      console.error("Error updating premium payment:", err);
      res.status(500).json({ message: 'Error updating premium payment' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Premium payment not found' });
    } else {
      res.json({ message: 'Premium payment updated', data: results });
    }
  });
});

// Endpoint to delete a premium payment
app.post('/deletePremiumPayment', (req, res) => {
  const { premium_payment_id } = req.body;

  const query = 'DELETE FROM premium_payment WHERE premium_payment_id = ?';

  pool.query(query, [premium_payment_id], (err, results) => {
    if (err) {
      console.error("Error deleting premium payment:", err);
      res.status(500).json({ message: 'Error deleting premium payment' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Premium payment not found' });
    } else {
      res.json({ message: 'Premium payment deleted', data: results });
    }
  });
});


////////////////////////////////////////////////////////////////

// Endpoint to fetch claim settlement info
app.post('/getClaimSettlementInfo', (req, res) => {
  const { claim_settlement_id } = req.body;

  const query = 'SELECT * FROM claim_settlement WHERE claim_settlement_id = ?';

  pool.query(query, [claim_settlement_id], (err, results) => {
    if (err) {
      console.error("Error fetching claim settlement information:", err);
      res.status(500).json({ message: 'Error fetching claim settlement information' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Claim settlement not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Endpoint to create a new claim settlement
app.post('/createClaimSettlement', (req, res) => {
  const {
    claim_settlement_id,
    claim_id,
    cust_id,
    vehicle_id,
  } = req.body;

  const query = 'INSERT INTO claim_settlement (claim_settlement_id, claim_id, cust_id, vehicle_id) VALUES (?, ?, ?, ?)';

  pool.query(query, [claim_settlement_id, claim_id, cust_id, vehicle_id], (err, results) => {
    if (err) {
      console.error("Error creating claim settlement:", err);
      res.status(500).json({ message: 'Error creating claim settlement' });
    } else {
      res.status(201).json({ message: 'Claim settlement created', results });
    }
  });
});

// Endpoint to update a claim settlement
app.post('/updateClaimSettlement', (req, res) => {
  const {
    claim_settlement_id,
    new_claim_id,
    new_cust_id,
    new_vehicle_id,
  } = req.body;

  const query = `
    UPDATE claim_settlement 
    SET claim_id = ?, cust_id = ?, vehicle_id = ? 
    WHERE claim_settlement_id = ?
  `;

  pool.query(query, [new_claim_id, new_cust_id, new_vehicle_id, claim_settlement_id], (err, results) => {
    if (err) {
      console.error("Error updating claim settlement:", err);
      res.status(500).json({ message: 'Error updating claim settlement' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Claim settlement not found' });
    } else {
      res.json({ message: 'Claim settlement updated', results });
    }
  });
});

// Endpoint to delete a claim settlement
app.post('/deleteClaimSettlement', (req, res) => {
  const { claim_settlement_id } = req.body;

  const query = 'DELETE FROM claim_settlement WHERE claim_settlement_id = ?';

  pool.query(query, [claim_settlement_id], (err, results) => {
    if (err) {
      console.error("Error deleting claim settlement:", err);
      res.status(500).json({ message: 'Error deleting claim settlement' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Claim settlement not found' });
    } else {
      res.json({ message: 'Claim settlement deleted', results });
    }
  });
});

////////////////////////////////////////////////
app.post('/getOfficeInfo', (req, res) => {
  const { office_name } = req.body;

  const query = 'SELECT * FROM office WHERE office_name = ?';

  pool.query(query, [office_name], (err, results) => {
    if (err) {
      console.error("Error fetching office information:", err);
      return res.status(500).json({ message: 'Error fetching office information' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Office not found' });
    }

    res.json(results[0]);
  });
});

// Endpoint to create a new office
app.post('/createOffice', (req, res) => {
  const {
    office_name,
    department_name,
    office_contact,
    office_company
  } = req.body;

  const query = 'INSERT INTO office (office_name, department_name, office_contact, office_company) VALUES (?, ?, ?, ?)';

  pool.query(query, [office_name, department_name, office_contact, office_company], (err, results) => {
    if (err) {
      console.error("Error creating office:", err);
      return res.status(500).json({ message: 'Error creating office' });
    }

    res.status(201).json({ message: 'Office created', results });
  });
});

// Endpoint to update an existing office
app.post('/updateOffice', (req, res) => {
  const {
    office_name,
    new_department_name,
    new_office_contact,
    new_office_company
  } = req.body;

  const query = 'UPDATE office SET department_name = ?, office_contact = ?, office_company = ? WHERE office_name = ?';

  pool.query(query, [new_department_name, new_office_contact, new_office_company, office_name], (err, results) => {
    if (err) {
      console.error("Error updating office:", err);
      return res.status(500).json({ message: 'Error updating office' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Office not found' });
    }

    res.json({ message: 'Office updated', results });
  });
});

// Endpoint to delete an office by office_name
app.post('/deleteOffice', (req, res) => {
  const { office_name } = req.body;

  const query = 'DELETE FROM office WHERE office_name = ?';

  pool.query(query, [office_name], (err, results) => {
    if (err) {
      console.error("Error deleting office:", err);
      return res.status(500).json({ message: 'Error deleting office' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Office not found' });
    }

    res.json({ message: 'Office deleted', results });
  });
});




////////////////////////////////////////////////




app.post('/getMembershipInfo', (req, res) => {
  const { membership_id } = req.body;

  const query = 'SELECT * FROM membership WHERE membership_id = ?';

  pool.query(query, [membership_id], (err, results) => {
    if (err) {
      console.error("Error fetching membership information:", err);
      res.status(500).json({ message: 'Error fetching membership information' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Membership not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Endpoint to create a new membership
app.post('/createMembership', (req, res) => {
  const { membership_id, cust_id } = req.body;

  const query = 'INSERT INTO membership (membership_id, cust_id) VALUES (?, ?)';

  pool.query(query, [membership_id, cust_id], (err, results) => {
    if (err) {
      console.error("Error creating membership:", err);
      res.status(500).json({ message: 'Error creating membership' });
    } else {
      res.status(201).json({ message: 'Membership created', data: results });
    }
  });
});


// Endpoint to delete a membership
app.post('/deleteMembership', (req, res) => {
  const { membership_id } = req.body;

  const query = 'DELETE FROM membership WHERE membership_id = ?';

  pool.query(query, [membership_id], (err, results) => {
    if (err) {
      console.error("Error deleting membership:", err);
      res.status(500).json({ message: 'Error deleting membership' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Membership not found' });
    } else {
      res.json({ message: 'Membership deleted', data: results });
    }
  });
});

  ////////////////////////////////////////////////////////



  app.post('/getReceiptInfo', (req, res) => {
    const { receipt_id } = req.body;
  
    const query = 'SELECT * FROM receipt WHERE receipt_id = ?';
  
   pool.query(query, [receipt_id], (err, results) => {
      if (err) {
        console.error("Error fetching receipt information:", err);
        res.status(500).json({ message: 'Error fetching receipt information' });
      } else if (results.length === 0) {
        res.status(404).json({ message: 'Receipt not found' });
      } else {
        res.json(results[0]);
      }
    });
  });
  
  // Endpoint to create a new receipt
  app.post('/createReceipt', (req, res) => {
    const { receipt_id, cust_id, cost, customer_phone } = req.body;
  
    const query = 'INSERT INTO receipt (receipt_id, cust_id, cost, customer_phone) VALUES (?, ?, ?, ?)';
  
   pool.query(query, [receipt_id, cust_id, cost, customer_phone], (err, results) => {
      if (err) {
        console.error("Error creating receipt:", err);
        res.status(500).json({ message: 'Error creating receipt' });
      } else {
        res.status(201).json({ message: 'Receipt created', data: results });
      }
    });
  });
  
  // Endpoint to update an existing receipt
  app.post('/updateReceipt', (req, res) => {
    const { receipt_id, new_cust_id, new_cost, new_customer_phone } = req.body;
  
    const query = 'UPDATE receipt SET cust_id = ?, cost = ?, customer_phone = ? WHERE receipt_id = ?';
  
   pool.query(query, [new_cust_id, new_cost, new_customer_phone, receipt_id], (err, results) => {
      if (err) {
        console.error("Error updating receipt:", err);
        res.status(500).json({ message: 'Error updating receipt' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Receipt not found' });
      } else {
        res.json({ message: 'Receipt updated', data: results });
      }
    });
  });
  
  // Endpoint to delete a receipt
  app.post('/deleteReceipt', (req, res) => {
    const { receipt_id } = req.body;
  
    const query = 'DELETE FROM receipt WHERE receipt_id = ?';
  
   pool.query(query, [receipt_id], (err, results) => {
      if (err) {
        console.error("Error deleting receipt:", err);
        res.status(500).json({ message: 'Error deleting receipt' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Receipt not found' });
      } else {
        res.json({ message: 'Receipt deleted', data: results });
      }
    });
  });

/////////////////////////////
// Get product information by product number
app.post('/getProductInfo', (req, res) => {
  const { product_number } = req.body;

  pool.query(
      'SELECT * FROM product WHERE product_number = ?',
      [product_number],
      (error, results) => {
          if (error) {
              res.status(500).send({ message: 'Error fetching product information' });
          } else if (results.length === 0) {
              res.status(404).send({ message: 'Product not found' });
          } else {
              res.status(200).send(results[0]); // Return the first result
          }
      }
  );
});

// Create a new product
app.post('/createProduct', (req, res) => {
  const { product_number, company_name, product_type } = req.body;

  pool.query(
      'INSERT INTO product (product_number, company_name, product_type) VALUES (?, ?, ?)',
      [product_number, company_name, product_type],
      (error, results) => {
          if (error) {
              res.status(500).send({ message: 'Error creating product' });
          } else {
              res.status(201).send({ message: 'Product created successfully', product_id: results.insertId });
          }
      }
  );
});

// Update an existing product
app.post('/updateProduct', (req, res) => {
  const { product_number, new_company_name, new_product_type } = req.body;

  pool.query(
      'UPDATE product SET company_name = ?, product_type = ? WHERE product_number = ?',
      [new_company_name, new_product_type, product_number],
      (error, results) => {
          if (error) {
              res.status(500).send({ message: 'Error updating product' });
          } else if (results.affectedRows === 0) {
              res.status(404).send({ message: 'Product not found' });
          } else {
              res.status(200).send({ message: 'Product updated successfully' });
          }
      }
  );
});

// Delete a product
app.post('/deleteProduct', (req, res) => {
  const { product_number } = req.body;

  pool.query(
      'DELETE FROM product WHERE product_number = ?',
      [product_number],
      (error, results) => {
          if (error) {
              res.status(500).send({ message: 'Error deleting product' });
          } else if (results.affectedRows === 0) {
              res.status(404).send({ message: 'Product not found' });
          } else {
              res.status(200).send({ message: 'Product deleted successfully' });
          }
      }
  );
});


/////////////////////////////////////////////////////////////////////////

// Endpoint to create a new coverage record
app.post('/createCoverage', (req, res) => {
  const {
    coverage_id,
    company_name,
    Coverage_Amount,
    Coverage_Type,
    Coverage_Level
  } = req.body;

  const query = 'INSERT INTO coverage (coverage_id, company_name, Coverage_Amount, Coverage_Type, Coverage_Level) VALUES (?, ?, ?, ?, ?)';

  pool.query(query, [coverage_id, company_name, Coverage_Amount, Coverage_Type, Coverage_Level], (err, result) => {
    if (err) {
      console.error('Error creating coverage:', err);
      res.status(500).json({ message: 'Error creating coverage' });
    } else {
      res.status(201).json({ message: 'Coverage created', data: result });
    }
  });
});

// Endpoint to update an existing coverage record
app.post('/updateCoverage', (req, res) => {
  const {
    coverage_id,
    new_company_name,
    new_Coverage_Amount,
    new_Coverage_Type,
    new_Coverage_Level
  } = req.body;

  const query = `
    UPDATE coverage
    SET company_name = ?, Coverage_Amount = ?, Coverage_Type = ?, Coverage_Level = ?
    WHERE coverage_id = ?
  `;

  pool.query(
    query,
    [
      new_company_name,
      new_Coverage_Amount,
      new_Coverage_Type,
      new_Coverage_Level,
      coverage_id,
    ],
    (err, result) => {
      if (err) {
        console.error('Error updating coverage:', err);
        res.status(500).json({ message: 'Error updating coverage' });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Coverage not found' });
      } else {
        res.json({ message: 'Coverage updated', data: result });
      }
    }
  );
});

// Endpoint to delete a coverage record
app.post('/deleteCoverage', (req, res) => {
  const { coverage_id } = req.body;

  const query = 'DELETE FROM coverage WHERE coverage_id = ?';

  pool.query(query, [coverage_id], (err, result) => {
    if (err) {
      console.error('Error deleting coverage:', err);
      res.status(500).json({ message: 'Error deleting coverage' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Coverage not found' });
    } else {
      res.json({ message: 'Coverage deleted', data: result });
    }
  });
});

// Endpoint to fetch a specific coverage record
app.post('/getCoverageInfo', (req, res) => {
  const { coverage_id } = req.body;

  const query = 'SELECT * FROM coverage WHERE coverage_id = ?';

  pool.query(query, [coverage_id], (err, results) => {
    if (err) {
      console.error('Error fetching coverage:', err);
      res.status(500).json({ message: 'Error fetching coverage' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Coverage not found' });
    } else {
      res.json(results[0]);
    }
  });
});

/////////////////////////////////////////



// // Fetch policy renewal info by ID
// app.post('/getPolicyRenewalInfo', (req, res) => {
//     const { policy_renewable_id } = req.body;

//     pool.query(
//         'SELECT * FROM policy_renewal WHERE policy_renewable_id = $1',
//         [policy_renewable_id],
//         (error, results) => {
//             if (error) {
//                 console.error("Error fetching policy renewal info:", error);
//                 res.status(500).send({ message: 'Internal Server Error' });
//             } else if (results.rows.length === 0) {
//                 res.status(404).send({ message: 'Policy renewal not found' });
//             } else {
//                 res.status(200).send(results.rows[0]);
//             }
//         }
//     );
// });

// // Create a new policy renewal
// app.post('/createPolicyRenewal', (req, res) => {
//     const { policy_renewable_id, cust_id, Date_Of_Renewal, Type_Of_Renewal } = req.body;

//     pool.query(
//         'INSERT INTO policy_renewal (policy_renewable_id, cust_id, Date_Of_Renewal, Type_Of_Renewal) VALUES ($1, $2, $3, $4)',
//         [policy_renewable_id, cust_id, Date_Of_Renewal, Type_Of_Renewal],
//         (error, results) => {
//             if (error) {
//                 console.error("Error creating policy renewal:", error);
//                 res.status(500).send({ message: 'Internal Server Error' });
//             } else {
//                 res.status(201).send({ message: 'Policy renewal created successfully' });
//             }
//         }
//     );
// });

// // Update an existing policy renewal
// app.post('/updatePolicyRenewal', (req, res) => {
//     const { policy_renewable_id, new_Date_Of_Renewal, new_Type_Of_Renewal } = req.body;

//     pool.query(
//         'UPDATE policy_renewals SET Date_Of_Renewal = COALESCE($1, Date_Of_Renewal), Type_Of_Renewal = COALESCE($2, Type_Of_Renewal) WHERE policy_renewable_id = $3',
//         [new_Date_Of_Renewal, new_Type_Of_Renewal, policy_renewable_id],
//         (error, results) => {
//             if (error) {
//                 console.error("Error updating policy renewal:", error);
//                 res.status(500).send({ message: 'Internal Server Error' });
//             } else if (results.rowCount === 0) {
//                 res.status(404).send({ message: 'Policy renewal not found' });
//             } else {
//                 res.status(200).send({ message: 'Policy renewal updated successfully' });
//             }
//         }
//     );
// });

// // Delete a policy renewal
// app.post('/deletePolicyRenewal', (req, res) => {
//     const { policy_renewable_id } = req.body;

//     pool.query(
//         'DELETE FROM policy_renewal WHERE policy_renewable_id = $1',
//         [policy_renewable_id],
//         (error, results) => {
//             if (error) {
//                 console.error("Error deleting policy renewal:", error);
//                 res.status(500).send({ message: 'Internal Server Error' });
//             } else if (results.rowCount === 0) {
//                 res.status(404).send({ message: 'Policy renewal not found' });
//             } else {
//                 res.status(200).send({ message: 'Policy renewal deleted successfully' });
//             }
//         }
//     );
// });



/////////////////////////
// 
app.post('/getPolicyRenewable', (req, res) => {
  const { policy_renewable_id } = req.body;

  const query = 'SELECT * FROM policy_renewable WHERE policy_renewable_id = ?';

  pool.query(query, [policy_renewable_id], (err, results) => {
    if (err) {
      console.error('Error fetching policy renewable:', err);
      res.status(500).json({ message: 'Error fetching policy renewable' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Policy renewable not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Endpoint to update an existing policy renewable record create
app.post('/updatePolicyRenewal', (req, res) => {
  
  const { policy_renewable_id, cust_id, Date_Of_Renewal, Type_Of_Renewal } = req.body;
  const updateQuery = `
    UPDATE policy_renewable
    SET cust_id = ?, Date_Of_Renewal = ?, Type_Of_Renewal = ?
    WHERE policy_renewable_id = ?
  `;

  pool.query(updateQuery, [cust_id, Date_Of_Renewal, Type_Of_Renewal, policy_renewable_id], (err, result) => {
    console.log("Dsdsd")
    if (err) {
    
      res.status(500).json({ message: 'Error updating policy renewable' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Policy renewable not found' });
    } else {
      res.json({ message: 'Policy renewable updated successfully' });
    }
  });
});


// Endpoint to create a new policy renewable record
app.post('/createPolicyRenewable', (req, res) => {
  const { policy_renewable_id, cust_id, Date_Of_Renewal, Type_Of_Renewal } = req.body;

  const insertQuery = 'INSERT INTO policy_renewable (policy_renewable_id, cust_id, Date_Of_Renewal, Type_Of_Renewal) VALUES (?, ?, ?, ?)';

  pool.query(insertQuery, [policy_renewable_id, cust_id, Date_Of_Renewal, Type_Of_Renewal], (err, result) => {
    if (err) {
      console.error('Error creating policy renewable:', err);
      res.status(500).json({ message: 'Error creating policy renewable' });
    } else {
      res.status(201).json({ message: 'Policy renewable created successfully', data: result });
    }
  });
});

// Endpoint to delete a policy renewable record
app.post('/deletePolicyRenewal', (req, res) => {
  const { policy_renewable_id } = req.body;

  const deleteQuery = 'DELETE FROM policy_renewable WHERE policy_renewable_id = ?';

  pool.query(deleteQuery, [policy_renewable_id], (err, result) => {
    if (err) {
      console.error('Error deleting policy renewable:', err);
      res.status(500).json({ message: 'Error deleting policy renewable' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Policy renewable not found' });
    } else {
      res.json({ message: 'Policy renewable deleted successfully' });
    }
  });
});