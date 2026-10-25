// ================= BLOOD DONOR DATA =================

let donors = [

    {
        name: "Rahul Sharma",
        blood: "A+",
        city: "Indore",
        phone: "9876543210"
    },

    {
        name: "Priya Singh",
        blood: "O+",
        city: "Bhopal",
        phone: "9876501234"
    },

    {
        name: "Amit Verma",
        blood: "B+",
        city: "Patna",
        phone: "9123456789"
    },

    {
        name: "Neha Gupta",
        blood: "AB+",
        city: "Delhi",
        phone: "9012345678"
    },

    {
        name: "Rohit Kumar",
        blood: "O-",
        city: "Lucknow",
        phone: "9988776655"
    },

    {
        name: "Anjali Patel",
        blood: "A-",
        city: "Indore",
        phone: "9871234567"
    },

    {
        name: "Sahil Raj",
        blood: "B-",
        city: "Mumbai",
        phone: "9988123456"
    },

    {
        name: "Suhani Soni",
        blood: "AB-",
        city: "Indore",
        phone: "9876549876"
    }

];


// ================= LOAD SAVED DONORS =================

// Browser me pehle se registered donors hain to unhe load karo

const savedDonors = JSON.parse(
    localStorage.getItem("registeredDonors")
) || [];


// Saved donors ko main list me add karo

donors = [...donors, ...savedDonors];


// ================= DISPLAY DONORS =================

function displayDonors(data) {

    const container = document.getElementById("donorContainer");

    container.innerHTML = "";

    if (data.length === 0) {

        container.innerHTML = `
            <div style="text-align:center; width:100%;">
                <h2>No Donor Found 😔</h2>
                <p>Try another blood group or city.</p>
            </div>
        `;

        return;
    }


    data.forEach(donor => {

        container.innerHTML += `

        <div class="donor-card">

            <h3>${donor.name}</h3>

            <p>
                <b>Blood Group:</b>
                ${donor.blood}
            </p>

            <p>
                <b>City:</b>
                ${donor.city}
            </p>

            <p>
                <b>Phone:</b>
                ${donor.phone}
            </p>

            <button onclick="callDonor('${donor.phone}')">
                Contact Donor
            </button>

        </div>

        `;

    });

}


// ================= SEARCH DONOR =================

function searchDonor() {

    let blood =
        document.getElementById("bloodGroup").value
        .toUpperCase();

    let city =
        document.getElementById("city").value
        .trim()
        .toLowerCase();


    let result = donors.filter(donor => {

        let bloodMatch =
            blood === "" ||
            donor.blood === blood;


        let cityMatch =
            city === "" ||
            donor.city.toLowerCase().includes(city);


        return bloodMatch && cityMatch;

    });


    // Results show karo

    displayDonors(result);


    // Donors section tak automatically le jao

    document.getElementById("donors")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= CONTACT DONOR =================

function callDonor(phone) {

    alert(
        "Calling Donor...\n\nPhone : " + phone
    );

}


// ================= REGISTER DONOR =================

document
    .getElementById("donorForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();


        // Form ke saare inputs

        const inputs =
            this.querySelectorAll("input");


        // Data collect karo

        const newDonor = {

            name: inputs[0].value.trim(),

            blood: inputs[1].value.trim().toUpperCase(),

            city: inputs[2].value.trim(),

            phone: inputs[3].value.trim()

        };


        // Check karo fields empty to nahi

        if (
            !newDonor.name ||
            !newDonor.blood ||
            !newDonor.city ||
            !newDonor.phone
        ) {

            alert("Please fill all details.");

            return;

        }


        // Blood group validate karo

        const validBloodGroups = [
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
        ];


        if (!validBloodGroups.includes(newDonor.blood)) {

            alert(
                "Please enter a valid blood group.\n\nExample: A+, B+, O+, AB+"
            );

            return;

        }


        // New donor ko main array me add karo

        donors.push(newDonor);


        // Local Storage me save karo

        const registeredDonors =
            JSON.parse(
                localStorage.getItem("registeredDonors")
            ) || [];


        registeredDonors.push(newDonor);


        localStorage.setItem(
            "registeredDonors",
            JSON.stringify(registeredDonors)
        );


        // Success message

        alert(
            "🎉 Thank You!\n\n" +
            newDonor.name +
            " has been successfully registered as a Blood Donor."
        );


        // Form clear karo

        this.reset();


        // Updated donor list show karo

        displayDonors(donors);

    });


// ================= LOAD ALL DONORS =================

displayDonors(donors);