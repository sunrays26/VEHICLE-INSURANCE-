

document.getElementById('homeLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    location.reload(); // Reload the page
});
document.addEventListener("DOMContentLoaded", function() {
  const openAboutBtn = document.getElementById("openAbout");
  const closeAboutBtn = document.getElementById("closeAbout");
  const aboutPopup = document.getElementById("aboutPopup");

  const openContactBtn = document.getElementById("openContact");
  const closeContactBtn = document.getElementById("closeContact");
  const contactPopup = document.getElementById("contactPopup");

  const openSupportBtn = document.getElementById("openSupport");
  const closeSupportBtn = document.getElementById("closeSupport");
  const supportPopup = document.getElementById("supportPopup");

  const openClaimBtn = document.getElementById("openClaim");
  const closeClaimBtn = document.getElementById("closeClaim");
  const claimPopup = document.getElementById("claimPopup");


  openAboutBtn.addEventListener("click", function() {
      aboutPopup.style.display = "block";
  });

  closeAboutBtn.addEventListener("click", function() {
      aboutPopup.style.display = "none";
  });

  openContactBtn.addEventListener("click", function() {
      contactPopup.style.display = "block";
  });

  closeContactBtn.addEventListener("click", function() {
      contactPopup.style.display = "none";
  });

  openSupportBtn.addEventListener("click", function() {
      supportPopup.style.display = "block";
  });

  closeSupportBtn.addEventListener("click", function() {
      supportPopup.style.display = "none";
  });

  openClaimBtn.addEventListener("click", function() {
    claimPopup.style.display = "block";
});

closeClaimBtn.addEventListener("click", function() {
    claimPopup.style.display = "none";
});

  
});

document.addEventListener("DOMContentLoaded", function() {
    const openCustomersBtn = document.getElementById("openCustomers");
    const closeCustomersBtn = document.getElementById("closeCustomers");
    const CustomersPopup = document.getElementById("CustomersPopup");
  
    // const openManagerBtn = document.getElementById("openManager");
    // const closeManagerBtn = document.getElementById("closeManager");
    // const ManagerPopup = document.getElementById("ManagerPopup");
  
    const openInsuranceBtn = document.getElementById("openInsurance");
    const closeInsuranceBtn = document.getElementById("closeInsurance");
    const InsurancePopup = document.getElementById("InsurancePopup");
  
    // const openAccBtn = document.getElementById("openAcc");
    // const closeAccBtn = document.getElementById("closeAcc");
    // const AccPopup = document.getElementById("AccPopup");
  
    // const openHRBtn = document.getElementById("openHR");
    // const closeHRBtn = document.getElementById("closeHR");
    // const HRPopup = document.getElementById("HRPopup");
  
    // const openDamageBtn = document.getElementById("openDamage");
    // const closeDamageBtn = document.getElementById("closeDamage");
    // const DamagePopup = document.getElementById("DamagePopup");
  
    const openDataBtn = document.getElementById("openData");
    const closeDataBtn = document.getElementById("closeData");
    const DataPopup = document.getElementById("DataPopup");
  
    // const openFinanBtn = document.getElementById("openFinan"); 
    // const closeFinanBtn = document.getElementById("closeFinan");
    // const FinanPopup = document.getElementById("FinanPopup");
  
    openCustomersBtn.addEventListener("click", function() {
        CustomersPopup.style.display = "block";
    });
  
    closeCustomersBtn.addEventListener("click", function() {
        CustomersPopup.style.display = "none";
    });
  
    // openManagerBtn.addEventListener("click", function() {
    //     ManagerPopup.style.display = "block";
    // });
  
    // closeManagerBtn.addEventListener("click", function() {
    //     ManagerPopup.style.display = "none";
    // });
  
    openInsuranceBtn.addEventListener("click", function() {
        InsurancePopup.style.display = "block";
    });
  
    closeInsuranceBtn.addEventListener("click", function() {
        InsurancePopup.style.display = "none";
    });
  
//     openAccBtn.addEventListener("click", function() {
//       AccPopup.style.display = "block";
//   });
  
//   closeAccBtn.addEventListener("click", function() {
//       AccPopup.style.display = "none";
//   });
  
//   openHRBtn.addEventListener("click", function() {
//     HRPopup.style.display = "block";
// });

// closeHRBtn.addEventListener("click", function() {
//     HRPopup.style.display = "none";
// });

// openDamageBtn.addEventListener("click", function() {
//     DamagePopup.style.display = "block";
// });

// closeDamageBtn.addEventListener("click", function() {
//     DamagePopup.style.display = "none";
// });

openDataBtn.addEventListener("click", function() {
    DataPopup.style.display = "block";
});

closeDataBtn.addEventListener("click", function() {
    DataPopup.style.display = "none";
});

// openFinanBtn.addEventListener("click", function() {
//   FinanPopup.style.display = "block";
// });

// closeFinanBtn.addEventListener("click", function() {
//   FinanPopup.style.display = "none";
// });

    
  });
  