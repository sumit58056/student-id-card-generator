// =====================================================
// VIVEKANANDA MISSION INSTITUTE
// CARD GENERATOR
// =====================================================

class CardGenerator {

    constructor(containerId) {

        this.container = typeof containerId === "string"
            ? document.getElementById(containerId)
            : containerId;

        if (!this.container) {

            throw new Error("Card container not found.");

        }

    }

    /* ==========================================
       CLEAR ALL CARDS
    ========================================== */

    clear() {

        this.container.innerHTML = "";

    }

    /* ==========================================
       GENERATE ALL CARDS
    ========================================== */

    generateAll(students) {

        this.clear();

        if (!students || students.length === 0) {

            this.container.innerHTML = `
                <div class="welcome">
                    <h2>No Students Found</h2>
                    <p>Please load an Excel file or change your filters.</p>
                </div>
            `;

            return;

        }

        students.forEach(student => {

            const card = this.createCard(student);

            this.container.appendChild(card);

        });

    }

    /* ==========================================
       CREATE COMPLETE CARD
    ========================================== */

    createCard(student) {

        const wrapper = document.createElement("div");

        wrapper.className = "card-wrapper";

        const front = this.createFront(student);

        const back = this.createBack(student);

        const actions = this.createButtons(student, wrapper);

        wrapper.appendChild(front);

        wrapper.appendChild(back);

        wrapper.appendChild(actions);

        return wrapper;

    }
        /* ==========================================
       CREATE FRONT SIDE
    ========================================== */

    createFront(student) {

        const card = document.createElement("div");
        card.className = "id-card card-front";

        /* -----------------------------
           HEADER
        ----------------------------- */

        const header = document.createElement("div");
        header.className = "card-header";

        header.innerHTML = `

            <img src="assets/logo.png" alt="Logo">

            <h2>VIVEKANANDA MISSION INSTITUTE</h2>

            <p>Following NEP 2020 • IKS (Govt. of India)</p>

            <div class="card-title">
                STUDENT IDENTITY CARD
            </div>

        `;

        card.appendChild(header);

        /* -----------------------------
           PHOTO
        ----------------------------- */

        const photoArea = document.createElement("div");
        photoArea.className = "photo-area";

        const photoBox = document.createElement("div");
        photoBox.className = "photo-box";

        const image = document.createElement("img");

        image.src = student.photo;

        image.onerror = function () {

            this.src = "assets/default.png";

        };

        photoBox.appendChild(image);

        photoArea.appendChild(photoBox);

        card.appendChild(photoArea);

        /* -----------------------------
           DETAILS
        ----------------------------- */

        const details = document.createElement("div");
        details.className = "student-details";

        details.appendChild(this.createRow(
            "Name",
            student.name
        ));

        details.appendChild(this.createRow(
            "Father",
            student.father
        ));

        details.appendChild(this.createRow(
            "Class",
            student.class
        ));

        details.appendChild(this.createRow(
            "Student ID",
            student.id
        ));

        details.appendChild(this.createRow(
            "Phone",
            student.phone
        ));

        card.appendChild(details);

        /* -----------------------------
           ADDRESS
        ----------------------------- */

        const address = document.createElement("div");

        address.className = "address-box";

        address.innerHTML = `

            <strong>Address :</strong><br>

            ${student.address || "-"}

        `;

        card.appendChild(address);

        /* -----------------------------
           FOOTER
        ----------------------------- */

        const footer = document.createElement("div");

        footer.className = "card-footer";

        footer.innerHTML = `

            Vivekananda Mission Institute

        `;

        card.appendChild(footer);

        return card;

    }

    /* ==========================================
       DETAIL ROW
    ========================================== */

    createRow(label, value) {

        const row = document.createElement("div");

        row.className = "detail-row";

        row.innerHTML = `

            <div class="detail-label">

                ${label}

            </div>

            <div class="detail-value">

                ${value || "-"}

            </div>

        `;

        return row;

    }
    